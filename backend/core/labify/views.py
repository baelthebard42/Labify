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



