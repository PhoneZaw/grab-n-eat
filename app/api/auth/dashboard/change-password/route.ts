import { login } from "@/services/staff/getStaff";
import { changePassword } from "@/services/staff/updateStaff";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  var body = await request.json();

  var user = await login(body.email, body.currentPassword);

  if (user === null) {
    return new Response("Invalid password", { status: 401 });
  }

  var result = await changePassword(body.email, body.newPassword);

  return new Response("Password changed", { status: 200 });
}
