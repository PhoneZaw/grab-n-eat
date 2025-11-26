import { deactivateCoupon } from "@/services/coupon/updateCoupon";

export async function PUT(
  req: Request,
  { params }: { params: { couponId: string } }
): Promise<Response> {
  await deactivateCoupon(params.couponId);

  return new Response("Deactivated");
}
