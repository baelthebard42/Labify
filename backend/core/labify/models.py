from django.db import models
from users.models import User
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from django.core.validators import MaxValueValidator

# Create your models here.

class LabSession(models.Model):
    instructor=models.ForeignKey(User, on_delete=models.PROTECT, related_name='sir')
    dateTime=models.DateTimeField( auto_now=False, auto_now_add=False)
    studentsList=models.ManyToManyField(User, related_name='performers')
    topic=models.CharField(max_length=50)
    objective=models.CharField(max_length=200)
    theory=models.TextField(max_length=700)
    requirements=models.CharField(max_length=50)
    resources=models.CharField(max_length=50)
    testInitiated=models.BooleanField(default=False)
    testEnded=models.BooleanField(default=False)
    sectionName=models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        # checking if the user associated with the lab session is an instructor
        if self.instructor.user_type == 'instructor':

            super().save(*args, **kwargs)
        else:
            raise ValueError("Only instructors can initialize a lab session.")
    
    def __str__(self):
        return f"{self.topic} : {self.instructor} : {self.sectionName}"


@receiver(m2m_changed, sender=LabSession.studentsList.through)
def filter_students_by_type(sender, instance, action, reverse, model, pk_set, **kwargs):
    if action == 'pre_add':
        # removes instructors from the list if added
        allowed_students = User.objects.filter(pk__in=pk_set, user_type='student')
        pk_set.intersection_update(allowed_students.values_list('pk', flat=True))


class StudentInLab(models.Model):
    student=models.ForeignKey(User, on_delete=models.PROTECT, related_name='stf')
    lab=models.ForeignKey(LabSession, on_delete=models.PROTECT, related_name='exp')
    eligible=models.BooleanField(default=False) #eligible for performing lab or not.
    passedTest=models.BooleanField(default=False)
    testMarks=models.IntegerField(default=-1, validators=[MaxValueValidator(5)])
    initial=models.FileField(upload_to='pdfs/', default=None)
    initialMarks=models.IntegerField(default=-1, validators=[MaxValueValidator(5)])

    def save(self, *args, **kwargs):

        if (self.student.user_type=='instructor'):
            raise ValueError("Instructor cannot perform experiment")

        if (self.testMarks + self.initialMarks >= 7):
            self.passedTest=True

            if self.initial is not None:
                self.eligible=True
        
        super().save(*args, **kwargs)

    def __str__(self) :
        return f"{self.student} in lab {self.lab}"
        
        


    

