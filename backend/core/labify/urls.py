from django.urls import path
from . import views

urlpatterns = [
    path('checkConnect', views.checkConnect)
]
