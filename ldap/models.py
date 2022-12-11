import logging

from django.conf import settings
from django.db import models
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from django.utils.module_loading import import_string

from ldap3 import Server, Connection, ALL_ATTRIBUTES

from sisulu.fields import EncryptedCharField


logger = logging.getLogger(__name__)


class Domain(models.Model):

    name = models.CharField(
        max_length=150,
        help_text='Human readable name for the domain.',
        unique=True
    )
    host = models.CharField(
        max_length=150,
        help_text=(
            'The address to connect to for the domain. Can be a single instance, or the domain as a whole.'
        )
    )
    user_identifier_attribute = models.CharField(
        max_length=150,
        help_text='Attribute used as the unique identifier for user entries (default: uid)',
        default='uid'
    )
    group_identifier_attribute = models.CharField(
        max_length=150,
        help_text='Attribute used as the unique identifier for group entries (default: gid)',
        default='gid'
    )
    port = models.IntegerField(
        help_text='The port to connect to the domain on.'
    )
    use_ssl = models.BooleanField(
        default=True,
        help_text='Whether to encrypt communication with the domain.'
    )
    search_base = models.CharField(
        max_length=250,
        help_text=(
            'Optional dn in the domain to start searches from. If not supplied, then searches will be performed from '
            'the root of the domain.'
        ),
        blank=True
    )
    bind_user_dn = models.CharField(
        max_length=250,
        help_text='DN of the user which will be used to bind to the domain.',
        blank=True
    )
    bind_user_password = EncryptedCharField(
        key=settings.ENCRYPTION_KEY,
        max_length=250,
        help_text='Password used when binding to the domain.',
        blank=True
    )

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name

    def server(self) -> Server:
        return Server(
            self.host,
            self.port,
            self.use_ssl
        )

    def connection(self) -> Connection:
        return Connection(
            self.server(),
            self.bind_user_dn,
            self.bind_user_password
        )

    def search(self, search_base = None, search_filter = '', search_scope = 'SUBTREE', attributes = None):
        paged_results_control = '1.2.840.113556.1.4.319'

        if search_base is None:
            search_base = self.search_base

        if attributes is None:
            attributes = ALL_ATTRIBUTES

        with self.connection() as connection:
            results = []
            received_all_results = False
            paged_cookie = None

            while not received_all_results:
                connection.search(
                    search_base=search_base,
                    search_filter=search_filter,
                    search_scope=search_scope,
                    attributes=attributes,
                    paged_cookie=paged_cookie
                )

                results = results + connection.entries

                paged_cookie = connection.result.get(
                    'controls', {}
                ).get(
                    paged_results_control, {}
                ).get(
                    'value', {}
                ).get(
                    'cookie', None
                )
                received_all_results = paged_cookie is None

            return results


class Container(models.Model):
    dn = models.CharField(max_length=250, help_text='The distinguished name of the container')
    description = models.TextField(blank=True)
    domain = models.ForeignKey(
        Domain, 
        on_delete=models.PROTECT, 
        related_name='containers', 
        help_text='The domain which the container belongs to.'
    )

    class Meta:
        ordering = ['dn']

    def __str__(self) -> str:
        return self.dn

    def search(self, search_filter, search_scope = 'SUBTREE', attributes = None) -> any:

        return self.domain.search(
            search_base=self.dn,
            search_filter=search_filter,
            search_scope=search_scope,
            attributes=attributes
        )


