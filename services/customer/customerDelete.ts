import db from "@/lib/db";

export async function deleteCustomer(id: string): Promise<void> {
  await db.customer.delete({
    where: {
      id: id,
    },
  });
}
