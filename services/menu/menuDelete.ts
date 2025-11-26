import db from "@/lib/db";

export async function deleteMenu(id: string): Promise<void> {
  await db.menuCategory.deleteMany({
    where: {
      menuId: id,
    },
  });

  await db.branchMenu.deleteMany({
    where: {
      menuId: id,
    },
  });

  await db.menu.delete({
    where: {
      id: id,
    },
  });
}
