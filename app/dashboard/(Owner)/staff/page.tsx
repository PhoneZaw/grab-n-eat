import { getRestaurantList } from "@/services/restaurant/restaurantList";
import { Metadata } from "next";
import StaffList from "./staffList";
import { getManagersByRestaurantId } from "@/services/staff/staffList";
import { getAuth } from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Staff Management",
  description: "Staff Management page",
};

export default async function Staff() {
  const user = await getAuth(["OWNER"], "/dashboard/customer");

  if (!user?.restaurantId) {
    return <div>Restaurant not found</div>;
  }

  const data = await getManagersByRestaurantId(user.restaurantId);

  console.log(data);

  if (user.restaurantId === null) {
    return <div>Restaurant not found</div>;
  }

  return <StaffList staffs={data} restaurantId={user.restaurantId}></StaffList>;
}
