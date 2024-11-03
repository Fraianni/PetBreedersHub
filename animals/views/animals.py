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
    def post(self, request, *args, **kwargs):
        import pdb; pdb.set_trace();
        data = request.data.copy()  # Copia i dati della richiesta
        data_dict = {key: value[0] for key, value in request.data.lists()}
        breed_id = data_dict['breed']
        if breed_id:  # Se l'ID di breed è presente
            try:
                # Recupera l'oggetto Breed usando l'ID
                breed = Breed.objects.get(id=breed_id)
                data_dict['breed'] = {'id': breed.id, 'name': breed.name}
            except Breed.DoesNotExist:
                return Response({'error': 'Breed not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = DogSerializer(data=data_dict)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['DELETE'])
def delete_dog(request, dog_id):
    try:
        dog = Dog.objects.get(id=dog_id)
        dog.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Dog.DoesNotExist:
        return Response({"error": "Dog not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_dog(request, dog_id):
    try:
        dog = Dog.objects.get(id=dog_id)
        serializer = DogSerializer(dog, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Dog.DoesNotExist:
        return Response({"error": "Dog not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def add_new_litter(request):
    if request.method == 'POST':
        import pdb; pdb.set_trace();
        # Deserialize the incoming data
        serializer = LitterSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new litter instance
            litter = serializer.save()

            # Optionally, you can save associated dogs if needed
            for dog_data in request.data.get('dogs', []):
                Dog.objects.create(litter=litter, **dog_data)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)