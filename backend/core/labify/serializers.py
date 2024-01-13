from rest_framework import serializers
from .models import LabSession, StudentInLab

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model=LabSession
        exclude=['testInitiated', 'testEnded']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentInLab
        fields=['id', 'student', 'lab']