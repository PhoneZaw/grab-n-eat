export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  popular?: boolean;
};

export type MenuSection = {
  name: string;
  items: MenuItem[];
};

export type Restaurant = {
  slug: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  rating: number;
  reviews: number;
  miles: number;
  readyMin: number;
  price: "$" | "$$" | "$$$";
  open: boolean;
  blurb: string;
  image: string;
  portrait: string;
  hours: string;
  slots: string[];
  menu: MenuSection[];
};

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const restaurants: Restaurant[] = [
  {
    slug: "hearth-and-rye",
    name: "Hearth & Rye",
    cuisine: "Seasonal",
    neighborhood: "South Congress",
    rating: 4.9,
    reviews: 312,
    miles: 0.4,
    readyMin: 12,
    price: "$$",
    open: true,
    blurb: "Wood-fired grain bowls and a short lunch menu that changes with the market.",
    image: img("photo-1546069901-ba9599a7e63c"),
    portrait: img("photo-1517248135467-4c7edcad34c4", 900),
    hours: "Open today · 11:00–9:00",
    slots: ["11:45", "12:00", "12:15", "12:30", "12:45", "1:00"],
    menu: [
      {
        name: "To start",
        items: [
          {
            id: "rye-bread",
            name: "Warm rye & butter",
            description: "Cultured butter, flaky salt, herbs from the windowsill.",
            price: 6,
          },
          {
            id: "market-greens",
            name: "Market greens",
            description: "Citrus, toasted seeds, pecorino, a sharp vinaigrette.",
            price: 11,
            popular: true,
          },
        ],
      },
      {
        name: "Plates",
        items: [
          {
            id: "hearth-bowl",
            name: "Hearth bowl",
            description: "Farro, roasted squash, chili oil, soft egg, herbs.",
            price: 16,
            popular: true,
          },
          {
            id: "chicken-rye",
            name: "Brick chicken",
            description: "Half bird, rye pan sauce, charred lemon, potatoes.",
            price: 22,
          },
          {
            id: "mushroom-toast",
            name: "Mushroom toast",
            description: "Sourdough, brown butter, thyme, a spoon of ricotta.",
            price: 15,
          },
        ],
      },
      {
        name: "Something sweet",
        items: [
          {
            id: "olive-oil-cake",
            name: "Olive oil cake",
            description: "Citrus zest, crème fraîche, a little honey.",
            price: 8,
          },
        ],
      },
    ],
  },
  {
    slug: "loma-tacos",
    name: "Loma",
    cuisine: "Mexican",
    neighborhood: "East Cesar Chavez",
    rating: 4.8,
    reviews: 540,
    miles: 0.8,
    readyMin: 9,
    price: "$",
    open: true,
    blurb: "Nixtamal tortillas, a tight taco list, and aguas frescas by the cup.",
    image: img("photo-1565299585323-38d6b0865b47"),
    portrait: img("photo-1552566626-52f8b828add9", 900),
    hours: "Open today · 10:30–8:30",
    slots: ["11:30", "11:45", "12:00", "12:15", "12:30"],
    menu: [
      {
        name: "Tacos",
        items: [
          {
            id: "al-pastor",
            name: "Al pastor",
            description: "Pineapple, onion, salsa roja, a warm tortilla.",
            price: 5,
            popular: true,
          },
          {
            id: "mushroom-taco",
            name: "Mushroom & salsa verde",
            description: "Roasted oyster mushrooms, crema, cilantro.",
            price: 5,
          },
          {
            id: "fish-taco",
            name: "Crispy fish",
            description: "Cabbage, lime crema, pickled onion.",
            price: 6,
          },
        ],
      },
      {
        name: "Sides",
        items: [
          {
            id: "elote",
            name: "Elote cup",
            description: "Chili, cotija, lime.",
            price: 5,
          },
          {
            id: "horchata",
            name: "Horchata",
            description: "Rice, cinnamon, not too sweet.",
            price: 4,
          },
        ],
      },
    ],
  },
  {
    slug: "nori-bar",
    name: "Nori Bar",
    cuisine: "Japanese",
    neighborhood: "Downtown",
    rating: 4.7,
    reviews: 198,
    miles: 1.2,
    readyMin: 18,
    price: "$$$",
    open: true,
    blurb: "A lunch counter for nigiri, hand rolls, and a precise miso.",
    image: img("photo-1579871494447-9811cf80d66c"),
    portrait: img("photo-1553621042-f6e147245754", 900),
    hours: "Open today · 11:30–2:30, 5:00–10:00",
    slots: ["11:45", "12:10", "12:30", "12:50", "1:10"],
    menu: [
      {
        name: "Counter",
        items: [
          {
            id: "salmon-set",
            name: "Salmon set",
            description: "Six pieces, warm rice, pickled ginger.",
            price: 24,
            popular: true,
          },
          {
            id: "hand-roll",
            name: "Spicy tuna hand roll",
            description: "Crisp nori, scallion, a little sesame.",
            price: 9,
          },
          {
            id: "miso",
            name: "Miso",
            description: "Dashi, silken tofu, wakame.",
            price: 5,
          },
        ],
      },
    ],
  },
  {
    slug: "sunday-pasta",
    name: "Sunday Pasta",
    cuisine: "Italian",
    neighborhood: "Clarksville",
    rating: 4.6,
    reviews: 421,
    miles: 1.5,
    readyMin: 16,
    price: "$$",
    open: true,
    blurb: "Three pastas a day, pulled from a short list written that morning.",
    image: img("photo-1621996346565-e3dbc646d9a9"),
    portrait: img("photo-1414235077428-338989a2e8c0", 900),
    hours: "Open today · 11:00–9:30",
    slots: ["12:00", "12:20", "12:40", "1:00"],
    menu: [
      {
        name: "Pasta",
        items: [
          {
            id: "cacio",
            name: "Cacio e pepe",
            description: "Tonnarelli, pecorino, lots of pepper.",
            price: 18,
            popular: true,
          },
          {
            id: "pomodoro",
            name: "Pomodoro",
            description: "Slow tomatoes, basil, olive oil.",
            price: 17,
          },
          {
            id: "lasagna-cup",
            name: "Lasagna cup",
            description: "A single portion, still bubbling.",
            price: 14,
          },
        ],
      },
    ],
  },
  {
    slug: "kiln-burger",
    name: "Kiln",
    cuisine: "Burgers",
    neighborhood: "Mueller",
    rating: 4.5,
    reviews: 880,
    miles: 2.1,
    readyMin: 14,
    price: "$$",
    open: false,
    blurb: "A smash burger, a potato bun, and fries that actually stay crisp.",
    image: img("photo-1568901346375-23c9450c58cd"),
    portrait: img("photo-1550547660-d9450f859349", 900),
    hours: "Opens at 4:00 · dinner only today",
    slots: ["5:00", "5:20", "5:40", "6:00", "6:20"],
    menu: [
      {
        name: "Burgers",
        items: [
          {
            id: "kiln-burger",
            name: "Kiln burger",
            description: "Two patties, American, pickles, kiln sauce.",
            price: 14,
            popular: true,
          },
          {
            id: "fries",
            name: "Shoestring fries",
            description: "Salt, a side of kiln sauce.",
            price: 5,
          },
        ],
      },
    ],
  },
  {
    slug: "paper-plane-coffee",
    name: "Paper Plane",
    cuisine: "Cafe",
    neighborhood: "Hyde Park",
    rating: 4.8,
    reviews: 256,
    miles: 2.6,
    readyMin: 7,
    price: "$",
    open: true,
    blurb: "Pastries at 8, savory tartines by 11, and coffee that tastes like coffee.",
    image: img("photo-1495474472287-4d71bcdd2085"),
    portrait: img("photo-1501339847302-ac426a4a7cbb", 900),
    hours: "Open today · 7:30–3:00",
    slots: ["11:15", "11:30", "11:45", "12:00", "12:15"],
    menu: [
      {
        name: "Counter",
        items: [
          {
            id: "tartine",
            name: "Tomato tartine",
            description: "Ricotta, olive oil, cracked pepper, thick toast.",
            price: 12,
            popular: true,
          },
          {
            id: "oat-latte",
            name: "Oat latte",
            description: "Double shot, steamed oat, no syrup.",
            price: 5,
          },
          {
            id: "morning-bun",
            name: "Morning bun",
            description: "Orange sugar, still warm if you are early.",
            price: 4,
          },
        ],
      },
    ],
  },
];

