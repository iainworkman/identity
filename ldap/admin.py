from django.contrib import admin, messages
from django.forms import ModelForm, PasswordInput
from ldap3.core.exceptions import LDAPException

from ldap.models import Domain, DomainEntrySource, UserDomainLink, GroupDomainLink, Container, SchemaMapping


class DomainAdminForm(ModelForm):
    class Meta:
        model = Domain
        widgets = {
            'bind_user_password': PasswordInput()
        }
        fields = '__all__'


class DomainAdmin(admin.ModelAdmin):
    form = DomainAdminForm


class DomainEntrySourceAdmin(admin.ModelAdmin):
    actions = ['sync']

    @admin.action(description='Sync Entries')
    def sync(self, request, queryset):
        try:
            for source in queryset:
                source.sync()
        except LDAPException as exception:
            self.message_user(request, f'Failed syncing entries: {exception}', messages.ERROR)
        else:
            self.message_user(request, 'Successfully synced entries', messages.SUCCESS)

admin.site.register(Domain, DomainAdmin)
admin.site.register(Container)
admin.site.register(DomainEntrySource, DomainEntrySourceAdmin)
admin.site.register(SchemaMapping)
admin.site.register(UserDomainLink)
admin.site.register(GroupDomainLink)
