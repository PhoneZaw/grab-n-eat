import {
  getOpenHourListByBranchId,
  OpenHourListResponse,
} from "@/services/openHour/openHourList";
import OpenHour from "./OpenHour";
import {
  getBranchDetailByBranchId,
  getBranchListByRestaurantId,
} from "@/services/branch/branchList";
import { getAuth } from "@/lib/getSession";

export default async function OpenHours({
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

  return <OpenHour selectedBranch={selectedBranch} branches={branches} />;
}
