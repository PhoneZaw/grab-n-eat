import { acceptOrder, cancelOrder } from "@/services/order/orderUpdate";

export async function POST(req: Request) {
  const body = await req.json();

  await acceptOrder(body.orderId);

  return Response.json("Order accepted successfully");
}
