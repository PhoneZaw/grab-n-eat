export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  section: string;
  popular?: boolean;
  image: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const kitchen = {
  name: "Hearth & Rye",
  area: "South Congress",
  miles: 0.4,
  ready: 12,
  rating: 4.9,
  slots: ["11:45", "12:00", "12:15", "12:30", "12:45", "1:00"],
};

export const dishes: Dish[] = [
  {
    id: "rye",
    name: "Warm rye & butter",
    description: "Cultured butter, flaky salt, herbs from the windowsill.",
    price: 6,
    section: "To start",
    image: img("photo-1509440159596-0249088772ff"),
  },
  {
    id: "greens",
    name: "Market greens",
    description: "Citrus, toasted seeds, pecorino, a sharp vinaigrette.",
    price: 11,
    section: "To start",
    popular: true,
    image: img("photo-1512621776951-a57141f2eefd"),
  },
  {
    id: "bowl",
    name: "Hearth bowl",
    description: "Farro, roasted squash, chili oil, soft egg, herbs.",
    price: 16,
    section: "Plates",
    popular: true,
    image: img("photo-1546069901-ba9599a7e63c"),
  },
  {
    id: "chicken",
    name: "Brick chicken",
    description: "Half bird, rye pan sauce, charred lemon, potatoes.",
    price: 22,
    section: "Plates",
    image: img("photo-1598103442097-8b74394b95c6"),
  },
  {
    id: "toast",
    name: "Mushroom toast",
    description: "Sourdough, brown butter, thyme, a spoon of ricotta.",
    price: 15,
    section: "Plates",
    image: img("photo-1482049016688-2d3e1b311543"),
  },
  {
    id: "cake",
    name: "Olive oil cake",
    description: "Citrus zest, crème fraîche, a little honey.",
    price: 8,
    section: "Something sweet",
    image: img("photo-1565958011703-44f9829ba187"),
  },
];

export const sections = ["To start", "Plates", "Something sweet"];

export function money(n: number) {
  return `$${n.toFixed(2)}`;
}
