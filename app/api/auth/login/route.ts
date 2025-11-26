import { NextRequest } from "next/server";
import { getClientSession } from "@/lib/getSession";
import { login } from "@/services/staff/getStaff";
import { customerLogin } from "@/services/customer/customerAuth";

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log("Req Body - ", body);

  const session = await getClientSession();

  var user = await customerLogin(body.email, body.password);

  if (user === null) {
    return new Response("Invalid email or password", { status: 401 });
  }
  session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: "CUSTOMER",
    restaurantId: "",
    branchId: "",
  };
  // Save the user ID in the session
  await session!.save();

  return Response.json({ user: session.user });
}
