import MenuList from "./MenuList";
import { getAuth } from "@/lib/getSession";
import { getBranchDetailByBranchId } from "@/services/branch/branchList";
import { getBranchMenuListByBranchId } from "@/services/branchMenu/BranchMenuList";

export default async function BranchMenu() {
  const user = await getAuth(["MANAGER"], "/dashboard/branchMenu");

  console.log("User", user);

  if (!user.branchId) return <div>Branch not found</div>;

  const data = await getBranchMenuListByBranchId(user.branchId);

  const branch = await getBranchDetailByBranchId(user.branchId);

  return <MenuList menus={data} branchName={branch?.name ?? ""} />;
}
