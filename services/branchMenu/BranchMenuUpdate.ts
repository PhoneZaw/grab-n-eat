import db from "@/lib/db";

export type MenuUpdateRequest = {
  id: string;
};

export async function activateBranchMenu(data: MenuUpdateRequest) {
  await db.branchMenu.update({
    where: {
      id: data.id,
    },
    data: {
      isActive: true,
    },
  });
}

export async function deactivateBranchMenu(data: MenuUpdateRequest) {
  await db.branchMenu.update({
    where: {
      id: data.id,
    },
    data: {
      isActive: false,
    },
  });
}
