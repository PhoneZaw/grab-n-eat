import { sendMail } from "@/lib/mailService";
import { orderEmailTemplate } from "@/lib/orderEmailTemplate";
import { format } from "date-fns";

export async function POST(req: Request) {
  const body = await req.json();

  sendMail(body.customerEmail, "Order Confirmation", orderEmailTemplate(body));

  return new Response("Email sent", { status: 200 });
}
