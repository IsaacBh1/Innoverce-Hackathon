import { Hotel } from "./types";

export const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Sheraton Oran Hotel & Towers",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "Sheraton Oran Hotel",
      },
      {
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "Sheraton Oran Hotel Room",
      },
      {
        url: "https://images.unsplash.com/photo-1560200353-ce0a76b1d438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
        alt: "Sheraton Oran Hotel Pool",
      },
    ],
    rating: {
      score: 4.5,
      count: 1224,
    },
    address: "Route Des Falaises, Oran 31000, Algeria",
    contactNumber: "+213 41 59 01 00",
    stars: 5,
    price: {
      original: 25000,
      current: 22000,
      currency: "DZD",
    },
    roomTypes: [
      { name: "Standard Room", price: 22000, currency: "DZD" },
      { name: "Deluxe Room", price: 28000, currency: "DZD" },
      { name: "Executive Suite", price: 35000, currency: "DZD" },
    ],
    isFavorite: false,
    coordinates: {
      latitude: 35.7003,
      longitude: -0.6349,
    },
    description:
      "Luxury hotel with stunning views of the Mediterranean Sea, featuring multiple restaurants, a spa, and conference facilities.",
  },
  {
    id: "2",
    name: "Royal Hotel Oran MGallery",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "Royal Hotel Oran MGallery",
      },
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "Royal Hotel Oran Room",
      },
    ],
    rating: {
      score: 4.2,
      count: 876,
    },
    address: "Blvd de la Soummam, Oran 31000, Algeria",
    contactNumber: "+213 41 59 02 00",
    stars: 4,
    price: {
      original: 18000,
      current: 15000,
      currency: "DZD",
    },
    roomTypes: [
      { name: "Standard Room", price: 15000, currency: "DZD" },
      { name: "Superior Room", price: 18000, currency: "DZD" },
    ],
    isFavorite: true,
    coordinates: {
      latitude: 35.6988,
      longitude: -0.6412,
    },
    description:
      "Historic hotel in the heart of Oran, featuring classic architecture and modern amenities.",
  },
  {
    id: "3",
    name: "Ibis Oran Les Falaises",
    images: [
      {
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "Ibis Oran Les Falaises",
      },
    ],
    rating: {
      score: 3.8,
      count: 654,
    },
    address: "Route des Falaises, Oran 31000, Algeria",
    contactNumber: "+213 41 59 15 00",
    stars: 3,
    price: {
      current: 10000,
      currency: "DZD",
    },
    roomTypes: [
      { name: "Standard Room", price: 10000, currency: "DZD" },
      { name: "Twin Room", price: 12000, currency: "DZD" },
    ],
    isFavorite: false,
    coordinates: {
      latitude: 35.7065,
      longitude: -0.6328,
    },
    description:
      "Modern budget hotel located near the Corniche, offering comfortable accommodations at affordable rates.",
  },
  {
    id: "4",
    name: "Eden Phoenix Hotel",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "Eden Phoenix Hotel",
      },
    ],
    rating: {
      score: 4.0,
      count: 423,
    },
    address: "Boulevard Millénium, Oran 31000, Algeria",
    contactNumber: "+213 41 83 66 66",
    stars: 4,
    price: {
      original: 16000,
      current: 14500,
      currency: "DZD",
    },
    roomTypes: [
      { name: "Standard Room", price: 14500, currency: "DZD" },
      { name: "Deluxe Room", price: 18000, currency: "DZD" },
      { name: "Junior Suite", price: 25000, currency: "DZD" },
    ],
    isFavorite: false,
    coordinates: {
      latitude: 35.6929,
      longitude: -0.6426,
    },
    description:
      "Contemporary hotel with excellent dining options and a central location for exploring Oran.",
  },
  {
    id: "5",
    name: "Le Meridien Oran",
    images: [
      {
        url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
        alt: "Le Meridien Oran",
      },
    ],
    rating: {
      score: 4.7,
      count: 1102,
    },
    address: "Chemin de Wilaya, Oran 31000, Algeria",
    contactNumber: "+213 41 98 40 00",
    stars: 5,
    price: {
      original: 30000,
      current: 27500,
      currency: "DZD",
    },
    roomTypes: [
      { name: "Classic Room", price: 27500, currency: "DZD" },
      { name: "Premium Room", price: 35000, currency: "DZD" },
      { name: "Executive Suite", price: 45000, currency: "DZD" },
    ],
    isFavorite: false,
    coordinates: {
      latitude: 35.7147,
      longitude: -0.5784,
    },
    description:
      "Luxury beachfront resort with panoramic views, multiple pools, and extensive conference facilities.",
  },
];
