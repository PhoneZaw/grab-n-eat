import db from "@/lib/db";

export type RestaurantUpdateRequest = {
  id: string;
  name: string;
};

export async function updateRestaurant(
  data: RestaurantUpdateRequest
): Promise<void> {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: data.id,
    },
  });

  console.log("to create restaurant", restaurant);

  if (!restaurant) {
    throw new Error(`Restaurant with id ${data.id} not found.`);
  }

  await db.restaurant.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
    },
  });
}
