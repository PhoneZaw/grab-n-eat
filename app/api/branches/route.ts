import { createBranch } from "@/services/branch/branchCreate";
import { deleteBranch } from "@/services/branch/branchDelete";
import { updateBranch } from "@/services/branch/branchUpdate";

export type GetBranchResponse = {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  restaurantId: string;
  restaurantName: string;
};

export async function POST(request: Request) {
  const body = await request.json();

  await createBranch(body);

  return new Response("Branch Created");
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await deleteBranch(body.id);

  return new Response("Branch Deleted");
}

export async function PUT(request: Request) {
  const body = await request.json();

  await updateBranch(body);

  return new Response("Branch Updated");
}
