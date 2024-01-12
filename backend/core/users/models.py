from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import Group, Permission



# Create your models here.
class CustomManager(BaseUserManager): #This is used for customizing properties for the User class below

    def create_user(self, firstname, email, password, **other_fields ): #overriding the create_user method for customization. This is the method that runs when we register a user.
        if not email:
            raise ValueError('Email is required')
        if not firstname:
            raise ValueError('First name is required')
        email=self.normalize_email(email)
        new=self.model(firstname=firstname, email=email, **other_fields) #creating a new instance of class User (class associated with the manager)
        new.set_password(password)
        new.save()
        return new
    
    def create_superuser(self, firstname, email, password, **other_fields): 
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:  #getting the is_staff value from other fields. 
            raise ValueError('Superusers must be staffs')
        
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superusers must be superusers')
        
        return self.create_user(  email, firstname, password, **other_fields) #Basically we provided superuser permissions to the instance and created the account normally by calling this line.
    




class User(AbstractBaseUser, PermissionsMixin): #Class for user
    firstname=models.CharField(max_length=20)
    lastname=models.CharField(max_length=20)
    email=models.EmailField(max_length=30, unique=True)
    rollnum=models.CharField(max_length=10, unique=True, blank=True, null=True)
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    user_type=models.CharField(max_length=20, choices=[('student', 'Student'), ('instructor', 'Instructor')])
    objects=CustomManager() #changed the default manager i.e models.Manager() to the custom manager I made above

    groups = models.ManyToManyField(Group, related_name='user_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='user_permissions')

    #validation fields
    USERNAME_FIELD= 'email' #used for login/registration along with password
    REQUIRED_FIELDS=['firstname']

    def __str__(self):
        return self.firstname


    


