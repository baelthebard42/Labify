from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('initiateLab', views.CreateLabSession.as_view()),
    path('createStudentInstance', views.CreateStudentInLabInstances.as_view()),
    path('getLabs', views.getLabs.as_view()),
    path('getUser/<int:pk>', views.getUser.as_view()),
    path('oneLab/<int:pk>', views.getOneLab.as_view()),
    path('labstd/<int:labpk>/<int:stdpk>', views.getStudentLab.as_view()),
     path('upload', views.upload_file, name='upload_file')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
