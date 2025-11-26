import db from "@/lib/db";

export async function activateStaff(id: string): Promise<void> {
  await db.user.update({
    where: {
      id: id,
    },
    data: {
      status: "ACTIVE",
    },
  });
}
