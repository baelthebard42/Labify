from rest_framework.response import Response
from rest_framework import status, generics
from django.http import JsonResponse
import json
from .serializers import LabSerializer
from .models import LabSession
from rest_framework.permissions import IsAuthenticated




# Create your views here.




class CreateLabSession(generics.ListCreateAPIView):
    queryset=LabSession.objects.all()
    serializer_class=LabSerializer
    permission_classes=[IsAuthenticated]

