import db from "@/lib/db";

export type CreateCoupon = {
  code: string;
  discountPercentage: number;
  branchId: string;
  expiryDate: Date;
};

export async function createCoupon(data: CreateCoupon) {
  await db.coupon.create({
    data: {
      code: data.code,
      discount: 0,
      discountPercentage: data.discountPercentage,
      branchId: data.branchId,
      expiryDate: data.expiryDate,
      usedCount: 0,
      isActive: true,
    },
  });
}
