import { activateBranchMenu } from "@/services/branchMenu/BranchMenuUpdate";

export async function PUT(request: Request) {
  const { id } = await request.json();
  await activateBranchMenu({ id });

  return Response.json({});
}
