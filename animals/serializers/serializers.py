from rest_framework import serializers

from BreedersHub.models.breeder import Breed
from models.animals import *

class DogSerializer(serializers.ModelSerializer):
    breed = serializers.PrimaryKeyRelatedField(queryset=Breed.objects.all())

    class Meta:
        model = Dog
        fields = '__all__'