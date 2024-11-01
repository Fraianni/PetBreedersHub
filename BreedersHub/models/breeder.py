# models.py

from django.db import models
from django.contrib.auth.models import User

from django.db import models

class Breed(models.Model):
    breed_id = models.CharField(max_length=100, unique=True,default=0)  # ID from the external API
    name = models.CharField(max_length=100)
    animal_type = models.CharField(max_length=50,null=True,blank=True)  # e.g., 'dog' or 'cat'
    temperament = models.TextField(blank=True)  # Characteristics of the breed
    origin = models.CharField(max_length=100, blank=True)  # Country of origin
    life_span = models.CharField(max_length=100, blank=True)  # Life expectancy
    weight = models.CharField(max_length=100, blank=True)  # Weight range
    height = models.CharField(max_length=100, blank=True)  # Height range
    image_url = models.URLField(blank=True)  # URL to an image of the breed

    def __str__(self):
        return self.name


class Breeder(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    breeds = models.ManyToManyField(Breed)
    kennel_name  = models.CharField(max_length=1024,blank=True,null=True)

    def __str__(self):
        return self.user.username

class Dog(models.Model):
    GENDER_CHOICES = [
        ('maschio', 'Maschio'),
        ('femmina', 'Femmina'),
    ]

    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    breed = models.ForeignKey(Breed, on_delete=models.CASCADE)  # Change to ForeignKey
    age = models.PositiveIntegerField()
    color = models.CharField(max_length=50)
    weight = models.FloatField()
    height = models.FloatField()
    photo = models.ImageField(upload_to='dogs/')

    def __str__(self):
        return self.name
