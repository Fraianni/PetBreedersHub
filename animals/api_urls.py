from django.urls import path

from animals.views.animals import DogCreateView

urlpatterns = [
    path('add-animal/', DogCreateView.as_view(), name='dog-create'),
]
