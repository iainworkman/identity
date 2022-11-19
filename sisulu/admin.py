from django.contrib import admin
from django.forms import ModelForm

from sisulu.models import User


class UserAdminForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'display_name', 'email', 'is_staff', 'is_active', 'date_joined', 'profile', 'groups']


class UserAdmin(admin.ModelAdmin):
    form = UserAdminForm


admin.site.register(User, UserAdmin)
