import requests
from django.conf import settings  # Import settings to access API key
from django.core.management.base import BaseCommand

from BreedersHub.models.breeder import Breed

DOG_BREEDS_API_URL = "https://api.thedogapi.com/v1/breeds"
CAT_BREEDS_API_URL = "https://api.thecatapi.com/v1/breeds"

class Command(BaseCommand):
    help = "Fetch breeds for dogs and cats from external APIs and update the local database."

    def handle(self, *args, **kwargs):
        self.fetch_and_save_breeds(DOG_BREEDS_API_URL, "dog")
        self.fetch_and_save_breeds(CAT_BREEDS_API_URL, "cat")
        self.stdout.write(self.style.SUCCESS("Breeds updated successfully."))

    def fetch_and_save_breeds(self, api_url, animal_type):
        # Add your API key here
        headers = {
            'x-api-key': settings.DOG_API_KEY,  # Replace with your actual key name in settings
        }
        
        response = requests.get(api_url, headers=headers)
        if response.status_code == 200:
            breeds = response.json()
            for breed in breeds:
                Breed.objects.update_or_create(
                    breed_id=breed["id"],
                    defaults={
                        "name": breed["name"],
                        "animal_type": animal_type,
                        "temperament": breed.get("temperament", ""),
                        "origin": breed.get("origin", ""),
                        "life_span": breed.get("life_span", ""),
                        "weight": breed.get("weight", ""),
                        "height": breed.get("height", ""),
                        "image_url": breed.get("image", {}).get("url", ""),
                    },
                )
        else:
            self.stdout.write(self.style.ERROR(f"Failed to fetch {animal_type} breeds."))

