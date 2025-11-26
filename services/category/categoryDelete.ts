import db from "@/lib/db";

export async function deleteCategory(id: string): Promise<void> {
  await db.category.delete({
    where: {
      id: id,
    },
  });
}
