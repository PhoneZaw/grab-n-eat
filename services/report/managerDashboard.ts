import db from "@/lib/db";

export type BranchDashboardData = {
  totalMenus: number;
  totalOrders: number;
  averageOrderValue: number;
  averageRating: number;
  ordersOfLast7Days: OrderData[];
  popularItems: MenuItemData[];
  totalOrderItems: number;
  recentOrders: OrdersData[];
};

type OrderData = {
  day: string;
  orders: number;
};

type MenuItemData = {
  name: string;
  imageUrl: string;
  orders: number;
};

type OrdersData = {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: string;
};

export async function getManagerDashboardData(
  branchId: string
): Promise<BranchDashboardData> {
  const popularItemLimit = 5;
  const recentOrdersLimit = 10;

  const totalMenus = await db.branchMenu.count({
    where: { branchId, isActive: true },
  });

  const ordersData = await db.order.aggregate({
    where: {
      branchId,
    },
    _count: {
      _all: true,
    },
  });

  const orderItemsCount = await db.orderItem.count({
    where: {
      order: {
        branchId,
      },
    },
  });

  // Get branch orders for last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const branch = await db.branch.findFirst({
    where: { id: branchId },
    include: {
      Order: {
        where: {
          createdAt: { gte: sevenDaysAgo },
        },
      },
    },
  });

  if (!branch) {
    throw new Error("Branch not found");
  }

  const ordersOfLast7Days: OrderData[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      .replace(" ", "-");
    ordersOfLast7Days.push({ day, orders: 0 });
  }

  branch.Order.forEach((order) => {
    const day = order.createdAt
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      .replace(" ", "-");
    const existingDay = ordersOfLast7Days.find((o) => o.day === day);
    if (existingDay) {
      existingDay.orders += 1;
    }
  });

  // Get popular menu items
  const popularItems = await db.orderItem.groupBy({
    by: ["branchMenuId"],
    where: {
      order: {
        branchId,
      },
    },
    _count: {
      _all: true,
    },
    take: popularItemLimit,
    orderBy: {
      _count: {
        branchMenuId: "desc",
      },
    },
  });

  var menuItemsData = await Promise.all(
    popularItems.map(async (item) => {
      const menuData = await db.branchMenu.findUnique({
        where: { id: item.branchMenuId },
        include: { menu: true },
      });
      return {
        name: menuData?.menu.name || "",
        imageUrl: menuData?.menu.imageUrl || "",
        orders: item._count._all,
      };
    })
  );

  menuItemsData = menuItemsData.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.orders += item.orders;
    } else {
      acc.push(item);
    }
    return acc;
  }, [] as MenuItemData[]);

  console.log("menuItemData " + menuItemsData);

  menuItemsData = menuItemsData.sort((a, b) => b.orders - a.orders);

  // Get recent orders
  const recentOrders = await db.order.findMany({
    where: {
      branchId,
    },
    include: {
      customer: true,
      OrderItem: true,
      branch: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: recentOrdersLimit,
  });

  const transformedOrders: OrdersData[] = recentOrders.map((order) => ({
    id: order.id,
    customer: order.customer.name,
    items: order.OrderItem.length,
    total: order.TotalPrice,
    status: order.status,
    branch: order.branch.name,
  }));

  const averageOrderValue = await db.order.aggregate({
    where: {
      branchId,
      status: {
        in: ["PICKED", "READY"],
      },
    },
    _avg: {
      Total: true,
    },
  });

  const averageRating = await db.review.aggregate({
    where: {
      branchId,
    },
    _avg: {
      rating: true,
    },
  });

  return {
    totalMenus,
    totalOrders: ordersData._count._all,
    averageOrderValue: averageOrderValue._avg.Total || 0,
    averageRating: averageRating._avg.rating || 0,
    ordersOfLast7Days,
    popularItems: menuItemsData,
    totalOrderItems: orderItemsCount,
    recentOrders: transformedOrders,
  };
}
