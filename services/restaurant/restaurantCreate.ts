import db from "@/lib/db";
import { create } from "domain";
import { createOwner } from "../staff/staffCreate";
import { env } from "process";

export type RestaurantCreateRequest = {
  name: string;
  email: string;
};

export type RestaurantCreateResponse = {
  id: string;
};

export async function createRestaurant(
  data: RestaurantCreateRequest
): Promise<RestaurantCreateResponse> {
  console.log(data);

  var owner = await createOwner({
    name: data.name,
    email: data.email,
    password: env.DEFAULT_PASSWORD ?? "P@ssword1!!",
  });

  return await db.restaurant.create({
    data: {
      name: data.name,
      ownerId: owner.id,
      status: "ACTIVE",
    },
  });
}
