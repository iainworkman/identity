import json

from django.core.management import BaseCommand

from ldap.models import Domain
from ldap.serializers.domain import DomainSerializer


class Command(BaseCommand):

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        serializer = DomainSerializer(data=Domain.objects.all(), many=True)
        serializer.is_valid()
        self.stdout.write(json.dumps(serializer.data, indent=2))
