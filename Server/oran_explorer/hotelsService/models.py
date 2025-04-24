from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Hotel(models.Model):
    HOTEL_TYPES = [
        ('luxury', 'Luxury'),
        ('budget', 'Budget'),
        ('boutique', 'Boutique'),
        ('resort', 'Resort'),
        ('hostel', 'Hostel'),
    ]

    name = models.CharField(max_length=255)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    rating = models.DecimalField(max_digits=3,
    decimal_places=2,
    default=0.0,
    validators=[MinValueValidator(0.0), MaxValueValidator(5.0)] )
    type = models.CharField(max_length=20, choices=HOTEL_TYPES,null=True)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2 , blank=True ,null=True)
    phone_number = models.CharField(max_length=20, blank=True)
    image =models.CharField(max_length=255)

    def __str__(self):
        return self.name
