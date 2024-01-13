from rest_framework.response import Response
from rest_framework import status, generics
from django.http import JsonResponse
import json
from .serializers import LabSerializer, StudentSerializer
from .models import LabSession, StudentInLab
from rest_framework.permissions import IsAuthenticated




# Create your views here.

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

