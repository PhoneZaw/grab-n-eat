import { getOrdersByBranchId } from "@/services/order/orderRead";
import OrderListTable from "./orderListTable";
import { getAuth } from "@/lib/getSession";
import {
  getBranchDetailByBranchId,
  getBranchListByRestaurantId,
} from "@/services/branch/branchList";

export default async function OrderPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await getAuth(["MANAGER", "OWNER"], "/dashboard/customer");

  var branchId = session.branchId;

  var branches = null;

  if (session.role === "OWNER") {
    if (session.restaurantId) {
      branches = await getBranchListByRestaurantId(session.restaurantId!);
    } else {
      throw new Error("Restaurant not found");
    }
    if (branches && branches.length > 0) {
      branchId = searchParams.branchId ?? branches[0].id;
    } else {
      throw new Error("Branch not found");
    }
  }

  if (!branchId) {
    throw new Error("Branch not found");
  }
  var selectedBranch = await getBranchDetailByBranchId(branchId);
  if (!selectedBranch) {
    throw new Error("Branch not found");
  }

  var order = await getOrdersByBranchId(branchId);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <OrderListTable
        orders={order}
        selectedBranch={selectedBranch}
        branches={branches}
      />
    </div>
  );
}
