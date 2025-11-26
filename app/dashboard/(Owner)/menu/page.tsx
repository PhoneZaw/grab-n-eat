import { getMenuListByRestaurantId } from "@/services/menu/menuList";
import MenuList from "./MenuList";
import { getAuth } from "@/lib/getSession";

export default async function Menu() {
  const user = await getAuth(["OWNER"], "/dashboard/customer");

  if (!user.restaurantId) return <div>Restaurant not found</div>;

  const data = await getMenuListByRestaurantId(user.restaurantId);

  return <MenuList menus={data} restaurantId={user.restaurantId} />;
}
