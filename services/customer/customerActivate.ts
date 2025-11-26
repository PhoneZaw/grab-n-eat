import db from "@/lib/db";

export async function activateCustomer(id: string): Promise<void> {
  await db.customer.update({
    where: {
      id: id,
    },
    data: {
      status: "ACTIVE",
    },
  });
}
