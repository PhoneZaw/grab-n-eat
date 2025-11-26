import db from "@/lib/db";

export type RestaurantDashboardData = {
  totalBranches: number;
  totalMenus: number;
  activeCoupons: number;
  totalOrders: number;
  branchOrders: BranchOrdersData[];
  popularItems: MenuItemData[];
  totalOrderItems: number;
  recentOrders: OrdersData[];
};

type BranchOrdersData = {
  name: string;
  orders: { day: string; orders: number }[];
};

type MenuItemData = {
  name: string;
  imageUrl: string;
  orders: number;
};

type OrdersData = {
  code: string;
  customer: string;
  items: number;
  total: number;
  status: string;
  branch: string;
};

export async function getOwnerDashboardData(
  restaurantId: string
): Promise<RestaurantDashboardData> {
  // Get total branches
  const popularItemLimit = 5;
  const recentOrdersLimit = 10;
  const totalBranches = await db.branch.count({
    where: { restaurantId, status: "ACTIVE" },
  });

  // Get total menus
  const totalMenus = await db.menu.count({
    where: { restaurantId },
  });

  // Get active coupons
  const activeCoupons = await db.coupon.count({
    where: {
      branch: { restaurantId },
      isActive: true,
      expiryDate: { gt: new Date() },
    },
  });

  // Get total orders and order items
  const ordersData = await db.order.aggregate({
    where: {
      branch: { restaurantId },
    },
    _count: {
      _all: true,
    },
  });

  const orderItemsCount = await db.orderItem.count({
    where: {
      order: {
        branch: { restaurantId },
      },
    },
  });

  // Get branch orders for last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const branches = await db.branch.findMany({
    where: { restaurantId },
    include: {
      Order: {
        where: {
          createdAt: { gte: sevenDaysAgo },
        },
      },
    },
  });

  const branchOrders: BranchOrdersData[] = branches.map((branch) => ({
    name: branch.name,
    orders: Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayOrders = branch.Order.filter(
        (order) => order.createdAt.toDateString() === date.toDateString()
      ).length;
      const formattedDay = date
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
        .replace(" ", "-");
      return {
        day: formattedDay,
        orders: dayOrders,
      };
    }).reverse(),
  }));

  console.log(branchOrders.map((b) => b.orders));

  // Get popular menu items
  const popularItems = await db.orderItem.groupBy({
    by: ["branchMenuId"],
    where: {
      order: {
        branch: { restaurantId },
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

  menuItemsData = menuItemsData.sort((a, b) => b.orders - a.orders);

  // Get recent orders
  const recentOrders = await db.order.findMany({
    where: {
      branch: { restaurantId },
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
    code: order.orderCode,
    customer: order.customer.name,
    items: order.OrderItem.length,
    total: order.TotalPrice,
    status: order.status,
    branch: order.branch.name,
  }));

  return {
    totalBranches,
    totalMenus,
    activeCoupons,
    totalOrders: ordersData._count._all,
    branchOrders,
    popularItems: menuItemsData,
    totalOrderItems: orderItemsCount,
    recentOrders: transformedOrders,
  };
}
