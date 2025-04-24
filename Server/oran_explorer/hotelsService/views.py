from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Hotel
from .serializers import HotelSerializer
from TransportService.models import Tourist


class CreateHotelView(APIView):
    def post(self, request):
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class HotelDetailView(APIView):
    def get(self, request, hotel_id):
        try:
            hotel = Hotel.objects.get(id=hotel_id)
            serializer = HotelSerializer(hotel)
            return Response(serializer.data)
        except Hotel.DoesNotExist:
            return Response({"error": "Hotel not found."}, status=404)




class HotelListView(APIView):
    def get(self, request):
        hotels = Hotel.objects.all()

        rating = request.query_params.get("rating")
        hotel_type = request.query_params.get("type")
        min_price = request.query_params.get("minprice")

        if rating:
            hotels = hotels.filter(rating__gte=rating)
        if hotel_type:
            hotels = hotels.filter(type=hotel_type)
        if min_price:
            hotels = hotels.filter(price_per_night__gte=min_price)

        serializer = HotelSerializer(hotels, many=True)
        return Response(serializer.data)


class AddFavoriteHotelView(APIView):
    def post(self, request):
        hotel_id = request.data.get("hotel_id")
        tourist_id = request.data.get("tourist_id")

        if not hotel_id or not tourist_id:
            return Response(
                {"error": "Both 'hotel_id' and 'tourist_id' are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            tourist = Tourist.objects.get(id=tourist_id)
        except Tourist.DoesNotExist:
            return Response({"error": "Tourist not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            hotel = Hotel.objects.get(id=hotel_id)
        except Hotel.DoesNotExist:
            return Response({"error": "Hotel not found."}, status=status.HTTP_404_NOT_FOUND)

        if hotel in tourist.favorite_hotels.all():
            return Response(
                {"message": "Hotel is already in favorites."},
                status=status.HTTP_200_OK
            )

        tourist.favorite_hotels.add(hotel)
        return Response(
            {"message": f"Hotel '{hotel.name}' has been added to favorites."},
            status=status.HTTP_201_CREATED
        )
    

class GetFavoriteHotelsView(APIView):
    def get(self, request):
        tourist_id = request.query_params.get("tourist_id")

        if not tourist_id:
            return Response(
                {"error": "tourist_id query parameter is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            tourist = Tourist.objects.get(id=tourist_id)
        except Tourist.DoesNotExist:
            return Response({"error": "Tourist not found."}, status=status.HTTP_404_NOT_FOUND)

        favorites = tourist.favorite_hotels.all()
        serializer = HotelSerializer(favorites, many=True)
        return Response({"favorites": serializer.data}, status=status.HTTP_200_OK)