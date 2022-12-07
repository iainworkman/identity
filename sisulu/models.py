from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, AbstractUser
from django.db import models


class User(AbstractUser):

    profile = models.JSONField(
        help_text='Variable, flexible profile information for the User.',
        default=dict,
        blank=True
    )
    display_name = models.CharField(
        max_length=150,
        help_text='Human readable name to display for the User.',
        blank=True
    )

    def get_full_name(self):
        return self.display_name

    def get_short_name(self):
        return self.username
