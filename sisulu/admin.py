from django.contrib import admin
from django.contrib.auth.models import Permission
from django.forms import ModelForm

from sisulu.models import User


class UserAdminForm(ModelForm):
    class Meta:
        model = User
        fields = [
            'id', 'username',
            'first_name', 'last_name', 'email',
            'is_staff', 'is_active', 'date_joined',
            'profile_picture',
            'groups', 'user_permissions']
        read_only_fields = ['id', 'user_permissions']


class UserAdmin(admin.ModelAdmin):
    form = UserAdminForm
    search_fields = ['username']


admin.site.register(User, UserAdmin)
admin.site.register(Permission)
