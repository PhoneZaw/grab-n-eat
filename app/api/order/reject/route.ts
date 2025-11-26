import { cancelOrder, rejectOrder } from "@/services/order/orderUpdate";

export async function POST(req: Request) {
  const body = await req.json();

  await rejectOrder(body.orderId);

  return Response.json("Order rejected successfully");
}
