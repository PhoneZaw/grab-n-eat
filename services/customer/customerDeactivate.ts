import db from "@/lib/db";

export async function deactivateCustomer(id: string): Promise<void> {
  await db.customer.update({
    where: {
      id: id,
    },
    data: {
      status: "INACTIVE",
    },
  });
}
