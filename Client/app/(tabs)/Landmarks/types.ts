export interface LandmarkImage {
  id: string;
  url: string;
  caption?: string;
}

export interface LandmarkRating {
  score: number;
  count: number;
}

export interface LandmarkLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
}

export interface Landmark {
  id: string;
  name: string;
  category: string;
  description: string;
  images: LandmarkImage[];
  location: LandmarkLocation;
  rating: LandmarkRating;
  openingHours: OpeningHour[];
  isFavorite: boolean;
}
