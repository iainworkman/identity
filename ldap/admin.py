from django.contrib import admin
from django.forms import ModelForm, PasswordInput

from ldap.models import Domain


class DomainAdminForm(ModelForm):
    class Meta:
        model = Domain
        widgets = {
            'bind_credential': PasswordInput()
        }
        fields = '__all__'


class DomainAdmin(admin.ModelAdmin):
    form = DomainAdminForm


admin.site.register(Domain, DomainAdmin)
