import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

DOG_BREEDS_API_URL = "https://api.thedogapi.com/v1/breeds"
CAT_BREEDS_API_URL = "https://api.thecatapi.com/v1/breeds"

@api_view(['GET'])
def get_animal_types(request):
    # Manually defining animal types since there's no API for this
    animal_types = [
        {"id": "dog", "name": "Dog"},
        {"id": "cat", "name": "Cat"}
    ]
    return Response(animal_types, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_breeds_by_animal_type(request, animal_type):
    if animal_type == "dog":
        response = requests.get(DOG_BREEDS_API_URL)
    elif animal_type == "cat":
        response = requests.get(CAT_BREEDS_API_URL)
    else:
        return Response({"error": "Invalid animal type"}, status=status.HTTP_400_BAD_REQUEST)

    if response.status_code == 200:
        # Extracting necessary breed data
        breed_data = [{"id": breed["id"], "name": breed["name"]} for breed in response.json()]
        return Response(breed_data, status=status.HTTP_200_OK)
    return Response({"error": "Unable to fetch breeds"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
