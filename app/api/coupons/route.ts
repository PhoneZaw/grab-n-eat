import { createCoupon, CreateCoupon } from "@/services/coupon/createCoupon";
import { deleteCoupon } from "@/services/coupon/deleteCoupon";

export async function POST(request: Request) {
  const body = await request.json();

  await createCoupon(body);

  return new Response("Created");
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await deleteCoupon(body.id);

  return new Response("Deleted");
}
