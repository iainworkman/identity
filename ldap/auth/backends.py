from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.views.decorators.debug import sensitive_variables
from ldap3.core.exceptions import LDAPException

from ldap.models import DomainEntrySource

user_model = get_user_model()


class DomainModelBackend(BaseBackend):

    @sensitive_variables('password')
    def authenticate(self, request, username=None, password=None):
        sources = DomainEntrySource.objects.filter(
            source_type=DomainEntrySource.USER, is_authentication_source=True
        ).order_by('authentication_priority')
        for auth_domain_source in sources:
            try:
                user = auth_domain_source.authenticate_user(username, password)
                if user is not None:
                    return user
            except LDAPException:
                pass

        return None


    def get_user(self, user_id):
        try:
            return user_model.objects.get(pk=user_id)
        except user_model.DoesNotExist:
            return None