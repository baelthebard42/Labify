from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('initiateLab', views.CreateLabSession.as_view()),
    path('createStudentInstance', views.CreateStudentInLabInstances.as_view())
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
