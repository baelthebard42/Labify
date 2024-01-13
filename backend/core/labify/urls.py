from django.urls import path
from . import views

urlpatterns = [
    path('initiateLab', views.CreateLabSession.as_view())
]
