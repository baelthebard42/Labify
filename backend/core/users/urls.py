from django.urls import path
from .views import CreateListUsers, sendAuthenticatedUser, LogoutView

urlpatterns = [
    path('create', CreateListUsers.as_view(), name='create'),
    path('getAuthUser', sendAuthenticatedUser ),
    path('logout', LogoutView.as_view())
   
]
