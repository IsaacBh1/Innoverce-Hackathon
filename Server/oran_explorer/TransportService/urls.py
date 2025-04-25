from django.urls import path
from .views import NearbyVehiclesView, UpdateVehicleLocationView,CreateTaxiView,CreateTaxiDriverView,TouristGuideCreateView,CreateTouristView,TouristGuideListView,TaxiDetailView, TouristGuideDetailView,FavoriteTouristGuideView , TouristFavoritesView

urlpatterns = [
    path("vehicles/nearby/", NearbyVehiclesView.as_view(), name="nearby-vehicles"),
    path("vehicles/update-location/", UpdateVehicleLocationView.as_view(), name="update-vehicle-location"),
    path('tourist_guides/', TouristGuideListView.as_view(), name='tourist_guides_list'),
    path('tourist_guide/<int:guide_id>/', TouristGuideDetailView.as_view(), name='tourist_guide_detail'),
    path('favorites/add/', FavoriteTouristGuideView.as_view(), name='add_favorite'),
    path('favorites/<int:tourist_id>/', TouristFavoritesView.as_view(), name='list_favorites'),
    path('taxi/<int:taxi_id>/', TaxiDetailView.as_view(), name='taxi_detail'),
    path('createTourist/', CreateTouristView.as_view(), name='create-tourist'),
    path('guides/create/', TouristGuideCreateView.as_view(), name='create-tourist-guide'),
    path('taxis/create/', CreateTaxiView.as_view(), name='create_taxi'),
    path('taxi-drivers/create/', CreateTaxiDriverView.as_view(), name='create_taxi_driver'),
]
