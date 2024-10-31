# frontend/views.py

from django.shortcuts import render

def index(request, path=''):  # Aggiungi path come argomento
    return render(request, 'index.html')  # Assicurati che il tuo index.html sia nel template directory
