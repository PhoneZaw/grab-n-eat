import db from "@/lib/db";

export async function deleteStaff(id: string): Promise<void> {
  await db.user.delete({
    where: {
      id: id,
    },
  });
}
