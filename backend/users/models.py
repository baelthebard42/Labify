from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin



# Create your models here.
class CustomManager(BaseUserManager): #This is used for customizing properties for the User class below

    def create_user(self, user_name, email, password, **other_fields ): #overriding the create_user method for customization. This is the method that runs when we register a user.
        if not email:
            raise ValueError('Email is required')
        if not user_name:
            raise ValueError('Username is required')
        email=self.normalize_email(email)
        new=self.model(user_name=user_name, email=email, **other_fields) #creating a new instance of class User (class associated with the manager)
        new.set_password(password)
        new.save()
        return new
    
    def create_superuser(self, user_name, email, password, **other_fields): 
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:  #getting the is_staff value from other fields. 
            raise ValueError('Superusers must be staffs')
        
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superusers must be superusers')
        
        return self.create_user( user_name, email, password, **other_fields) #Basically we provided superuser permissions to the instance and created the account normally by calling this line.
    




class User(AbstractBaseUser, PermissionsMixin): #Class for user
    user_name=models.CharField(max_length=15, unique=True )
    email=models.EmailField(max_length=30, unique=True)
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    objects=CustomManager() #changed the default manager i.e models.Manager() to the custom manager I made above

    #validation fields
    USERNAME_FIELD='user_name' #used for login/registration along with password
    REQUIRED_FIELDS=[ 'email'] 

    def __str__(self):
        return self.user_name


    


