import { getClientSession, getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export async function GET() {
  const session = await getClientSession();
  session.destroy();
  return redirect("/");
}
