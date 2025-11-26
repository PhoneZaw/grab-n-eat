import { getExistingCart } from "@/services/order/orderRead";

export async function GET(request: Request): Promise<Response> {
  const cart = await getExistingCart();

  return Response.json(cart);
}

export async function PUT(request: Request): Promise<Response> {
  const body = await request.json();

  console.log("Cart Update Body", body);

  return Response.json({ message: "Cart Updated" });
}
