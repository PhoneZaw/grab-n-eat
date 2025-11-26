import db from "../../lib/db";

export type MenuListResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  restaurantId: string;
  menuCategories: string[];
  branches: string[];
};

export type MenuCardResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  restaurantId: string;
  menuCategories: string[];
};

export type MenuDetailResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  restaurantId: string;
  menuCategories: string[];
};

export async function getMenuListByRestaurantId(
  restaurantId: string
): Promise<MenuListResponse[]> {
  var menus = await db.menu.findMany({
    where: {
      restaurantId: restaurantId,
    },
    include: {
      MenuCategory: {
        include: {
          category: true,
        },
      },
      BranchMenu: {
        include: {
          branch: true,
        },
      },
    },
  });

  return menus.map((c) => {
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      imageUrl: c.imageUrl,
      price: c.price.toString(),
      restaurantId: c.restaurantId,
      menuCategories: c.MenuCategory.map((mc) => mc.category.name),
      branches: c.BranchMenu.filter((bm) => bm.isActive).map(
        (bm) => bm.branch.name
      ),
    };
  });
}
