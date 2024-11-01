from django.db import models
from BreedersHub.models.breeder import *

class Dog(models.Model):
    GENDER_CHOICES = [
        ('maschio', 'Maschio'),
        ('femmina', 'Femmina'),
    ]

    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    breed = models.ForeignKey(Breed, on_delete=models.CASCADE, related_name='all_dogs_same_breed')
    age = models.PositiveIntegerField()
    color = models.CharField(max_length=50)
    weight = models.FloatField()
    height = models.FloatField()
    photo = models.ImageField(upload_to='dogs/')

    def __str__(self):
        return self.name