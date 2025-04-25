from django.urls import path
from .views import HotelListView, HotelDetailView , CreateHotelView,AddFavoriteHotelView,GetFavoriteHotelsView
urlpatterns = [
    path('hotals', HotelListView.as_view(), name='hotel_list'),
    path('hotal/<int:hotel_id>', HotelDetailView.as_view(), name='hotel_detail'),
    path('create-hotal', CreateHotelView.as_view(), name='create-hoal'),
    path('addhotelfavorite', AddFavoriteHotelView.as_view(), name='add-favorite-hotel'),
    path('favorites/hotels/', GetFavoriteHotelsView.as_view(), name='get_favorite_hotels'),
    
]