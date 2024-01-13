from rest_framework import serializers
from .models import LabSession, StudentInLab

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model=LabSession
        fields='__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentInLab
        fields='__all__'