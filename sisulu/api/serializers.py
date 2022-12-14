from django.contrib.auth.models import Group
from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer

from sisulu.models import User


class GroupSerializer(ModelSerializer):

    class Meta:
        model = Group
        fields = ['id', 'name']
        read_only_fields = ['id']



class ProfileSerializer(ModelSerializer):
    permissions = SerializerMethodField()
    groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'groups', 'permissions', 'profile_picture']
        read_only_fields = ['id', 'username']

    @staticmethod
    def get_permissions(instance):
        return instance.get_all_permissions()


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'profile_picture']
        read_only_fields = ['id', ]