import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/getSession";
import { login } from "@/services/staff/getStaff";

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log("Email - ", body);

  const session = await getSession();

  var user = await login(body.email, body.password);

  if (user === null) {
    return new Response("Invalid email or password", { status: 401 });
  }

  session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    restaurantId: user.restaurantId,
    branchId: user.branchId,
  };
  // Save the user ID in the session
  await session!.save();

  return Response.json({ user: session.user });
}
