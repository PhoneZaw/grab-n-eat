import { getBranchMenuDetailById } from "@/services/branchMenu/BranchMenuList";

export async function GET(
  request: Request,
  { params }: { params: { branchMenuId: string } }
) {
  const branchMenus = await getBranchMenuDetailById(params.branchMenuId);

  return Response.json(branchMenus);
}
