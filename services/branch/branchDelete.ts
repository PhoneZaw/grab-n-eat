import db from "@/lib/db";

export async function deleteBranch(id: string): Promise<void> {
  var branch = await db.branch.findFirst({
    where: {
      id: id,
    },
  });

  if (!branch) {
    throw new Error("Branch not found");
  }

  await db.branch.update({
    where: {
      id: id,
    },
    data: {
      status: "DELETED",
    },
  });
}
