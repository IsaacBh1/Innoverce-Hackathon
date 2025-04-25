from django.urls import path
from .views import RestoListView, RestoDetailView , CreateRestoView , ToggleFavoriteRestoView ,FavoriteRestoListView ,FilteredRestoListView

urlpatterns = [
    path('restos/', RestoListView.as_view(), name='resto-list'),
    path('restos/<int:resto_id>/', RestoDetailView.as_view(), name='resto-detail'),
    path('restos/create/', CreateRestoView.as_view(), name='create-resto'),
    path('restos/favorite/', ToggleFavoriteRestoView.as_view(), name='toggle-favorite-resto'),
    path('restos/favorites/<int:tourist_id>/', FavoriteRestoListView.as_view(), name='favorite-restos'),
    path('restos/filter/', FilteredRestoListView.as_view(), name='filtered-restos'),
]