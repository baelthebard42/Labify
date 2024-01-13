from rest_framework import serializers
from .models import LabSession

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model=LabSession
        exclude=['testInitiated', 'testEnded']
