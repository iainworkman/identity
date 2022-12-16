from django.urls import path

from ldap.api.views import DomainListCreateAPIView

urlpatterns = [
    path('domains/', DomainListCreateAPIView.as_view(), name='api-domain-list-create')
]