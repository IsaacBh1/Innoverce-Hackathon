import { Landmark } from "./types";

export const mockLandmarks: Landmark[] = [
  {
    id: "landmark-1",
    name: "Santa Cruz Fort",
    category: "Historical Site",
    description:
      "Santa Cruz Fort is a military fortress in Oran, Algeria. It was built between 1577 and 1604 by the Spaniards, during the Spanish presence in Oran. The fort sits on top of Mount Murdjadjo and overlooks the city and the Mediterranean Sea. It offers breathtaking panoramic views of Oran and is considered one of the most important historical monuments in the city. The fortress features impressive military architecture with walls, towers, and a chapel. Today, it's a popular tourist attraction and an iconic landmark of Oran.",
    images: [
      {
        id: "sc-1",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "sc-2",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "sc-3",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    location: {
      latitude: 35.7103,
      longitude: -0.6343,
      address: "Mount Murdjadjo, Oran",
    },
    rating: {
      score: 4.6,
      count: 322,
    },
    openingHours: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
      { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
    ],
    isFavorite: false,
  },
  {
    id: "landmark-2",
    name: "Bey Palace",
    category: "Museum",
    description:
      "Bey Palace, also known as the Palace of the Bey Mohamed El Kebir, is an 18th-century Ottoman palace in Oran, Algeria. Built between 1789 and 1791, it served as the residence of the Ottoman governor (Bey). The palace showcases beautiful Moorish architecture with intricate tile work, carved stucco, and ornate courtyards. Today, it functions as a museum displaying artifacts and art from Oran's rich history. The palace's design reflects the Ottoman influence in North Africa, featuring inner courtyards, reception rooms, and private quarters. It's located in the old part of Oran and is considered one of the city's most important cultural heritage sites.",
    images: [
      {
        id: "bp-1",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "bp-2",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "bp-3",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    location: {
      latitude: 35.6956,
      longitude: -0.6353,
      address: "Old City, Oran",
    },
    rating: {
      score: 4.3,
      count: 201,
    },
    openingHours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "9:00 AM - 4:30 PM" },
      { day: "Wednesday", hours: "9:00 AM - 4:30 PM" },
      { day: "Thursday", hours: "9:00 AM - 4:30 PM" },
      { day: "Friday", hours: "Closed" },
      { day: "Saturday", hours: "9:00 AM - 4:30 PM" },
      { day: "Sunday", hours: "9:00 AM - 4:30 PM" },
    ],
    isFavorite: true,
  },
  {
    id: "landmark-3",
    name: "Place du 1er Novembre",
    category: "Public Square",
    description:
      "Place du 1er Novembre is the main square in downtown Oran, Algeria. Named after Algeria's Independence War start date (November 1, 1954), it's the heart of the city's urban life. The square features the impressive Town Hall (Hôtel de Ville), built in Neo-Moorish style during the French colonial period. Surrounded by cafes, shops, and important buildings, it's a gathering place for locals and visitors alike. The square is adorned with palm trees and fountains, creating a pleasant atmosphere. It's particularly lively during evenings when families gather to enjoy the cooler temperatures. The square also serves as a venue for public events, celebrations, and sometimes demonstrations.",
    images: [
      {
        id: "pn-1",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "pn-2",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "pn-3",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    location: {
      latitude: 35.6977,
      longitude: -0.6409,
      address: "City Center, Oran",
    },
    rating: {
      score: 4.2,
      count: 389,
    },
    openingHours: [
      { day: "Monday", hours: "Open 24 hours" },
      { day: "Tuesday", hours: "Open 24 hours" },
      { day: "Wednesday", hours: "Open 24 hours" },
      { day: "Thursday", hours: "Open 24 hours" },
      { day: "Friday", hours: "Open 24 hours" },
      { day: "Saturday", hours: "Open 24 hours" },
      { day: "Sunday", hours: "Open 24 hours" },
    ],
    isFavorite: false,
  },
  {
    id: "landmark-4",
    name: "Oran Cathedral",
    category: "Religious Site",
    description:
      "Oran Cathedral, officially known as the Cathedral of Saint Louis, is a former Roman Catholic cathedral in Oran, Algeria. Built during the French colonial period in the 20th century, it features impressive Neo-Byzantine architecture. The building is characterized by its twin towers, large dome, and impressive façade. After Algeria's independence in 1962, it was converted into a public library named Abdelhamid Ben Badis Library. The interior, once filled with religious iconography, has been adapted to its new function while preserving much of the original architectural features. The cathedral's striking exterior remains a notable landmark in Oran's cityscape and represents an important piece of the city's architectural heritage and complex colonial history.",
    images: [
      {
        id: "oc-1",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "oc-2",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "oc-3",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    location: {
      latitude: 35.6988,
      longitude: -0.6386,
      address: "Larbi Ben M'hidi Boulevard, Oran",
    },
    rating: {
      score: 4.4,
      count: 178,
    },
    openingHours: [
      { day: "Monday", hours: "8:30 AM - 5:00 PM" },
      { day: "Tuesday", hours: "8:30 AM - 5:00 PM" },
      { day: "Wednesday", hours: "8:30 AM - 5:00 PM" },
      { day: "Thursday", hours: "8:30 AM - 5:00 PM" },
      { day: "Friday", hours: "Closed" },
      { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
      { day: "Sunday", hours: "9:00 AM - 4:00 PM" },
    ],
    isFavorite: false,
  },
  {
    id: "landmark-5",
    name: "Ahmed Zabana Museum",
    category: "Museum",
    description:
      "The Ahmed Zabana Museum, named after a hero of the Algerian independence movement, is one of the most important museums in Oran, Algeria. Founded during the French colonial period in 1930, it was originally called the Demaeght Museum. The museum houses a diverse collection spanning archaeology, fine arts, natural history, and ethnography. Visitors can explore prehistoric artifacts, Roman antiquities, Islamic art, and exhibitions on local customs and traditions. The natural history section contains geological samples and specimens of local fauna. Located in the city center, the museum building itself is an impressive example of colonial architecture. It serves as an important educational resource and cultural institution for both locals and tourists interested in understanding the rich history and natural heritage of western Algeria.",
    images: [
      {
        id: "az-1",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "az-2",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "az-3",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    location: {
      latitude: 35.6989,
      longitude: -0.6419,
      address: "Boulevard Zabana, Oran",
    },
    rating: {
      score: 4.5,
      count: 156,
    },
    openingHours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 12:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
      { day: "Sunday", hours: "9:00 AM - 5:00 PM" },
    ],
    isFavorite: true,
  },
  {
    id: "landmark-6",
    name: "Ain El Turk Beach",
    category: "Nature",
    description:
      "Ain El Turk Beach is one of the most popular beaches near Oran, Algeria. Located about 15 kilometers west of the city center, it stretches for several kilometers along the Mediterranean coast. With its fine golden sand and clear blue waters, it attracts both locals and tourists looking to escape the city heat. The beach is lined with cafes, restaurants, and small shops, making it convenient for day-long visits. During summer months, it becomes particularly busy, especially on weekends when Oran residents flock to enjoy swimming and sunbathing. The area has seen development of vacation homes and small hotels to accommodate visitors. The relatively calm waters make it suitable for families, and the stunning sunsets over the Mediterranean provide a perfect end to a beach day.",
    images: [
      {
        id: "ab-1",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "ab-2",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "ab-3",
        url: "https://plus.unsplash.com/premium_photo-1721268770804-f9db0ce102f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    location: {
      latitude: 35.7442,
      longitude: -0.7683,
      address: "Ain El Turk, Oran",
    },
    rating: {
      score: 4.7,
      count: 512,
    },
    openingHours: [
      { day: "Monday", hours: "Open 24 hours" },
      { day: "Tuesday", hours: "Open 24 hours" },
      { day: "Wednesday", hours: "Open 24 hours" },
      { day: "Thursday", hours: "Open 24 hours" },
      { day: "Friday", hours: "Open 24 hours" },
      { day: "Saturday", hours: "Open 24 hours" },
      { day: "Sunday", hours: "Open 24 hours" },
    ],
    isFavorite: false,
  },
];
