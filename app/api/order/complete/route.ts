import { cancelOrder, completeOrder } from "@/services/order/orderUpdate";

export async function POST(req: Request) {
  const body = await req.json();

  await completeOrder(body.orderId);

  return Response.json("Order rejected successfully");
}
