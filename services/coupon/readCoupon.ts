import db from "@/lib/db";

export type CouponResponse = {
  id: string;
  code: string;
  discount: number;
  discountPercentage: number;
  branchId: string;
  branch: {
    name: string;
  };
  expiryDate: Date;
  usedCount: number;
  isActive: boolean;
};

export async function getCouponList(
  branchId: string
): Promise<CouponResponse[]> {
  return await db.coupon.findMany({
    where: {
      branchId,
    },
    include: {
      branch: true,
    },
    orderBy: {
      expiryDate: "desc",
    },
  });
}

export async function getActiveCoupons(
  branchId: string
): Promise<CouponResponse[]> {
  return await db.coupon.findMany({
    where: {
      branchId,
      isActive: true,
      expiryDate: {
        gte: new Date(new Date().getDate()),
      },
    },
    include: {
      branch: true,
    },
    orderBy: {
      expiryDate: "desc",
    },
  });
}

export async function getCouponDetail(
  code: string
): Promise<CouponResponse | null> {
  return await db.coupon.findFirst({
    where: {
      code,
    },
    include: {
      branch: true,
    },
  });
}

export async function checkCoupon(code: string): Promise<boolean> {
  var coupon = await db.coupon.findFirst({
    where: {
      code,
      isActive: true,
      expiryDate: {
        gte: new Date(new Date().getDate()),
      },
    },
  });

  return coupon !== null;
}
