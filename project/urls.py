from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/ldap/', include('ldap.api.urls')),
    path('api/', include('sisulu.api.urls')),
]
