from django.urls import path

from . import views


urlpatterns = [
    path("api/login/", LoginView.as_view(), name="login"),
    # altre rotte
]
