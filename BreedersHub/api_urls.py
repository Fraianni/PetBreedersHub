from django.urls import path

from BreedersHub.views.login import *
from BreedersHub.views.register import breeder_register
from BreedersHub.views.breeds import *


urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),  # No 'api/' here
    path('check-auth/', check_auth, name='check_auth'),
    path('logout/', logout_view, name='logout'),  # Add the logout route
    path('breeder/register/', breeder_register, name='breeder-register'),
    path('breeds/', BreedListView.as_view(), name='breed-list-create'),
    path('breeder/breeds/', BreederBreedsListView.as_view(), name='breed-list-create'),

    # altre rotte
]
