from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import json

# Create your views here.

def checkConnect(request):
    return JsonResponse(data={'message': 'You are connected!!'}, status=status.HTTP_200_OK,  )
