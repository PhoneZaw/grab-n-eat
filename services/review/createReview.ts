import db from "@/lib/db";

export async function createReview({
  orderCode,
  rating,
  review,
}: {
  orderCode: string;
  rating: number;
  review: string;
}) {
  const orderDetail = await db.order.findFirst({
    where: {
      orderCode: orderCode,
    },
  });

  if (!orderDetail) {
    throw new Error("Order not found");
  }

  const response = await db.review.create({
    data: {
      customerId: orderDetail.customerId,
      branchId: orderDetail.branchId,
      orderId: orderDetail.id,
      rating: rating,
      comment: review,
      createdAt: new Date(),
    },
  });
}
