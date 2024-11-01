# views.py

from rest_framework import generics

from BreedersHub.models.breeder import Breed
from BreedersHub.serializers.serializers import BreedSerializer
from rest_framework.permissions import IsAuthenticated

class BreedListView(generics.ListAPIView):
    serializer_class = BreedSerializer

    def get_queryset(self):
        animal_type = self.request.query_params.get('type', None)
        if animal_type:
            return Breed.objects.filter(animal_type=animal_type)
        return Breed.objects.all()

class BreederBreedsListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BreedSerializer

    def get_queryset(self):
        import pdb; pdb.set_trace();
        breeder = self.request.user.breeder
        breeder_breeds = breeder.breeds.all()
        # Get the logged-in breeder and return their breeds
        return Breed.objects.filter(id__in=breeder_breeds.values_list('id', flat=True))

