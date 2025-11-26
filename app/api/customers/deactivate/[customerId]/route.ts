import { deactivateCustomer } from "@/services/customer/customerDeactivate";

export async function PUT(
  req: Request,
  { params }: { params: { customerId: string } }
): Promise<Response> {
  await deactivateCustomer(params.customerId);

  return new Response("Deactivated");
}
