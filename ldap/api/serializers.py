from rest_framework.serializers import ModelSerializer

from ldap.models import Domain


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
