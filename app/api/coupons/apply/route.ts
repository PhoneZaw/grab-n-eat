import { checkCoupon } from "@/services/coupon/readCoupon";
import { applyCoupon } from "@/services/coupon/updateCoupon";

export async function POST(request: Request) {
  const body = await request.json();

  console.log(body);

  try {
    await applyCoupon(body);
  } catch (e) {
    console.error(e);
    return Response.json({ isSuccess: false });
  }

  return Response.json({ isSuccess: true });
}
