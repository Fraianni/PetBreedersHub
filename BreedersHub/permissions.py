# permissions.py
from rest_framework.permissions import BasePermission

class IsAllevatore(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='allevatore').exists()

class IsUtente(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='utente').exists()
