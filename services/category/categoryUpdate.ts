import db from "@/lib/db";
import { CategoryType } from "@prisma/client";

export type CategoryUpdateRequest = {
  id: string;
  name: string;
  type: CategoryType;
};

export async function updateCategory(data: CategoryUpdateRequest) {
  return await db.category.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      type: data.type,
    },
  });
}
