from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True) #here, password is write only as well as visible.
    class Meta:
        model=User
        fields=['id', 'user_name', 'email', 'password']
        #extra_kwargs={'password':{'write_only':True}} #specifying that password can't be read by anyone but this leads to password not requiring 

    def create(self, validated_data): #for password encryption, is fired when we use instance.save()
        password=validated_data.pop('password', None) #removes value of password from validated_data and stores in password
        instance=self.Meta.model(**validated_data) #self.Meta.model is the User (see). i.e an instance of NewUser is being made with validated data, without password set
        if password is not None:
            instance.set_password(password) #this encrypts the password
        instance.save()
        return instance

    