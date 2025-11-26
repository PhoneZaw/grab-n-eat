import db from "@/lib/db";
import { CategoryType } from "@prisma/client";

export type CategoryCreateRequest = {
  name: string;
  imageUrl: string;
  type: CategoryType;
};

export type CategoryCreateResponse = {
  id: string;
};

export async function createCategory(
  data: CategoryCreateRequest
): Promise<CategoryCreateResponse> {
  return await db.category.create({
    data: {
      name: data.name,
      type: data.type,
      imageUrl: data.imageUrl,
    },
  });
}
