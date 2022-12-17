from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import permission_required
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_variables
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import ListAPIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from sisulu.api.serializers import ProfileSerializer, UserSerializer
from sisulu.models import User


class ProfileAPIView(APIView):
    serializer_class = ProfileSerializer

    def get(self, request):
        if request.user == AnonymousUser:
            raise PermissionDenied
        user = get_object_or_404(User, username=request.user.username)

        return Response(self.serializer_class(instance=user).data)


@method_decorator(permission_required('sisulu.view_user', raise_exception=True), name='list')
class UserListAPIView(ListAPIView):
    serializer_class = UserSerializer
    search_fields = ['first_name', 'last_name', 'username', 'email',  ]

    def get_queryset(self):
        return User.objects.all()



class LoginView(APIView):

    @sensitive_variables('password')
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if username is not None and password is not None:
            user = authenticate(request, username=username, password=password)
            if user is None:
                return Response({
                    'message': 'Account unknown or disabled, or password incorrect'
                }, status=400)
            else:
                login(request, user)
                return Response(UserSerializer(instance=user).data)


        return Response({
            'message': 'Username and password both required'
        }, status=400)


class LogoutView(APIView):

    @staticmethod
    def post(request):
        logout(request)

        return Response(JSONRenderer().render({'message': 'success'}))