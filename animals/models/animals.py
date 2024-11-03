from django.db import models
from BreedersHub.models.breeder import *
from datetime import date

class Litter(models.Model):
    father = models.ForeignKey(Dog, related_name='father_litters', on_delete=models.CASCADE)
    mother = models.ForeignKey(Dog, related_name='mother_litters', on_delete=models.CASCADE)
    litter = models.TextField()  # Aggiungi informazioni aggiuntive sulla cucciolata
    date_of_birth = models.DateField(auto_now_add=True)  # Data di nascita della cucciolata

    def __str__(self):
        return f"Litter of {self.mother.name} and {self.father.name}"
class Dog(models.Model):
    GENDER_CHOICES = [
    ('male', 'Male'),     
        ('female', 'Female'),  
    ]

    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    breed = models.ForeignKey(Breed, on_delete=models.CASCADE, related_name='all_dogs_same_breed')
    date_of_birth = models.DateField(null=True, blank=True, default=date(2022, 6, 20))  # Imposta la data predefinita
    color = models.CharField(max_length=50)
    weight = models.FloatField()
    height = models.FloatField(null=True,blank=True)
    photo = models.ImageField(upload_to='dogs/')
    loi = models.CharField(max_length=50,null=True,blank=True)
    father = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='offspring_father')
    mother = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='offspring_mother')
    litter = models.ForeignKey(Litter, related_name='dogs', null=True, blank=True, on_delete=models.SET_NULL)
    def __str__(self):
        return self.name
    def calculate_age(self):
        today = date.today()
        age_years = today.year - self.date_of_birth.year
        age_months = today.month - self.date_of_birth.month

        # Adjust age if the birthday has not occurred this year
        if age_months < 0:
            age_years -= 1
            age_months += 12

        # Return age as a tuple (years, months)
        return age_years, age_months

    def get_age_display(self):
        age_years, age_months = self.calculate_age()
        if age_years > 0:
            return f"{age_years} year{'s' if age_years > 1 else ''} {age_months} month{'s' if age_months != 1 else ''}".strip()
        else:
            return f"{age_months} month{'s' if age_months != 1 else ''}"

class DogForSale(Dog):
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_shippable = models.BooleanField(default=False)
    contract_file = models.FileField(upload_to='contracts/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} for Sale"
