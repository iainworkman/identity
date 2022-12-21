from rest_framework.serializers import ModelSerializer

from ldap.models import Domain, DomainEntrySource, Container


class DomainSerializer(ModelSerializer):

    class Meta:
        model = Domain
        fields = [
            'id',
            'name', 'host', 'port', 'use_ssl',
            'user_identifier_attribute', 'group_identifier_attribute',
            'search_base',
            'bind_user_dn', 'bind_user_password'
        ]
        read_only_fields = ['id', ]
        extra_kwargs = {
            'bind_user_password': {'write_only': True}
        }


class DomainEntrySourceSerializer(ModelSerializer):

    class Meta:
        model = DomainEntrySource
        fields = [
            'id',
            'name', 'object_class',
            'read_container',
            'extra_read_filter',
            'is_read_only',
            'create_container',
            'search_scope',
            'is_enabled',
            'source_type',
            'is_authentication_source',
            'authentication_priority',
            'schema_mapping'
        ]


class ContainerSerializer(ModelSerializer):

    class Meta:
        model = Container
        fields = [
            'id',
            'dn',
            'description',
            'domain'
        ]