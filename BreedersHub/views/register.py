from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError
from BreedersHub.models.breeder import Breed, Breeder

@api_view(['POST'])
def breeder_register(request):
    data = request.data
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    breeds_ids = data.get('breeds')
    kennel_name = data.get('affisso')

    # Check if username already exists
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if email already exists
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already in use"}, status=status.HTTP_400_BAD_REQUEST)

    # Ensure breeds_ids is provided and valid
    if not breeds_ids:
        return Response({"error": "No breeds selected"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if all breed IDs are valid
    if not all(Breed.objects.filter(id=breed_id).exists() for breed_id in breeds_ids):
        return Response({"error": "One or more selected breeds do not exist"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Create the User
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password),  # Hash password
            is_staff=True
        )

        # Create the Breeder
        breeder = Breeder.objects.create(
            user=user,
            kennel_name=kennel_name
        )
        
        # Set the breeds for the Breeder
        breeds = Breed.objects.filter(id__in=breeds_ids)
        breeder.breeds.set(breeds)  # Correct way to assign Many-to-Many relationships

        return Response({"message": "Registration successful"}, status=status.HTTP_201_CREATED)

    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
