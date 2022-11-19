from django.conf import settings
from django.db import models

from sisulu.fields import EncryptedCharField


class Domain(models.Model):

    name = models.CharField(
        max_length=128,
        help_text='Human readable name for the domain.',
        unique=True
    )
    address = models.CharField(
        max_length=128,
        help_text='The address to connect to for the domain. Can be a single instance, or the domain as a whole.'
    )
    search_base = models.CharField(
        max_length=255,
        help_text=(
            'Optional dn in the domain to start searches from. If not supplied, then searches will be performed from '
            'the root of the domain.'
        ),
        blank=True
    )
    bind_dn = models.CharField(
        max_length=255,
        help_text='DN of the user which will be used to bind ot the domain.'
    )
    bind_credential = EncryptedCharField(
        key=settings.ENCRYPTION_KEY,
        max_length=255,
        help_text='Password used when binding to the domain.'
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class AccountTypes(models.Model):

    name = models.CharField(
        max_length=128,
        help_text='Human readable name for the account type.'
    )
    domain = models.ForeignKey(
        'Domain',
        on_delete=models.PROTECT,
        related_name='account_types',
        help_text='The domain to which the account type belongs'
    )
    dns = models.JSONField(
        blank=True,
        default=list,
        help_text='List of DNs in which accounts of the type can be found'
    )
    default_dn = models.CharField(
        max_length=256,
        help_text='Default DN in which accounts of this type will be created'
    )


