from django.contrib import admin
from django.forms import ModelForm, PasswordInput

from ldap.models import Domain, Container, GroupType, UserType, UserDomainLink, GroupDomainLink


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
admin.site.register(GroupType)
admin.site.register(UserType)
admin.site.register(UserDomainLink)
admin.site.register(GroupDomainLink)
