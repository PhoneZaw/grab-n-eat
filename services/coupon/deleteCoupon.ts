import db from "@/lib/db";

export async function deleteCoupon(id: string) {
  await db.coupon.delete({
    where: {
      id,
    },
  });
}
