import db from "@/lib/db";

export async function deleteOpenHour(id: string): Promise<void> {
  await db.openingHour.delete({
    where: {
      id: id,
    },
  });
}
