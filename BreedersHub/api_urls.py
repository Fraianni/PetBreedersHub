from django.urls import path

from BreedersHub.views.login import *
from BreedersHub.views.register import breeder_register
from BreedersHub.views.breeds import *
from animals.views.animals import *


urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),  # No 'api/' here
    path('check-auth/', check_auth, name='check_auth'),
    path('logout/', logout_view, name='logout'),  # Add the logout route
    path('breeder/register/', breeder_register, name='breeder-register'),
    path('breeds/', BreedListView.as_view(), name='breed-list-create'),
    path('breeder/breeds/', BreederBreedsListView.as_view(), name='breeder_breeds'),
    path('breeder/dogs', BreederDogsListView.as_view(), name='breeder_dogs'),
    path('breeder/dogs/<int:dog_id>/delete/', delete_dog, name='delete_dog'),
    path('breeder/dogs/<int:dog_id>/update/', update_dog, name='update_dog'),
    path('add-new-litter/', add_new_litter, name='add_new_litter'),
    path('dogs/by-breed-and-gender/', DogByBreedAndGenderView.as_view(), name='dog-by-breed-and-gender'),

    # altre rotte
]
