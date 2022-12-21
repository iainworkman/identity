from django.contrib.auth.decorators import permission_required
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from rest_framework.generics import ListCreateAPIView

from ldap.api.serializers import DomainSerializer, DomainEntrySourceSerializer, ContainerSerializer
from ldap.models import Domain, DomainEntrySource, Container


@method_decorator(permission_required('ldap.add_domain', raise_exception=True), name='create')
@method_decorator(permission_required('ldap.view_domain', raise_exception=True), name='list')
class DomainListCreateAPIView(ListCreateAPIView):
    serializer_class = DomainSerializer
    search_fields = ['name', ]
    page_size_query_param = 'page_size'

    def get_queryset(self):
        return Domain.objects.all()


@method_decorator(permission_required('ldap.add_domain_entry_source', raise_exception=True), name='create')
@method_decorator(permission_required('ldap.view_domain_entry_source', raise_exception=True), name='list')
class DomainEntrySourceListCreateAPIView(ListCreateAPIView):
    serializer_class = DomainEntrySourceSerializer
    search_fields = ['name']
    filterset_fields = ['name', 'source_type', 'is_enabled']

    def get_queryset(self):
        domain = get_object_or_404(Domain, pk=self.kwargs.get('pk'))
        return DomainEntrySource.objects.filter(read_container__domain=domain)


class ContainerListCreateAPIView(ListCreateAPIView):
    serializer_class = ContainerSerializer
    search_fields = ['dn', 'domain']
    filterset_fields = ['dn', 'domain']

    def get_queryset(self):
        domain = get_object_or_404(Domain, pk=self.kwargs.get('pk'))
        return Container.objects.filter(domain=domain)
