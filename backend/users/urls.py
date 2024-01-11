from django.urls import path
from .views import CreateListUsers, LogoutView, sendAuthenticatedUser

urlpatterns = [
    path('create', CreateListUsers.as_view(), name='create'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('authUser', sendAuthenticatedUser, name='auth' )
]