class DomainEntrySource(models.Model):
    GROUP = 'g'
    USER = 'u'
    SOURCE_TYPES = (
        (GROUP, 'Group'),
        (USER, 'User')
    )

    name = models.CharField(
        max_length=250,
        help_text='The name for the entry source.'
    )
    read_container = models.ForeignKey(
        Container,
        on_delete=models.PROTECT,
        related_name='reading_entry_sources',
        help_text='Container to read entries from.'
    )
    read_filter = models.TextField(
        blank=True, 
        help_text='LDAP filters to apply when reading entries.'
    )
    is_read_only = models.BooleanField(
        default=False,
        help_text='Whether to write data back to entries from this source'
    )
    create_container = models.ForeignKey(
        Container,
        on_delete=models.PROTECT,
        related_name='creating_entry_sources',
        blank=True, null=True,
        help_text='Container where entries for this source will be created.'
    )
    search_scope = models.CharField(
        max_length=15,
        choices=(
            ('BASE', 'BaseObject'),
            ('LEVEL', 'SingleLevel'),
            ('SUBTREE', 'WholeSubtree')
        )
    )
    is_enabled = models.BooleanField(default=True)
    source_type = models.CharField(max_length=4, choices=SOURCE_TYPES)

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name

    @property
    def identifying_attribute(self):
        domain = self.read_container.domain
        return domain.user_identifier_attribute if self.source_type == self.USER else domain.group_identifier_attribute

    def fetch_all_entries(self):
        return self.read_container.search(
            search_filter=self.read_filter,
            search_scope=self.search_scope
        )

    def fetch_entry(self, identifier):

        results = self.read_container.search(
            search_filter=f'({self.identifying_attribute}={identifier})',
            search_scope=self.search_scope
        )
        if len(results) > 0:
            logger.warning(f'Entry {identifier} exists more than once in source {self}')
        elif len(results) == 0:
            return None

        return results[0]

    def sync(self):
        results = {
            'error': [],
            'warning': [],
            'info': []
        }
        pull_results = self.pull_entries()
        results['error'] += pull_results['error']
        results['warning'] += pull_results['warning']
        results['info'] += pull_results['info']

        push_results = self.push_entries()
        results['error'] += push_results['error']
        results['warning'] += push_results['warning']
        results['info'] += push_results['info']

        return results


    def push_entries(self):
        if self.is_read_only:
            return {
                'error': [],
                'warning': [],
                'info': ['Taking no push actions: source is read only']
            }
        return {
            'error': [],
            'warning': [],
            'info': []
        }

    def _pull_user(self, domain_entry, identifier, results):
        user_model = get_user_model()
        try:
            user = user_model.objects.get(username=identifier)
        except user_model.DoesNotExist:
            if hasattr(settings, 'USER_CREATE_METHOD'):
                user_create_method = import_string(settings.USER_CREATE_METHOD)
                user = user_create_method(domain_entry)
            else:
                user = user_model(
                    username=identifier,
                    password=user_model.objects.make_random_password()
                )
                user.save()
            UserDomainLink(
                user=user,
                user_source=self,
                dn=domain_entry.entry_dn,
                username=identifier
            ).save()
            results['info'].append(f'Created user {user}')
        else:
            try:
                UserDomainLink.objects.get(user=user, user_source=self)
            except UserDomainLink.DoesNotExist:
                UserDomainLink(
                    user=user,
                    user_source=self,
                    dn=domain_entry.entry_dn,
                    username=identifier
                ).save()
                results['info'].append(
                    f'Linked existing user {user}'
                )

    def _pull_group(self, domain_entry, identifier, results):
        try:
            group = Group.objects.get(name=identifier)
        except Group.DoesNotExist:
            group = Group(
                name=identifier
            )
            group.save()
            GroupDomainLink(
                group=group,
                group_source=self,
                dn=domain_entry.entry_dn,
                group_name=identifier
            ).save()
            results['info'].append(
                f'Created Group {group}'
            )
        else:
            try:
                GroupDomainLink.objects.get(group=group, group_source=self)
            except GroupDomainLink.DoesNotExist:
                GroupDomainLink(
                    group=group,
                    group_source=self,
                    dn=domain_entry.entry_dn,
                    group_name=identifier
                ).save()
                results['info'].append(
                    f'Linked existing group {group}'
                )

    def pull_entries(self):

        results = {
            'error': [],
            'warning': [],
            'info': []
        }

        domain_entries = self.fetch_all_entries()

        for domain_entry in domain_entries:

            if not hasattr(domain_entry, self.identifying_attribute):
                results['error'].append(
                    f'Entity {domain_entry.entry_dn} in EntrySource: {self.name} has no attribute '
                    f'{self.identifying_attribute}'
                )
            else:
                identifier = getattr(domain_entry, self.identifying_attribute).value
                if self.source_type == self.USER:
                    self._pull_user(domain_entry, identifier, results)
                else:
                    self._pull_group(domain_entry, identifier, results)

        return results


class UserDomainLink(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, related_name='user_links')
    user_source = models.ForeignKey(DomainEntrySource, on_delete=models.PROTECT, related_name='user_links')
    dn = models.CharField(max_length=250, help_text='The location of the entry in the domain')
    is_enabled = models.BooleanField(default=True)

    # Denormalized fields
    username = models.CharField(max_length=150)

    class Meta:
        ordering = ['username']

    def __str__(self) -> str:
        return self.username


class GroupDomainLink(models.Model):
    group = models.ForeignKey(Group, on_delete=models.PROTECT, related_name='group_links')
    group_source = models.ForeignKey(DomainEntrySource, on_delete=models.PROTECT, related_name='group_links')
    dn = models.CharField(max_length=250, help_text='The location of the entry in the domain')
    is_enabled = models.BooleanField(default=True)

    # Denormalized fields
    group_name = models.CharField(max_length=250)

    class Meta:
        ordering = ['group_name']

    def __str__(self) -> str:
        return self.group_name
