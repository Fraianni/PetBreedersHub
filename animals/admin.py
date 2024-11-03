# Animals/admin.py

from django.contrib import admin

from BreedersHub.models.breeder import Breed
from animals.models.animals import Dog

class BreedAdmin(admin.ModelAdmin):
    list_display = ('breed_id', 'name', 'animal_type', 'origin', 'temperament', 'life_span')  # Fields to display in the list view
    search_fields = ('name', 'animal_type')  # Add search functionality
    list_filter = ('animal_type',)  # Add filter options

admin.site.register(Breed)

class DogAdmin(admin.ModelAdmin):
    list_display = ('name', 'gender', 'breed', 'date_of_birth', 'color', 'weight', 'height', 'photo')  # Fields to display in the list view
    search_fields = ('name', 'breed__name')  # Add search functionality, allowing search by breed name
    list_filter = ('gender', 'breed')  # Add filter options

admin.site.register(Dog, DogAdmin) 