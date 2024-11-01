from rest_framework.decorators import api_view
from rest_framework.response import Response

from BreedersHub.models.breeder import Breed
from animals.models.animals import *

@api_view(['GET'])
def get_breeds_by_animal_type(request, animal_type):
    breeds = Breed.objects.filter(animal_type=animal_type)
    breed_data = [{"id": breed.breed_id, "name": breed.name} for breed in breeds]
    return Response(breed_data, status=200)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from animals.serializers.serializers import *

class DogCreateView(APIView):
    def post(self, request):
        import pdb; pdb.set_trace();
        data = request.data.copy()

        # Convert `breed` to only its `value` (the primary key)
        if isinstance(data.get('breed'), dict):
            data['breed'] = data['breed'].get('value')
        
        # Convert `gender` to just the `value`
        if isinstance(data.get('gender'), dict):
            data['gender'] = data['gender'].get('value')

        # Initialize the serializer with modified data
        serializer = DogSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
