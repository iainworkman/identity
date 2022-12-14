from django.urls import path

from sisulu.api.views import ProfileAPIView, LoginView, LogoutView

urlpatterns = [
    path('profile/', ProfileAPIView.as_view(), name='api-profile'),
    path('login/', LoginView.as_view(), name='api-login'),
    path('logout/', LogoutView.as_view(), name='api-logout')
]