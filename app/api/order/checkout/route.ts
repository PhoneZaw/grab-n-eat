import { checkoutOrder } from "@/services/order/orderUpdate";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();

  try {
    await checkoutOrder(body);
  } catch (e) {
    console.error(e);
    return new Response("Error", { status: 400 });
  }

  return Response.json({ message: "Order Created" });
}
