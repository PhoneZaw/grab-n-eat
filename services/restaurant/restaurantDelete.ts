import db from "@/lib/db";

export async function deleteRestaurant(id: string): Promise<void> {
  var restaurant = await db.restaurant.findFirst({
    where: {
      id: id,
    },
    include: {
      owner: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  await db.restaurant.delete({
    where: {
      id: id,
    },
  });

  await db.user.delete({
    where: {
      id: restaurant.owner.id,
    },
  });
}
