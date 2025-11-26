import { getRestaurantList } from "@/services/restaurant/restaurantList";
import { Metadata } from "next";
import RestaurantList from "./restaurantList";
import { getAuth } from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Restaurants page",
};

export default async function Restaurant() {
  const session = await getAuth(["ADMIN"], "/dashboard/customer");

  const data = await getRestaurantList();

  return <RestaurantList restaurants={data}></RestaurantList>;
}
