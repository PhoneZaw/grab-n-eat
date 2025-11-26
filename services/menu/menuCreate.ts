import db from "@/lib/db";

export type MenuCreateRequest = {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  restaurantId: string;
  categories: string[];
};

export type MenuCreateResponse = {
  id: string;
};

export async function createMenu(data: MenuCreateRequest) {
  var menu = await db.menu.create({
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      price: +data.price,
      restaurantId: data.restaurantId,
    },
  });

  await db.menuCategory.createMany({
    data: data.categories.map((c) => {
      return {
        menuId: menu.id,
        categoryId: c,
      };
    }),
  });

  var branches = await db.branch.findMany({
    where: {
      restaurantId: data.restaurantId,
    },
  });

  await db.branchMenu.createMany({
    data: branches.map((b) => {
      return {
        branchId: b.id,
        menuId: menu.id,
        price: +data.price,
        isActive: true,
      };
    }),
  });
}
