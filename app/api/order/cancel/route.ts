import { cancelOrder } from "@/services/order/orderUpdate";

export async function POST(req: Request) {
  const body = await req.json();

  await cancelOrder(body);

  return Response.json("Order cancelled successfully");
}
