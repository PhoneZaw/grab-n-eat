import db from "@/lib/db";

export type MenuUpdateRequest = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  categories: string[];
};

export async function updateMenu(data: MenuUpdateRequest) {
  var menu = await db.menu.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      price: +data.price,
    },
  });
  // await db.menuCategory.deleteMany({
  //   where: {
  //     menuId: data.id,
  //   },
  // });

  // await db.menuCategory.createMany({
  //   data: data.categories?.map((c) => {
  //     return {
  //       menuId: data.id,
  //       categoryId: c,
  //     };
  //   }),
  // });

  await db.branchMenu.updateMany({
    where: {
      menuId: data.id,
    },
    data: {
      price: +data.price,
    },
  });
}
