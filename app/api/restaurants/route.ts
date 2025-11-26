import {
  createRestaurant,
  RestaurantCreateRequest,
} from "@/services/restaurant/restaurantCreate";
import db from "../../../lib/db";
import { deleteRestaurant } from "@/services/restaurant/restaurantDelete";
import { updateRestaurant } from "@/services/restaurant/restaurantUpdate";

export type GetRestaurantResponse = {
  id: string;
  name: string;
};

export async function GET(request: Request) {
  const data = await db.restaurant.findMany();

  console.log(data);

  return Response.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  const data: RestaurantCreateRequest = {
    name: body.name,
    email: body.email,
  };

  await createRestaurant(data);

  return new Response("Created");
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await deleteRestaurant(body.id);

  return new Response("Restaurant Deleted");
}

export async function PUT(request: Request) {
  const body = await request.json();

  await updateRestaurant(body);

  return new Response("Updated");
}
