from django.urls import path

from sisulu.api.views import ProfileAPIView, LoginView, LogoutView, UserCreateListAPIView, \
    UserRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('profile/', ProfileAPIView.as_view(), name='api-profile'),
    path('login/', LoginView.as_view(), name='api-login'),
    path('logout/', LogoutView.as_view(), name='api-logout'),
    path('users/', UserCreateListAPIView.as_view(), name='api-list-create-users'),
    path('users/<slug:username>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='api-retrieve-update-destroy-users')
]