import { Metadata } from "next";
import BranchList from "./branchList";
import { getBranchListByRestaurantId } from "@/services/branch/branchList";
import { getAuth } from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Branch",
  description: "Branchs page",
};

export default async function Branch() {
  const user = await getAuth(["OWNER"], "/dashboard/customer");

  if (!user.restaurantId) return <div>Restaurant not found</div>;

  const data = await getBranchListByRestaurantId(user.restaurantId);

  return (
    <BranchList branches={data} restaurantId={user.restaurantId}></BranchList>
  );
}
