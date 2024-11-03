# views.py

from rest_framework import generics

from BreedersHub.models.breeder import Breed
from BreedersHub.serializers.serializers import BreedSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from animals.serializers.serializers import DogSerializer
from animals.models.animals import *

class BreedListView(generics.ListAPIView):
    serializer_class = BreedSerializer

    def get_queryset(self):
        animal_type = self.request.query_params.get('type', None)
        if animal_type:
            return Breed.objects.filter(animal_type=animal_type)
        return Breed.objects.all()

class BreederBreedsListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BreedSerializer

    def get_queryset(self):
        breeder = self.request.user.breeder
        breeder_breeds = breeder.breeds.all()
        # Get the logged-in breeder and return their breeds
        return Breed.objects.filter(id__in=breeder_breeds.values_list('id', flat=True))

from rest_framework.views import APIView
from rest_framework.response import Response


class BreederDogsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Supponendo che il breeder sia collegato all'utente autenticato
        breeder = request.user.breeder
        dogs = Dog.objects.filter(breed__breeder=breeder)
        serializer = DogSerializer(dogs, many=True)
        return Response(serializer.data)
class DogByBreedAndGenderView(APIView):
    def get(self, request):
        breed = request.query_params.get('breed', None)
        gender = request.query_params.get('gender', None)

        # Filtering dogs by breed and gender
        dogs = Dog.objects.all()  # Fetch all dogs
        if breed:
            dogs = dogs.filter(breed__id=breed)  # Assuming you have a relationship to a Breed model
        if gender:
            dogs = dogs.filter(gender=gender)  # Assuming you have a gender field in your Dog model

        serializer = DogSerializer(dogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

