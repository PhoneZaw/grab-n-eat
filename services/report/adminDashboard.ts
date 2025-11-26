import db from "@/lib/db";

export type AdminDashboardData = {
  totalOrders: number;
  activeRestaurants: number;
  topRestaurant: string;
  mostOrdersByTopRestaurant: number;
  averageRating: number;
  totalReviews: number;
  restaurantOrders: RestaurantOrdersData[];
  popularCuisines: PopularCuisinesData[];
};

type RestaurantOrdersData = {
  restaurantName: string;
  orders: number;
};

type PopularCuisinesData = {
  cuisine: string;
  orderItems: number;
};

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  try {
    const totalOrders = await db.order.count();
    const activeRestaurants = await db.restaurant.count({
      where: { status: "ACTIVE" },
    });

    const restaurants = await db.restaurant.findMany({});
    const branches = await db.branch.findMany({});

    const averageRating = await db.review.aggregate({
      _avg: { rating: true },
    });

    const totalReviews = await db.review.count();

    const ordersByRestaurant = await db.order.aggregateRaw({
      pipeline: [
        {
          $lookup: {
            from: "Branch",
            localField: "branchId",
            foreignField: "_id",
            as: "branch",
          },
        },
        { $unwind: "$branch" },
        { $group: { _id: "$branch.restaurantId", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ],
    });

    let restaurantOrders: RestaurantOrdersData[] = [];
    if (ordersByRestaurant && Array.isArray(ordersByRestaurant)) {
      restaurantOrders = ordersByRestaurant.map((order) => ({
        restaurantName:
          restaurants.find((r) => r.id === order._id["$oid"])?.name || "",
        orders: order.count,
      }));
    }

    const topRestaurantData = restaurantOrders.sort(
      (a, b) => b.orders - a.orders
    )[0];
    const topRestaurant = topRestaurantData?.restaurantName || "";

    const mostOrdersByTopRestaurant = topRestaurantData?.orders || 0;

    return {
      totalOrders,
      activeRestaurants,
      topRestaurant,
      mostOrdersByTopRestaurant,
      averageRating: averageRating._avg.rating || 0,
      totalReviews,
      restaurantOrders,
      popularCuisines: await getPopularCategories(),
    };
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    throw error;
  }
}

const getPopularCategories = async () => {
  const popularCategories = await db.orderItem.groupBy({
    by: ["branchMenuId"],
    where: {
      status: "ACTIVE",
    },
    _sum: {
      quantity: true,
    },
  });

  const categoriesWithCount = await db.category.findMany({
    where: {
      MenuCategory: {
        some: {
          menu: {
            BranchMenu: {
              some: {
                id: {
                  in: popularCategories.map((pc) => pc.branchMenuId),
                },
              },
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      type: true,
      MenuCategory: {
        select: {
          menu: {
            select: {
              BranchMenu: {
                select: {
                  id: true,
                  OrderItem: {
                    where: {
                      status: "ACTIVE",
                    },
                    select: {
                      quantity: true,
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

  return categoriesWithCount.map((category) => {
    const totalOrders = category.MenuCategory.reduce(
      (categoryTotal, menuCategory) => {
        const branchMenuOrderCount = menuCategory.menu.BranchMenu.reduce(
          (branchMenuTotal, branchMenu) => {
            const orderItemCount = branchMenu.OrderItem.reduce(
              (orderItemTotal, orderItem) => {
                return orderItemTotal + (orderItem.quantity || 0);
              },
              0
            );
            return branchMenuTotal + orderItemCount;
          },
          0
        );
        return categoryTotal + branchMenuOrderCount;
      },
      0
    );

    return {
      cuisine: category.name,
      orderItems: totalOrders,
    };
  });
};
