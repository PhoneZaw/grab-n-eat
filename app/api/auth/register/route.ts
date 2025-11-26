import { register } from "@/services/customer/customerAuth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log("Req Body - ", body);

  var user = await register({ ...body, age: +body.age });

  if (user === null) {
    return new Response("Something went wrong", { status: 400 });
  }

  return Response.json({ message: "success" });
}
