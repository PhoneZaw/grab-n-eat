import db from "../../lib/db";

export type RestaurantListResponse = {
  id: string;
  name: string;
  imageUrl: string | null;
  email: string;
  status: string;
  categories: string[];
};

export async function getRestaurantList(): Promise<RestaurantListResponse[]> {
  var restaurants = await db.restaurant.findMany({
    include: {
      owner: true,
      Menu: {
        include: {
          MenuCategory: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return restaurants.map((c) => {
    return {
      id: c.id,
      name: c.name,
      imageUrl: c.imageUrl,
      email: c.owner.email,
      status: c.status.toString(),
      categories: c.Menu.map((m) =>
        m.MenuCategory.map((mc) => mc.category.name)
      )
        .flat()
        .filter((value, index, array) => array.indexOf(value) === index)
        .slice(0, 3),
    };
  });
} 

export async function getRestaurantById(id: string): Promise<RestaurantListResponse | null> {
  var restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
    include: {
      owner: true,
      Menu: {
        include: {
          MenuCategory: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  if(!restaurant) {
    return null;
  }

  return {
    id: restaurant.id,
    name: restaurant.name,
    imageUrl: restaurant.imageUrl,
    email: restaurant.owner.email,
    status: restaurant.status,
    categories: restaurant.Menu.map((m) =>
      m.MenuCategory.map((mc) => mc.category.name)
    )
      .flat()
      .filter((value, index, array) => array.indexOf(value) === index)
      .slice(0, 3),
  };
}