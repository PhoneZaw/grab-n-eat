import { errorReportEmailTemplate } from "@/lib/errorReportEmailTemplate";
import { sendMail } from "@/lib/mailService";
import { getOwnerEmailByBranchId } from "@/services/staff/getStaff";

export async function POST(req: Request) {
  const body = await req.json();

  const ownerEmail = await getOwnerEmailByBranchId(body.branchId);

  sendMail(ownerEmail, "Order Error Report", errorReportEmailTemplate(body));

  return new Response("Email sent", { status: 200 });
}
