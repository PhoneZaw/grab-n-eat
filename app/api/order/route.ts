import { createOrder } from "@/services/order/orderCreate";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();

  console.log("Order Body", body);

  var orderResponse = await createOrder(body);

  if (orderResponse == undefined) {
    return new Response("Error", { status: 400 });
  }

  var json = JSON.stringify(orderResponse);

  return new Response(json, { status: 200 });
}
