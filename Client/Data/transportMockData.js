// Mock transportation data for the location map
// Base coordinates: 35.74878, -0.53642

export const transportationMockData = [
  // Taxis
  {
    id: "taxi1",
    type: "taxi",
    latitude: 35.74878 + 0.002,
    longitude: -0.53642 - 0.0035,
    title: "Taxi #432",
    description: "Available for hire",
    eta: "2 min",
  },
  {
    id: "taxi2",
    type: "taxi",
    latitude: 35.74878 - 0.001,
    longitude: -0.53642 + 0.0015,
    title: "Taxi #591",
    description: "Available for hire",
    eta: "3 min",
  },
  {
    id: "taxi3",
    type: "taxi",
    latitude: 35.74878 + 0.0035,
    longitude: -0.53642 + 0.002,
    title: "Taxi #107",
    description: "Available for hire",
    eta: "5 min",
  },
  {
    id: "taxi4",
    type: "taxi",
    latitude: 35.74878 - 0.002,
    longitude: -0.53642 - 0.001,
    title: "Taxi #286",
    description: "Available for hire",
    eta: "4 min",
  },

  // Buses
  {
    id: "bus1",
    type: "bus",
    latitude: 35.74878 + 0.004,
    longitude: -0.53642 - 0.001,
    title: "Bus #12",
    description: "Route: City Center - University",
    eta: "7 min",
  },
  {
    id: "bus2",
    type: "bus",
    latitude: 35.74878 - 0.003,
    longitude: -0.53642 + 0.003,
    title: "Bus #45",
    description: "Route: Main Station - Beach",
    eta: "10 min",
  },
  {
    id: "bus3",
    type: "bus",
    latitude: 35.74878 - 0.0015,
    longitude: -0.53642 - 0.0025,
    title: "Bus #8",
    description: "Route: Market - Park",
    eta: "5 min",
  },

  // Tramways
  {
    id: "tram1",
    type: "tram",
    latitude: 35.74878 + 0.001,
    longitude: -0.53642 + 0.004,
    title: "Tram #3",
    description: "Route: North - South Line",
    eta: "8 min",
  },
  {
    id: "tram2",
    type: "tram",
    latitude: 35.74878 - 0.0025,
    longitude: -0.53642 - 0.002,
    title: "Tram #1",
    description: "Route: East - West Line",
    eta: "3 min",
  },
  {
    id: "tram3",
    type: "tram",
    latitude: 35.74878 + 0.0025,
    longitude: -0.53642 - 0.0035,
    title: "Tram #5",
    description: "Route: City Loop",
    eta: "6 min",
  },
];
