import { activateCustomer } from "@/services/customer/customerActivate";

export async function PUT(
  req: Request,
  { params }: { params: { customerId: string } }
): Promise<Response> {
  await activateCustomer(params.customerId);

  return new Response("Activated");
}
