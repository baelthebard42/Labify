from rest_framework import generics, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated



# Create your views here.

class CreateListUsers(generics.ListCreateAPIView): #class based view to create users.
    queryset=User.objects.all()
    serializer_class=UserSerializer



class LogoutView(APIView):

    def post(self, request): #overriding the post method for this view
        try:
            refresh_token=request.data['refresh_token'] #request token extraction from request
            token=RefreshToken(refresh_token) #creating a RefreshToken instance with the data for blacklisting
            token.blacklist() #blacklisting the token so it doesn't gets misused again
            return Response("Logout sucessful !", status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sendAuthenticatedUser(request):
    authUser=UserSerializer(request.user)
    return Response(authUser.data, status=status.HTTP_200_OK )


