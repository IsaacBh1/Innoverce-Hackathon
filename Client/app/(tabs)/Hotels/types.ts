// Types for the Hotels section

export interface HotelRating {
  score: number;
  count: number;
}

export interface HotelPrice {
  original?: number;
  current: number;
  currency?: string;
  loggedInPrice?: boolean;
}

export interface HotelImage {
  url: string;
  alt?: string;
}

export interface RoomType {
  name: string;
  description?: string;
  price: number;
  currency?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Hotel {
  id: string;
  name: string;
  images: HotelImage[];
  rating: HotelRating;
  address: string;
  contactNumber: string;
  stars: number; // 1-5 stars
  price: HotelPrice;
  isFavorite: boolean;
  specialOffer?: string;
  description?: string;
  roomTypes: RoomType[];
  coordinates: Coordinates;
}
