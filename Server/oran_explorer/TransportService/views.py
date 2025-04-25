from django.shortcuts import render
from .serializers import TouristSerializer,TouristGuideSerializer,TaxiDriverSerializer,TaxiSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Vehicle, VehicleLocation

from .models import Taxi, Bus, Train, Tram,TouristGuide,Tourist , TaxiDriver
from math import radians, sin, cos, sqrt, atan2

RADIUS_KM = 100  # Static radius

class TouristGuideCreateView(APIView):
    def post(self, request):
        serializer = TouristGuideSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateTouristView(APIView):
    def post(self, request):
        serializer = TouristSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CreateTaxiView(APIView):
    def post(self, request):
        serializer = TaxiSerializer(data=request.data)
        if serializer.is_valid():
            taxi = serializer.save()
            return Response(TaxiSerializer(taxi).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateTaxiDriverView(APIView):
    def post(self, request):
        serializer = TaxiDriverSerializer(data=request.data)
        if serializer.is_valid():
            driver = serializer.save()
            return Response(TaxiDriverSerializer(driver).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateVehicleLocationView(APIView):
    def post(self, request):
        vehicle_type = request.data.get("vehicle_type")
        vehicle_id = request.data.get("vehicle_id")
        latitude = request.data.get("latitude")
        longitude = request.data.get("longitude")

        if not all([vehicle_type, vehicle_id, latitude, longitude]):
            return Response({"error": "Missing required fields"}, status=400)

        vehicle_class = {"Taxi": Taxi, "Bus": Bus, "Train": Train, "Tram": Tram}.get(vehicle_type)
        if not vehicle_class:
            return Response({"error": "Invalid vehicle type"}, status=400)

        try:
            vehicle = vehicle_class.objects.get(id=vehicle_id)
            vehicle.location.latitude = float(latitude)
            vehicle.location.longitude = float(longitude)
            vehicle.location.save()
            return Response({"message": "Location updated successfully"}, status=200)
        except vehicle_class.DoesNotExist:
            return Response({"error": "Vehicle not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        




def nearcalc(lat1, lon1, lat2, lon2):
    lat1 = float(lat1)
    lon1 = float(lon1)
    lat2 = float(lat2)
    lon2 = float(lon2)
    R = 6371  # Earth radius in km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

class NearbyVehiclesView(APIView):
    def get(self, request):
        try:
            user_lat = float(request.query_params.get("lat"))
            user_lon = float(request.query_params.get("lon"))
        except (TypeError, ValueError):
            return Response({"error": "Latitude and longitude must be provided and valid."}, status=400)

        # Fetch all vehicles
        all_vehicles = list(Taxi.objects.select_related('location')) + \
                       list(Bus.objects.select_related('location')) + \
                       list(Train.objects.select_related('location')) + \
                       list(Tram.objects.select_related('location'))

        nearby = []
        for vehicle in all_vehicles:
            loc = vehicle.location
            if vehicle.status != 'out_of_service' and nearcalc(user_lat, user_lon, loc.latitude, loc.longitude) <= RADIUS_KM:
                nearby.append({
                    "type": vehicle.__class__.__name__,
                    "id": vehicle.id,
                    "latitude": loc.latitude,
                    "longitude": loc.longitude,
                    "status": vehicle.status
                })

        return Response({"vehicles": nearby}, status=200)

    



class TouristGuideListView(APIView):
    def get(self, request):
        tourist_guides = TouristGuide.objects.all()
        data = []
        for guide in tourist_guides:
            data.append({
                "id": guide.id,
                "name": guide.name,
                "bio": guide.bio,
                "languages_spoken": guide.languages_spoken,
                "rating": guide.rating,
                "phone_number": guide.phone_number,
                "is_available": guide.is_available,
                "img": guide.img,
            })

        return Response({"tourist_guides": data}, status=status.HTTP_200_OK)


class TouristGuideDetailView(APIView):
    def get(self, request, guide_id):
        try:
            guide = TouristGuide.objects.get(id=guide_id)
            data = {
                "id": guide.id,
                "name": guide.name,
                "bio": guide.bio,
                "languages_spoken": guide.languages_spoken,
                "rating": guide.rating,
                "phone_number": guide.phone_number,
                "is_available": guide.is_available,
                "img": guide.img,
            }
            return Response({"tourist_guide": data}, status=status.HTTP_200_OK)
        except TouristGuide.DoesNotExist:
            return Response({"error": "Tourist guide not found."}, status=status.HTTP_404_NOT_FOUND)



class FavoriteTouristGuideView(APIView):
    def post(self, request):
        tourist_id = request.data.get("tourist_id")
        guide_id = request.data.get("guide_id")

        if not tourist_id or not guide_id:
            return Response({"error": "tourist_id and guide_id are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tourist = Tourist.objects.get(id=tourist_id)
            guide = TouristGuide.objects.get(id=guide_id)

            if guide in tourist.favorite_guidtour.all():
                return Response({"message": "Already in favorites."}, status=status.HTTP_200_OK)

            tourist.favorite_guidtour.add(guide)
            return Response({"message": f"{guide.name} added to favorites."}, status=status.HTTP_201_CREATED)

        except Tourist.DoesNotExist:
            return Response({"error": "Tourist not found."}, status=status.HTTP_404_NOT_FOUND)
        except TouristGuide.DoesNotExist:
            return Response({"error": "Tourist Guide not found."}, status=status.HTTP_404_NOT_FOUND)
        


class TouristFavoritesView(APIView):
    def get(self, request, tourist_id):
        try:
            tourist = Tourist.objects.get(id=tourist_id)
            favorites = tourist.favorite_guidtour.all()

            data = [
                {
                    "id": guide.id,
                    "name": guide.name,
                    "bio": guide.bio,
                    "rating": guide.rating,
                    "img": guide.img,
                }
                for guide in favorites
            ]
            return Response({"favorites": data}, status=status.HTTP_200_OK)
        except Tourist.DoesNotExist:
            return Response({"error": "Tourist not found."}, status=status.HTTP_404_NOT_FOUND)



class TaxiDetailView(APIView):
    def get(self, request, taxi_id):
        try:
            taxi = Taxi.objects.get(id=taxi_id)
        except Taxi.DoesNotExist:
            return Response({"error": "Taxi not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            driver = taxi.driver  
            driver_info = {
                "name": driver.name,
                "phone_number": driver.phone_number,
                "license_number": driver.license_number
            }
        except TaxiDriver.DoesNotExist:
            driver_info = {
                "name": taxi.driver_name,
                "phone_number": taxi.phone_number,
                "license_number": None  
            }

        return Response({
            "taxi": {
                "id": taxi.id,
                "car_model": taxi.car_model,
                "color": taxi.color,
                "location": {
                    "latitude": taxi.location.latitude,
                    "longitude": taxi.location.longitude
                },
            },
            "driver": driver_info
        })