# views.py
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Identifica il gruppo dell'utente
            if user.groups.filter(name="allevatore").exists():
                role = "allevatore"
            elif user.groups.filter(name="utente").exists():
                role = "utente"
            else:
                role = "ospite"  # Per utenti senza gruppo specifico

            # Puoi restituire anche il token o altre informazioni utente qui
            return Response({
                "message": "Login eseguito con successo",
                "role": role,
                "username": user.username
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Credenziali non valide"}, status=status.HTTP_401_UNAUTHORIZED)
