from django.contrib.auth.models import Group
from rest_framework.serializers import ModelSerializer

from sisulu.models import User


class GroupSerializer(ModelSerializer):

    class Meta:
        model = Group
        fields = ['id', 'name']
        read_only_fields = ['id']



class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'groups']
        read_only_fields = ['id', 'username']