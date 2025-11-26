import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export async function GET() {
  const session = await getSession();
  session.destroy();
  return redirect("/auth/dashboard/login");
}
