from celery import shared_task

from ldap.models import DomainEntrySource

@shared_task(name='sync_entry_sources')
def sync_entry_sources():
    for source in DomainEntrySource.objects.filter(is_enabled=True):
        source.sync()
