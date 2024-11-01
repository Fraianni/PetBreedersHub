from rest_framework.decorators import api_view
from rest_framework.response import Response

from BreedersHub.models.breeder import Breed

@api_view(['GET'])
def get_breeds_by_animal_type(request, animal_type):
    breeds = Breed.objects.filter(animal_type=animal_type)
    breed_data = [{"id": breed.breed_id, "name": breed.name} for breed in breeds]
    return Response(breed_data, status=200)
