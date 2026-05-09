import db from "@/lib/db";
import { createOwner } from "../staff/staffCreate";
import { restaurantCreateSchema, RestaurantCreateInput } from "@/lib/validation/restaurant";

export type RestaurantCreateRequest = RestaurantCreateInput;

export type RestaurantCreateResponse = {
  id: string;
};

export async function createRestaurant(
  data: RestaurantCreateRequest
): Promise<RestaurantCreateResponse> {
  const validation = restaurantCreateSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(`Validation failed: ${validation.error.message}`);
  }

  const owner = await createOwner({
    name: data.name,
    email: data.email,
    password: process.env.DEFAULT_PASSWORD ?? "P@ssword1!!",
  });

  return await db.restaurant.create({
    data: {
      name: data.name,
      ownerId: owner.id,
      status: "ACTIVE",
    },
  });
}
