from django.urls import path
from .views import CreateListUsers

urlpatterns = [
    path('create', CreateListUsers.as_view(), name='create'),
   
]
