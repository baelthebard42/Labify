from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from django.http import JsonResponse
import json
from .serializers import LabSerializer, StudentSerializer
from .models import LabSession, StudentInLab
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from users.models import User
from users.serializers import UserSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import os
from django.conf import settings
from  labify.questionsgenerator import generate_questions_from_pdf




# Create your views here.

class GetPermissions(BasePermission): #custom permission class
    def has_object_permission(self, request, view, obj):

        return request.user==obj.instructor#checking is done only for post method as get and other methods are cleared

class CreateLabSession(generics.ListCreateAPIView):
    queryset=LabSession.objects.all()
    serializer_class=LabSerializer
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)


class CreateStudentInLabInstances(generics.ListCreateAPIView):
    queryset=StudentInLab.objects.all()
    serializer_class=StudentSerializer
    permission_classes=[IsAuthenticated]


class getLabs(APIView):

    permission_classes=[IsAuthenticated]

    def get(self, request, format=None):
        labs = LabSession.objects.filter(instructor=request.user)
        serializer = LabSerializer(labs, many=True)  
        return Response(serializer.data)
    
class getUser(generics.RetrieveAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer

class getOneLab(generics.RetrieveAPIView):
    queryset=LabSession.objects.all()
    serializer_class=LabSerializer

class getStudentLab(APIView):

    permission_classes=[IsAuthenticated]

    def get(self, request, format=None):
        ins=StudentInLab.objects.filter(student=User.objects.get(id=self.kwargs['stdpk'], lab=LabSession.objects.get(id=self.kwargs['labpk'])))
        serializer=StudentSerializer(ins)
        return Response(serializer.data)
    


@csrf_exempt
@require_POST
def upload_file(request):
    uploaded_file = request.FILES.get('pdf')


    
    if uploaded_file:
        destination_path = os.path.join(settings.MEDIA_ROOT, 'pdfs', uploaded_file.name)

        # Save the file to the specified location
        with open(destination_path, 'wb') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

        return JsonResponse(generate_questions_from_pdf(destination_path), safe=False)
    else:
        return JsonResponse({'error': 'No file uploaded'}, status=400)



