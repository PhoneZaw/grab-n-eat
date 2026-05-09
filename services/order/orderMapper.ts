import { OrderItemResponse, OrderResponse, OrderDetailResponse, OrderCartResponse } from "./orderRead";
import { BranchMenuCardResponse } from "../branchMenu/BranchMenuList";

export const mapOrderItem = (item: any): OrderItemResponse => {
  return {
    id: item.id,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    specialInstruction: item.specialInstruction,
    branchMenu: {
      id: item.branchMenu.menu.id,
      name: item.branchMenu.menu.name,
      description: item.branchMenu.menu.description,
      imageUrl: item.branchMenu.menu.imageUrl,
      price: item.branchMenu.price,
      branchId: item.branchMenu.branchId,
      menuCategories: item.branchMenu.menu.MenuCategory.map(
        (mc: any) => mc.category.name
      ),
      isActive: item.branchMenu.isActive,
    },
    status: item.status,
  };
};

export const mapBranch = (branch: any): any => {
  return {
    id: branch.id,
    name: branch.name,
    imageUrl: branch.restaurant?.imageUrl || branch.imageUrl,
    description: branch.description,
    address: branch.address,
    fullAddress: branch.address,
    latitude: branch.latitude,
    longitude: branch.longitude,
    contactNumber: branch.contactNumber,
    restaurantId: branch.restaurant?.id,
    restaurantName: branch.restaurant?.name,
    status: branch.status,
    categories: [],
    menus: [],
    openHours: [],
  };
};
