import db from "@/lib/db";
import { CustomerReportResponse } from "../customer/customerReport";

export type ReviewResponse = {
  id: string;
  customerId: string;
  customer: {
    name: string;
  };
  branchId: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

export async function getReviewByBranchId(
  branchId: string
): Promise<ReviewResponse[]> {
  const reviews = await db.review.findMany({
    where: {
      branchId: branchId,
    },
    include: {
      customer: true,
    },
  });

  return reviews;
}

export async function getReviewByOrderCode(
  orderCode: string
): Promise<ReviewResponse | null> {
  const review = await db.review.findFirst({
    where: {
      orderId: orderCode,
    },
    include: {
      customer: true,
    },
  });

  return review;
}
