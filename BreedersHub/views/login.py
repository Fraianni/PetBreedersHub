from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from BreedersHub.serializers.serializers import *

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Log the user in
            login(request, user)

            # Identify the user's group
            if user.groups.filter(name="allevatore").exists():
                role = "allevatore"
            elif user.groups.filter(name="utente").exists():
                role = "utente"
            else:
                role = "ospite"  # For users without a specific group

            # You can also return the token or other user information here
            return Response({
                "message": "Login successful",
                "role": role,
                "username": user.username
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

from django.http import JsonResponse

def check_auth(request):
    if request.user.is_authenticated:
        user_serializer = UserSerializer(request.user)
        user_info = {
            "user": user_serializer.data,
            "is_authenticated": True,
        }
        return JsonResponse(user_info)
    else:
        return JsonResponse({"is_authenticated": False}, status=200)
    
from django.contrib.auth import logout
def logout_view(request):
    logout(request)  # This will remove the session data for the user
    return JsonResponse({"message": "Logout successful"}, status=200)