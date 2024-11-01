# Animals/admin.py

from django.contrib import admin

from BreedersHub.models.breeder import Breed

class BreedAdmin(admin.ModelAdmin):
    list_display = ('breed_id', 'name', 'animal_type', 'origin', 'temperament', 'life_span')  # Fields to display in the list view
    search_fields = ('name', 'animal_type')  # Add search functionality
    list_filter = ('animal_type',)  # Add filter options

admin.site.register(Breed)

