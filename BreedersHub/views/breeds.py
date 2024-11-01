# views.py

from rest_framework import generics

from BreedersHub.models.breeder import Breed
from BreedersHub.serializers.serializers import BreedSerializer
from rest_framework.permissions import IsAuthenticated

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


