from rest_framework import serializers

from BreedersHub.models.breeder import Breed
from BreedersHub.serializers.serializers import BreedSerializer
from animals.models.animals import *

class DogSerializer(serializers.ModelSerializer):
    breed = BreedSerializer()  # Usa il BreedSerializer qui

    class Meta:
        model = Dog
        fields = '__all__'  # O specifica i campi che desideri