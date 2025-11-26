import {
  adminMenus,
  managerMenus,
  ownerMenus,
  userMenus,
} from "@/data/navConst";
import { getAuth } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getAuth();

  switch (user.role) {
    case "ADMIN":
      console.log("Redirect to admin", adminMenus[1].href);
      redirect(adminMenus[0].href);
    case "OWNER":
      console.log("Redirect to owner");
      redirect(ownerMenus[0].href);
    case "MANAGER":
      console.log("Redirect to manager");
      redirect(managerMenus[0].href);
    default:
      redirect(`/auth/dashboard/login`);
  }
}