export const cuisines = [
  "All",
  ...Array.from(new Set(restaurants.map((r) => r.cuisine))),
];

export function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export function findRestaurant(slug: string | null | undefined) {
  return restaurants.find((r) => r.slug === slug) ?? restaurants[0];
}

export const prototypeScreens = [
  {
    href: "/prototype/home",
    kicker: "01",
    title: "Landing",
    note: "A quiet homepage. The pickup window is the first decision, not a buried filter.",
  },
  {
    href: "/prototype/restaurants",
    kicker: "02",
    title: "Restaurant list",
    note: "Photography, a short walk, and the next few ready times on every card.",
  },
  {
    href: "/prototype/restaurant",
    kicker: "03",
    title: "Menu",
    note: "A single kitchen, a sticky pickup time, and a cart that stays in view.",
  },
  {
    href: "/prototype/checkout",
    kicker: "04",
    title: "Checkout",
    note: "Name, window, payment. One page, no delivery address to invent.",
  },
  {
    href: "/prototype/tracking",
    kicker: "05",
    title: "Pickup",
    note: "A large code and a plain status, the way a counter actually works.",
  },
  {
    href: "/prototype/orders",
    kicker: "06",
    title: "Orders",
    note: "Past pickups, with a way back to the same plate.",
  },
  {
    href: "/prototype/account",
    kicker: "07",
    title: "Sign in",
    note: "A split panel for returning guests and new ones. No dashboard chrome.",
  },
];
