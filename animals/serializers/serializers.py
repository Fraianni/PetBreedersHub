from rest_framework import serializers

from BreedersHub.models.breeder import Breed
from animals.models.animals import *

class DogSerializer(serializers.ModelSerializer):
    from BreedersHub.serializers.serializers import BreedSerializer
    breed = BreedSerializer()  # Imposta come read_only
    age = serializers.SerializerMethodField()

    class Meta:
        model = Dog
        fields = '__all__'  # O specifica i campi che desideri
    def create(self, validated_data):
        # Estrai i dati di breed
        breed_data = validated_data.pop('breed', None)
        if breed_data:
            # Trova o crea l'oggetto Breed
            breed, created = Breed.objects.get_or_create(**breed_data)

            # Crea l'oggetto Dog
            dog = Dog.objects.create(breed=breed, **validated_data)
            return dog

        # In caso non ci sia breed_data, crea solo Dog
        return Dog.objects.create(**validated_data)
    def update(self, instance, validated_data):
        breed_data = validated_data.pop('breed', None)  # Extract breed data
        if breed_data:
            breed, created = Breed.objects.get_or_create(**breed_data)  # Get or create the breed
            instance.breed = breed  # Assign the breed instance to the dog

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    def get_age(self, obj):
        return obj.get_age_display()

class LitterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Litter
        fields = '__all__'