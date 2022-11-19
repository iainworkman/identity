from rest_framework import serializers

from ldap.models import Domain


class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = [
            'name',
            'address',
            'search_base',
            'user_dns',
            'group_dns',
            'bind_dn'
        ]
