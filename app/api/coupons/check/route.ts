import { checkCoupon } from "@/services/coupon/readCoupon";

export async function POST(request: Request) {
  const body = await request.json();

  var result = await checkCoupon(body.code);

  if (result) {
    return Response.json({ isSuccess: true });
  }

  return Response.json({ isSuccess: false });
}
