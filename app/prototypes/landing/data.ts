export type Kitchen = {
  name: string;
  cuisine: string;
  area: string;
  miles: number;
  ready: number;
  rating: number;
  price: string;
  blurb: string;
  plate: string;
  slots: string[];
  image: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const kitchens: Kitchen[] = [
  {
    name: "Hearth & Rye",
    cuisine: "Seasonal",
    area: "South Congress",
    miles: 0.4,
    ready: 12,
    rating: 4.9,
    price: "$$",
    blurb: "Wood-fired grain bowls and a short lunch menu that changes with the market.",
    plate: "Hearth bowl · $16",
    slots: ["11:45", "12:00", "12:15", "12:30", "12:45", "1:00"],
    image: img("photo-1546069901-ba9599a7e63c"),
  },
  {
    name: "Loma",
    cuisine: "Mexican",
    area: "East Cesar Chavez",
    miles: 0.8,
    ready: 9,
    rating: 4.8,
    price: "$",
    blurb: "Nixtamal tortillas, a tight taco list, and aguas frescas by the cup.",
    plate: "Al pastor · $5",
    slots: ["11:30", "11:45", "12:00", "12:15", "12:30"],
    image: img("photo-1565299585323-38d6b0865b47"),
  },
  {
    name: "Nori Bar",
    cuisine: "Japanese",
    area: "Downtown",
    miles: 1.2,
    ready: 18,
    rating: 4.7,
    price: "$$$",
    blurb: "A lunch counter for nigiri, hand rolls, and a precise miso.",
    plate: "Salmon set · $24",
    slots: ["11:45", "12:10", "12:30", "12:50", "1:10"],
    image: img("photo-1579871494447-9811cf80d66c"),
  },
  {
    name: "Sunday Pasta",
    cuisine: "Italian",
    area: "Clarksville",
    miles: 1.5,
    ready: 16,
    rating: 4.6,
    price: "$$",
    blurb: "Three pastas a day, pulled from a short list written that morning.",
    plate: "Cacio e pepe · $18",
    slots: ["12:00", "12:20", "12:40", "1:00"],
    image: img("photo-1621996346565-e3dbc646d9a9"),
  },
  {
    name: "Paper Plane",
    cuisine: "Cafe",
    area: "Hyde Park",
    miles: 2.6,
    ready: 7,
    rating: 4.8,
    price: "$",
    blurb: "Pastries at 8, savory tartines by 11, and coffee that tastes like coffee.",
    plate: "Tomato tartine · $12",
    slots: ["11:15", "11:30", "11:45", "12:00", "12:15"],
    image: img("photo-1495474472287-4d71bcdd2085"),
  },
];

export const windows = ["11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "1:00"];
