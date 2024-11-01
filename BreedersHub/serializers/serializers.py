# serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers

from BreedersHub.models.breeder import Breed


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # Includes all fields of the User model
class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = '__all__'  # Includes all fields of the User model
