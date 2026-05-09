import db from "../../lib/db";

export type CategoryListResponse = {
  id: string;
  name: string;
  imageUrl?: string | null;
  type: string;
};

export async function getCategoryList(): Promise<CategoryListResponse[]> {
  const categories = await db.category.findMany({});

  return categories.map((c) => {
    return {
      id: c.id,
      name: c.name,
      type: c.type,
      imageUrl: c.imageUrl,
    };
  });
}

export async function getFeaturedCuisines(
  count: number
): Promise<CategoryListResponse[]> {
  const categories = await db.category.findMany({});

  return categories.slice(0, count).map((c) => {
    return {
      id: c.id,
      name: c.name,
      imageUrl: c.imageUrl,
      type: c.type,
    };
  });
}
