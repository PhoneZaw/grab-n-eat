import db from "../../lib/db";

export type BranchMenuListResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  branchId: string;
  menuCategories: string[];
  isActive: boolean;
};

export type BranchMenuCardResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  branchId: string;
  menuCategories: string[];
  isActive: boolean;
};

export type BranchMenuDetailResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  branchId: string;
  menuCategories: string[];
  isActive: boolean;
};

export async function getBranchMenuListByBranchId(
  branchId: string
): Promise<BranchMenuListResponse[]> {
  var branchMenus = await db.branchMenu.findMany({
    where: {
      branchId: branchId,
    },
    include: {
      menu: {
        include: {
          MenuCategory: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return branchMenus.map((bm) => {
    return {
      id: bm.id,
      name: bm.menu.name,
      description: bm.menu.description,
      imageUrl: bm.menu.imageUrl,
      price: bm.price,
      branchId: bm.branchId,
      menuCategories: bm.menu.MenuCategory.map((mc) => mc.category.name),
      isActive: bm.isActive,
    };
  });
}

export async function getBranchMenuCardListByBranchId(
  branchId: string
): Promise<BranchMenuCardResponse[]> {
  var branchMenus = await db.branchMenu.findMany({
    where: {
      branchId: branchId,
    },
    include: {
      menu: {
        include: {
          MenuCategory: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return branchMenus.map((bm) => {
    return {
      id: bm.menu.id,
      name: bm.menu.name,
      description: bm.menu.description,
      imageUrl: bm.menu.imageUrl,
      price: bm.price,
      branchId: bm.branchId,
      menuCategories: bm.menu.MenuCategory.map((mc) => mc.category.name),
      isActive: bm.isActive,
    };
  });
}

export async function getBranchMenuDetailById(
  branchMenuId: string
): Promise<BranchMenuDetailResponse | null> {
  var branchMenu = await db.branchMenu.findUnique({
    where: {
      id: branchMenuId,
    },
    include: {
      menu: {
        include: {
          MenuCategory: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  if (branchMenu === null) {
    return null;
  }

  return {
    id: branchMenu.id,
    name: branchMenu.menu.name,
    description: branchMenu.menu.description,
    imageUrl: branchMenu.menu.imageUrl,
    price: branchMenu.price,
    branchId: branchMenu.branchId,
    menuCategories: branchMenu.menu.MenuCategory.map((mc) => mc.category.name),
    isActive: branchMenu.isActive,
  };
}
