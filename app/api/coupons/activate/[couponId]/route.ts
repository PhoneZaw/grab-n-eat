import { activateCoupon } from "@/services/coupon/updateCoupon";

export async function PUT(
  req: Request,
  { params }: { params: { couponId: string } }
): Promise<Response> {
  await activateCoupon(params.couponId);

  return new Response("Activated");
}
