from django.db import models

from django.db import models
from hotelsService.models import Hotel

class VehicleLocation(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    last_updated = models.DateTimeField(auto_now=True)



class Vehicle(models.Model):
    license_plate = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=[
        ('in_service', 'In Service'),
        ('delayed', 'Delayed'),
        ('out_of_service', 'Out of Service')
    ])
    location = models.OneToOneField(VehicleLocation, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Bus(Vehicle):
    def __str__(self):
        return f"Bus {self.license_plate}"

class Train(Vehicle):
    def __str__(self):
        return f"Train {self.license_plate}"

class Tram(Vehicle):
    def __str__(self):
        return f"Tram {self.license_plate}"

class Taxi(Vehicle):
    driver_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    car_model = models.CharField(max_length=100)
    color = models.CharField(max_length=50)

    def __str__(self):
        return f"Taxi {self.car_model} ({self.color}) - {self.driver_name}"


class TaxiDriver(models.Model):
    name = models.CharField(max_length=50)
    taxi = models.OneToOneField('Taxi', on_delete=models.CASCADE, related_name='driver')
    phone_number = models.CharField(max_length=20)
    license_number = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{__name__} (Taxi Driver)"
    
class Tourist(models.Model):
    name = models.CharField(max_length=50)
    nationality = models.CharField(max_length=50, blank=True, null=True)
    passport_number = models.CharField(max_length=50, blank=True, null=True)
    credits = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    favorite_guidtour = models.ManyToManyField("TouristGuide", related_name="favorited_by", blank=True)
    favorite_hotels = models.ManyToManyField(Hotel, related_name='favorited_by', blank=True)
    favorite_restos = models.ManyToManyField('RestoService.Resto', related_name='favorited_by', blank=True)

    def __str__(self):
        return f"{__name__} (Tourist)"


class TouristGuide(models.Model):
    name = models.CharField(max_length=50)
    bio = models.TextField(blank=True)
    languages_spoken = models.CharField(max_length=255)  
    rating = models.FloatField(default=0.0)
    phone_number = models.CharField(max_length=20, blank=True)
    is_available = models.BooleanField(default=True)
    img= models.CharField(max_length=500)
    def __str__(self):
        return f"{__name__} (Guide)"
    



