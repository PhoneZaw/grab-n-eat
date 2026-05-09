import db from "@/lib/db";
import { menuCreateSchema, MenuCreateInput } from "@/lib/validation/menu";

export type MenuCreateRequest = MenuCreateInput;

export async function createMenu(data: MenuCreateRequest) {
  const validation = menuCreateSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(`Validation failed: ${validation.error.message}`);
  }

  const validatedData = validation.data;

  try {
    return await db.$transaction(async (tx) => {
      const menu = await tx.menu.create({
        data: {
          name: validatedData.name,
          description: validatedData.description,
          imageUrl: validatedData.imageUrl,
          price: validatedData.price,
          restaurantId: validatedData.restaurantId,
        },
      });

      await tx.menuCategory.createMany({
        data: validatedData.categories.map((c) => {
          return {
            menuId: menu.id,
            categoryId: c,
          };
        }),
      });

      const branches = await tx.branch.findMany({
        where: {
          restaurantId: validatedData.restaurantId,
        },
      });

      await tx.branchMenu.createMany({
        data: branches.map((b) => {
          return {
            branchId: b.id,
            menuId: menu.id,
            price: validatedData.price,
            isActive: true,
          };
        }),
      });

      return menu;
    });
  } catch (error) {
    console.error("Failed to create menu:", error);
    throw error;
  }
}
