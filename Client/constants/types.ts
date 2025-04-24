export type Restaurant = {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    deliveryTime: string;
    image: any; // ImageSourcePropType
    description?: string;
    popularDishes?: string[];
    priceRange?: '$' | '$$' | '$$$' | '$$$$';

  };
  
  export type RootStackParamList = {
    Restaurants: undefined;
    RestaurantDetails: { restaurant: Restaurant };
  };

export const restaurants = [
  {
    id: '1',
    name: 'Pasta Paradise',
    cuisine: 'Italian',
    rating: 4.7,
    deliveryTime: '',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb', // Pasta image
    dishes: [
      { name: 'Truffle Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601' },
      { name: 'Margherita Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38' }
    ],
    priceRange: '$$$',
    description: 'Authentic Italian recipes passed down through generations',
    promotion: 'Free garlic bread with orders over $30'
  },
  {
    id: '2',
    name: 'Sushi Master',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252', // Sushi image
    dishes: [
      { name: 'Dragon Roll', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c' },
      { name: 'Sashimi Platter', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754' }
    ],
    priceRange: '$$$$',
    description: 'Fresh fish flown in daily from Tsukiji Market',
    promotion: '20% off lunch specials'
  },
  // Add 4 more restaurants with similar structure
  {
    id: '3',
    name: 'Burger Barn',
    cuisine: 'American',
    rating: 4.3,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    dishes: [
      { name: 'BBQ Bacon Burger', image: 'https://images.unsplash.com/photo-1561758033-7e924f619b47' },
      { name: 'Truffle Fries', image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5' }
    ],
    priceRange: '$$',
    description: 'Gourmet burgers with locally-sourced beef',
    promotion: 'Free fries on Fridays'
  },
  {
    id: '4',
    name: 'Thai Spice',
    cuisine: 'Thai',
    rating: 4.6,
    deliveryTime: '30-40 min',
    image: 'https://images.unsplash.com/photo-1530333191215-1627f8f27a6e',
    dishes: [
      { name: 'Pad Thai', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655' },
      { name: 'Green Curry', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' }
    ],
    priceRange: '$$',
    description: 'Authentic Thai flavors with perfect spice balance',
    promotion: 'Lunch combo $12.99'
  },
  {
    id: '5',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.5,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    dishes: [
      { name: 'Carne Asada Tacos', image: 'https://images.unsplash.com/photo-1615870216519-2f9fa5753765' },
      { name: 'Churros', image: 'https://images.unsplash.com/photo-1581018494196-809d6d49a9d2' }
    ],
    priceRange: '$',
    description: 'Street-style Mexican tacos with homemade tortillas',
    promotion: 'Taco Tuesday - $2 tacos'
  },
  {
    id: '6',
    name: 'Steakhouse Royale',
    cuisine: 'American',
    rating: 4.8,
    deliveryTime: '40-50 min',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    dishes: [
      { name: 'Ribeye Steak', image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697' },
      { name: 'Lobster Tail', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2' }
    ],
    priceRange: '$$$$',
    description: 'Premium dry-aged steaks cooked to perfection',
    promotion: 'Free dessert for anniversary celebrations'
  }
];