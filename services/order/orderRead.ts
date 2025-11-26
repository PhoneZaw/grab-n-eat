import { OrderItemStatus, OrderStatus, PickUpSlot } from "@prisma/client";
import { BranchMenuDetailResponse } from "../branchMenu/BranchMenuList";
import db from "@/lib/db";
import { BranchDetailResponse, BranchListResponse } from "../branch/branchList";

export type OrderCartResponse = {
  id: string;
  customerId: string;
  branchId: string;
  orderItems: OrderItemResponse[];
  promotionCode: string | null;
  promotionDiscount: number | null;
  TotalPrice: number;
  Total: number;
  status: OrderStatus;
  orderDate: Date;
  createdAt: Date;
};

export type OrderItemResponse = {
  id: string;
  quantity: number;
  unitPrice: number;
  specialInstruction: string | null;
  branchMenu: BranchMenuDetailResponse;
  status: OrderItemStatus;
};

export type OrderResponse = {
  id: string;
  orderCode: string;
  customerId: string;
  customerName: string;
  orderItems: OrderItemResponse[];
  orderItemCount: number;
  promotionCode: string | null;
  promotionDiscount: number | null;
  TotalPrice: number;
  Total: number;
  status: OrderStatus;
  orderDate: Date;
  createdAt: Date;
  branch: BranchListResponse;
  pickUpSlot: {
    slotStartTime: Date;
    slotEndTime: Date;
  } | null;
};

export async function getOrdersByBranchId(
  branchId: string
): Promise<OrderResponse[]> {
  var orders = await db.order.findMany({
    where: {
      branchId: branchId,
    },
    include: {
      OrderItem: {
        include: {
          branchMenu: {
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
              branch: {
                include: {
                  restaurant: true,
                },
              },
            },
          },
        },
      },
      customer: true,
      branch: {
        include: {
          restaurant: true,
        },
      },
      pickUpSlot: true,
    },
  });

  return orders.map((order) => {
    return {
      ...order,
      customerName: order.customer.name,
      orderItemCount: order.OrderItem.length,
      orderItems: order.OrderItem.map((item) => {
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
              (mc) => mc.category.name
            ),
            isActive: item.branchMenu.isActive,
          },
          status: item.status,
        };
      }),
      branch: {
        id: order.branch.id,
        name: order.branch.name,
        imageUrl: order.branch.restaurant.imageUrl,
        description: order.branch.description,
        address: order.branch.address,
        fullAddress: `${order.branch.address}`,
        latitude: order.branch.latitude,
        longitude: order.branch.longitude,
        contactNumber: order.branch.contactNumber,
        restaurantId: order.branch.restaurant.id,
        restaurantName: order.branch.restaurant.name,
        status: order.branch.status,
        categories: [],
        menus: [],
        openHours: [],
      },
    };
  });
}

export async function getCartOrderById(
  orderId: string
): Promise<OrderCartResponse | null> {
  var order = await db.order.findFirst({
    where: {
      id: orderId,
    },
  });

  if (order == null) {
    return null;
  }

  console.log("order", order);

  var orderItems = await db.orderItem.findMany({
    where: {
      orderId: orderId,
    },
    include: {
      branchMenu: {
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
      },
    },
  });

  console.log("orderItems", orderItems);

  return {
    ...order,
    orderItems: orderItems.map((item) => {
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
            (mc) => mc.category.name
          ),
          isActive: item.branchMenu.isActive,
        },
        status: item.status,
      };
    }),
  };
}

export async function getExistingCart(): Promise<OrderCartResponse | null> {
  // get last pending order by createdAt
  var order = await db.order.findFirst({
    where: {
      status: OrderStatus.PENDING,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      OrderItem: {
        include: {
          branchMenu: {
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
          },
        },
      },
    },
  });

  if (order == null) {
    return null;
  }

  return {
    ...order,
    orderItems: order?.OrderItem.map((item) => {
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
            (mc) => mc.category.name
          ),
          isActive: item.branchMenu.isActive,
        },
        status: item.status,
      };
    }),
  };
}

export type OrderDetailResponse = {
  id: string;
  orderCode: string;
  customerId: string;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  branch: BranchDetailResponse;
  orderItems: OrderItemResponse[];
  promotionCode: string | null;
  promotionDiscount: number | null;
  TotalPrice: number;
  Total: number;
  status: OrderStatus;
  cancelledReason: string | null;
  orderDate: Date;
  createdAt: Date;
  cancelledAt: Date | null;
  pickUpSlot: PickUpSlot | null;
};

