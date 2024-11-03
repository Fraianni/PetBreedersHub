# serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers

from BreedersHub.models.breeder import Breed
from animals.models.animals import Dog, Litter


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' 
class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = '__all__'  
class LitterSerializer(serializers.ModelSerializer):
    from animals.serializers.serializers import DogSerializer
    dogs = DogSerializer(many=True)  # Indicates that this field can contain multiple dog entries

    class Meta:
        model = Litter
        fields = '__all__'  

    def create(self, validated_data):
        # Extract dogs data from the validated data
        dogs_data = validated_data.pop('dogs')  
        
        # Create a Litter instance
        litter = Litter.objects.create(**validated_data) 
        
        # Create Dog instances for each dog in the dogs_data list
        for dog_data in dogs_data:
            Dog.objects.create(litter=litter, **dog_data)
        
        return litter