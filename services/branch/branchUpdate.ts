import db from "@/lib/db";

export type BranchUpdateRequest = {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: string;
  longitude: string;
};

export async function updateBranch(data: BranchUpdateRequest): Promise<void> {
  const branch = await db.branch.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!branch) {
    throw new Error(`Branch with id ${data.id} not found.`);
  }

  await db.branch.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      description: data.description,
      address: data.address,
      latitude: +data.latitude,
      longitude: +data.longitude,
    },
  });
}