export async function getOrderDetailById(
  orderId: string
): Promise<OrderDetailResponse | null> {
  var order = await db.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      branch: {
        include: {
          restaurant: true,
        },
      },
      pickUpSlot: true,
      customer: true,
    },
  });

  if (order == null) {
    console.log("order not found in service");
    return null;
  }

  var orderItems = await db.orderItem.findMany({
    where: {
      orderId: orderId,
    },
    include: {
      branchMenu: {
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
      },
    },
  });

  return {
    ...order,
    customer: {
      name: order.customer.name,
      email: order.customer.email,
      phone: order.customer.phoneNumber,
    },
    branch: {
      id: order.branch.id,
      name: order.branch.name,
      imageUrl: order.branch.restaurant.imageUrl,
      description: order.branch.description,
      address: order.branch.address,
      fullAddress: `${order.branch.address}`,
      latitude: order.branch.latitude,
      longitude: order.branch.longitude,
      contactNumber: order.branch.contactNumber,
      restaurantId: order.branch.restaurant.id,
      restaurantName: order.branch.restaurant.name,
      status: order.branch.status,
      categories: [],
      menus: [],
      openHours: [],
      reviews: [],
      coupons: [],
    },
    orderItems: orderItems.map((item) => {
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
            (mc) => mc.category.name
          ),
          isActive: item.branchMenu.isActive,
        },
        status: item.status,
      };
    }),
  };
}

export async function getOrderDetailByCode(
  orderCode: string
): Promise<OrderDetailResponse | null> {
  console.log("get order detail by code", orderCode);
  var order = await db.order.findFirst({
    where: {
      orderCode: orderCode,
    },
    include: {
      branch: {
        include: {
          restaurant: true,
        },
      },
      pickUpSlot: true,
      customer: true,
    },
  });

  if (order == null) {
    console.log("order not found in service");
    return null;
  }

  console.log("order", order);

  var orderItems = await db.orderItem.findMany({
    where: {
      orderId: order.id,
    },
    include: {
      branchMenu: {
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
      },
    },
  });

  console.log("orderItems", orderItems);

  return {
    ...order,
    customer: {
      name: order.customer.name,
      email: order.customer.email,
      phone: order.customer.phoneNumber,
    },
    branch: {
      id: order.branch.id,
      name: order.branch.name,
      imageUrl: order.branch.restaurant.imageUrl,
      description: order.branch.description,
      address: order.branch.address,
      fullAddress: `${order.branch.address}`,
      latitude: order.branch.latitude,
      longitude: order.branch.longitude,
      contactNumber: order.branch.contactNumber,
      restaurantId: order.branch.restaurant.id,
      restaurantName: order.branch.restaurant.name,
      status: order.branch.status,
      categories: [],
      menus: [],
      openHours: [],
      reviews: [],
      coupons: [],
    },
    orderItems: orderItems.map((item) => {
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
            (mc) => mc.category.name
          ),
          isActive: item.branchMenu.isActive,
        },
        status: item.status,
      };
    }),
  };
}

export async function getOrdersByCustomerId(
  customerId: string
): Promise<OrderResponse[]> {
  var orders = await db.order.findMany({
    where: {
      customerId: customerId,
      status: {
        not: OrderStatus.PENDING,
      },
    },
    include: {
      OrderItem: {
        include: {
          branchMenu: {
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
          },
        },
      },
      customer: true,
      branch: {
        include: {
          restaurant: true,
        },
      },
      pickUpSlot: true,
    },
  });

  return orders.map((order) => {
    return {
      ...order,
      customerName: order.customer.name,
      orderItemCount: order.OrderItem.length,
      orderItems: order.OrderItem.map((item) => {
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
              (mc) => mc.category.name
            ),
            isActive: item.branchMenu.isActive,
          },
          status: item.status,
        };
      }),
      branch: {
        id: order.branch.id,
        name: order.branch.name,
        imageUrl: order.branch.imageUrl,
        description: order.branch.description,
        address: order.branch.address,
        fullAddress: order.branch.address,
        latitude: order.branch.latitude,
        longitude: order.branch.longitude,
        contactNumber: order.branch.contactNumber,
        restaurantId: order.branch.restaurant.id,
        restaurantName: order.branch.restaurant.name,
        status: order.branch.status,
        categories: [],
        menus: [],
        openHours: [],
      },
    };
  });
}
