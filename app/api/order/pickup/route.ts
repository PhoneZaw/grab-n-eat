import { pickUpOrder } from "@/services/order/orderUpdate";

export async function POST(req: Request) {
  const body = await req.json();

  await pickUpOrder(body);

  return Response.json("Order picked up successfully");
}
