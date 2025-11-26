import db from "@/lib/db";
import { createDefaultOpenHours } from "../openHour/openHourCreate";

export type BranchCreateRequest = {
  name: string;
  description: string;
  address: string;
  contactNumber: string;
  latitude: string;
  longitude: string;
  restaurantId: string;
  imageUrl: string;
};

export type BranchCreateResponse = {
  id: string;
};

export async function createBranch(data: BranchCreateRequest) {
  var response = await db.branch.create({
    data: {
      name: data.name,
      description: data.description,
      address: data.address,
      contactNumber: data.contactNumber,
      imageUrl: data.imageUrl,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      restaurantId: data.restaurantId,
      status: "ACTIVE",
    },
  });

  var menus = await db.menu.findMany({
    where: {
      restaurantId: data.restaurantId,
    },
  });

  if (menus.length != 0) {
    await db.branchMenu.createMany({
      data: menus.map((m) => {
        return {
          branchId: response.id,
          menuId: m.id,
          price: m.price,
          isActive: true,
        };
      }),
    });
  }

  // Create opening hours for the branch
  await createDefaultOpenHours(response.id);
}
