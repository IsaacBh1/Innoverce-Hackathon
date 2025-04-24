from django.db import models

class Resto(models.Model):
    name = models.CharField(max_length=255)
    cuisine = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    delivery_time = models.CharField(max_length=50)
    image =  models.CharField(max_length=255, blank=True, null=True)
    price_range = models.CharField(max_length=10)
    description = models.TextField()
    promotion = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    

class Dish(models.Model):
    resto = models.ForeignKey(Resto, related_name='dishes', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    image = models.URLField()

    def __str__(self):
        return self.name
    

