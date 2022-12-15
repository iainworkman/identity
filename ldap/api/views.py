from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator
from rest_framework.generics import ListCreateAPIView

from ldap.api.serializers import DomainSerializer
from ldap.models import Domain


@method_decorator(permission_required('ldap.add_domain'), name='create')
@method_decorator(permission_required('ldap.view_domain'), name='list')
class DomainListCreateAPIView(ListCreateAPIView):
    serializer_class = DomainSerializer

    def get_queryset(self):
        return Domain.objects.all()