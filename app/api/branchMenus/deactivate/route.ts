import { deactivateBranchMenu } from "@/services/branchMenu/BranchMenuUpdate";

export async function PUT(request: Request) {
  const { id } = await request.json();
  console.log("Deactivating branch menu", id);
  await deactivateBranchMenu({ id });

  return Response.json({});
}
