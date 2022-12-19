from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, AbstractUser
from django.db import models


class User(AbstractUser):

    profile_picture = models.ImageField(null=True, blank=True, upload_to='profile_pictures/')

    class Meta:
        ordering = ['last_name', 'first_name']

