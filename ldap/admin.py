from django.contrib import admin
from django.forms import ModelForm, PasswordInput

from ldap.models import Domain, DomainEntrySource, UserDomainLink, GroupDomainLink, Container


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
admin.site.register(Container)
admin.site.register(DomainEntrySource)
admin.site.register(UserDomainLink)
admin.site.register(GroupDomainLink)
