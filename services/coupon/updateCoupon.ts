import db from "@/lib/db";

export async function activateCoupon(id: string) {
  await db.coupon.update({
    where: {
      id,
    },
    data: {
      isActive: true,
    },
  });
}

export async function deactivateCoupon(id: string) {
  await db.coupon.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}

export type ApplyCoupon = {
  code: string;
  orderId: string;
};

export async function applyCoupon(applyCoupon: ApplyCoupon) {
  const coupon = await db.coupon.findFirst({
    where: {
      code: applyCoupon.code,
    },
  });

  if (!coupon) {
    throw new Error("Coupon not found");
  }

  if (coupon.expiryDate < new Date(new Date().setHours(0, 0, 0, 0))) {
    throw new Error("Coupon is expired");
  }

  var order = await db.order.findFirst({
    where: {
      id: applyCoupon.orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  var discount = Math.floor(
    (order?.TotalPrice * coupon.discountPercentage) / 100
  );

  console.log("orderId", applyCoupon.orderId);
  await db.order.update({
    where: {
      id: applyCoupon.orderId,
    },
    data: {
      promotionCode: coupon.code,
      promotionDiscount: discount,
      Total: order?.TotalPrice - discount,
    },
  });
}

export async function cancelCoupon(orderId: string) {
  var order = await db.order.findFirst({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      promotionCode: null,
      promotionDiscount: 0,
      Total: order.TotalPrice,
    },
  });
}
