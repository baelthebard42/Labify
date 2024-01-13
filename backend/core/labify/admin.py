from django.contrib import admin
from .models import LabSession, StudentInLab

# Register your models here.

admin.site.register(LabSession )
admin.site.register(StudentInLab)
