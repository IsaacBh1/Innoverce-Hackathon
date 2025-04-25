from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Resto , Dish
from .serializers import RestoSerializer
from TransportService.models import Tourist

class RestoListView(APIView):
    def get(self, request):
        restos = Resto.objects.all()
        serializer = RestoSerializer(restos, many=True)
        return Response(serializer.data)

class RestoDetailView(APIView):
    def get(self, request, resto_id):
        try:
            resto = Resto.objects.get(id=resto_id)
        except Resto.DoesNotExist:
            return Response({"error": "Restaurant not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = RestoSerializer(resto)
        return Response(serializer.data)



class CreateRestoView(APIView):
    def post(self, request):
        data = request.data
        dishes_data = data.pop('dishes', [])

        resto = Resto.objects.create(**data)

        for dish_data in dishes_data:
            Dish.objects.create(resto=resto, **dish_data)

        serializer = RestoSerializer(resto)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ToggleFavoriteRestoView(APIView):
    def post(self, request):
        tourist_id = request.data.get('tourist_id')
        resto_id = request.data.get('resto_id')

        if not (tourist_id and resto_id):
            return Response({"error": "Both tourist_id and resto_id are required."}, status=400)

        try:
            tourist = Tourist.objects.get(id=tourist_id)
            resto = Resto.objects.get(id=resto_id)
        except Tourist.DoesNotExist:
            return Response({"error": "Tourist not found."}, status=404)
        except Resto.DoesNotExist:
            return Response({"error": "Resto not found."}, status=404)

        if resto in tourist.favorite_restos.all():
            tourist.favorite_restos.remove(resto)
            message = f"Resto '{resto.name}' removed from favorites."
        else:
            tourist.favorite_restos.add(resto)
            message = f"Resto '{resto.name}' added to favorites."

        return Response({"message": message}, status=200)
    



class FavoriteRestoListView(APIView):
    def get(self, request, tourist_id):
        try:
            tourist = Tourist.objects.get(id=tourist_id)
        except Tourist.DoesNotExist:
            return Response({"error": "Tourist not found."}, status=status.HTTP_404_NOT_FOUND)

        favorites = tourist.favorite_restos.all()
        serializer = RestoSerializer(favorites, many=True)
        return Response(serializer.data, status=200)
    




class FilteredRestoListView(APIView):
    def get(self, request):
        price_range = request.query_params.get('price_range', None)
        min_rating = request.query_params.get('min_rating', None)
        search = request.query_params.get('search', None)
        restos = Resto.objects.all()
        if price_range:
            restos = restos.filter(priceRange=price_range)
        if min_rating:
            try:
                min_rating = float(min_rating)
            except ValueError:
                return Response({"error": "Invalid rating value."}, status=status.HTTP_400_BAD_REQUEST)
            restos = restos.filter(rating__gt=min_rating) 
        if search:
            restos = restos.filter(
                name__icontains=search
            ) | restos.filter(
                cuisine__icontains=search
            ) | restos.filter(
                description__icontains=search
            )
        serializer = RestoSerializer(restos, many=True)
        return Response(serializer.data, status=200)

