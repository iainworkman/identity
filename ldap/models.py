from __future__ import annotations
from typing import Literal

from django.conf import settings
from django.db import models
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model

from ldap3 import Server, Connection

from sisulu.fields import EncryptedCharField


class Domain(models.Model):

    name = models.CharField(
        max_length=150,
        help_text='Human readable name for the domain.',
        unique=True
    )
    host = models.CharField(
        max_length=150,
        help_text='The address to connect to for the domain. Can be a single instance, or the domain as a whole.'
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
            self.address,
            self.port,
            self.use_ssl
        )

    def connection(self) -> Connection:
        return Connection(
            self.server(),
            self.bind_user_dn,
            self.bind_user_password
        )

    def search(
            self, 
            search_base: str | None = None, 
            search_filter: str = '',
            search_scope: Literal['BASE', 'LEVEL', 'SUBTREE'] = 'SUBTREE',
            attributes: any | None = None
        ) -> any:

        if search_base is None:
            search_base = self.search_base

        return self.connection().extend.standard.paged_search(
            search_base=self.search_base,
            search_filter=search_filter,
            search_scope=search_scope,
            attributes=attributes
        )


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


class UserType(models.Model):
    name = models.CharField(max_length=250, help_text='The name for this type of user.')
    read_containers = models.ManyToManyField(Container, blank=True, related_name='reading_user_types')
    read_filters = models.TextField(blank=True, help_text='LDAP filters to apply when reading users.')
    write_containers = models.ForeignKey(
        Container, 
        on_delete=models.PROTECT, 
        related_name='writing_user_types', 
        blank=True, null=True,
        help_text='Containers into which users of this type will be written.'
    )

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name


class UserDomainLink(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, related_name='user_links')
    user_type = models.ForeignKey(UserType, on_delete=models.PROTECT, related_name='user_links')
    containers = models.ManyToManyField(
        Container,
        related_name='user_links',
        help_text='Domain containers in which the user exists'
    )

    class Meta:
        ordering = ['user']

    def __str__(self) -> str:
        return self.user.__str__()


class GroupType(models.Model):
    name = models.CharField(max_length=250, help_text='The name for this type of group.')
    read_containers = models.ManyToManyField(Container, blank=True, related_name='reading_group_types')
    read_filters = models.TextField(blank=True, help_text='LDAP filters to apply when reading groups.')
    write_containers = models.ForeignKey(
        Container, 
        on_delete=models.PROTECT, 
        related_name='writing_group_types', 
        blank=True, null=True,
        help_text='Containers into which group of this type will be written.'
    )

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name


class GroupDomainLink(models.Model):
    group = models.ForeignKey(Group, on_delete=models.PROTECT, related_name='group_links')
    group_type = models.ForeignKey(GroupType, on_delete=models.PROTECT, related_name='group_links')
    containers = models.ManyToManyField(
        Container,
        related_name='group_links',
        help_text='Domain containers in which the group exists'
    )

    class Meta:
        ordering = ['group']

    def __str__(self) -> str:
        return self.group.__str__()

