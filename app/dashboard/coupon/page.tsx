import { Metadata } from "next";
import CouponList from "./couponList";
import { getAuth } from "@/lib/getSession";
import { getCouponList } from "@/services/coupon/readCoupon";
import {
  getBranchDetailByBranchId,
  getBranchListByRestaurantId,
} from "@/services/branch/branchList";

export const meta: Metadata = {
  title: "Coupon",
};

export default async function Coupon({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await getAuth(["OWNER", "MANAGER"], "/dashboard/coupon");

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

  const coupons = await getCouponList(branchId);

  return (
    <CouponList
      coupons={coupons}
      selectedBranch={selectedBranch}
      branches={branches}
    ></CouponList>
  );
}
