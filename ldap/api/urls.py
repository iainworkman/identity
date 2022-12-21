from django.urls import path

from ldap.api.views import DomainListCreateAPIView, DomainEntrySourceListCreateAPIView, ContainerListCreateAPIView

urlpatterns = [
    path('domains/', DomainListCreateAPIView.as_view(), name='api-domain-list-create'),
    path('domains/<int:pk>/containers/', ContainerListCreateAPIView.as_view(), name='api-container-list-create'),
    path(
        'domains/<int:pk>/entry-sources/',
        DomainEntrySourceListCreateAPIView.as_view(),
        name='api-domain-entry-source-list-create'
    )
]