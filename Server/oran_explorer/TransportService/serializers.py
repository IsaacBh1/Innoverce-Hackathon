from rest_framework import serializers
from .models import Tourist,TouristGuide,Taxi,TaxiDriver

class TouristSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tourist
        fields = '__all__'

class TouristGuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = TouristGuide
        fields = '__all__'


class TaxiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taxi
        fields = '__all__'

class TaxiDriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxiDriver
        fields = '__all__'