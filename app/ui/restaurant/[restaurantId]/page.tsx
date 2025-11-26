import { getBranchDetailByBranchId } from "@/services/branch/branchList";
import RestaurantDetail from "./RestaurantDetail";
import { getClientAuth } from "@/lib/getSession";

export default async function Restaurant({
  params,
}: {
  params: { restaurantId: string };
}) {
  var restaurantId = params.restaurantId;

  var user = await getClientAuth("/ui/restaurant/" + restaurantId);

  var restaurant = await getBranchDetailByBranchId(restaurantId);

  if (restaurant === null) {
    throw new Error("Restaurant not found");
  }
  return <RestaurantDetail customerId={user.id} restaurant={restaurant} />;
}
