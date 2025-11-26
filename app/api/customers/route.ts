import { getCustomerReport } from "@/services/customer/customerReport";
import { createCustomer } from "@/services/customer/customerCreate";
import { deleteCustomer } from "@/services/customer/customerDelete";

export async function GET(request: Request) {
  const data = await getCustomerReport();

  return new Response("Hello World");
}

export async function POST(request: Request) {
  const body = await request.json();

  await createCustomer(body);

  return new Response("Created");
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await deleteCustomer(body.id);

  return new Response("Deleted");
}
