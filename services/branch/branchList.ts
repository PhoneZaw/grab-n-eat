import { getDistanceInKilometer } from "@/lib/utils";
import db from "../../lib/db";
import { BranchMenuCardResponse } from "../branchMenu/BranchMenuList";
import { OpenHourListResponse } from "../openHour/openHourList";
import { getReviewByBranchId, ReviewResponse } from "../review/getReview";
import { CouponResponse, getActiveCoupons } from "../coupon/readCoupon";
import { BranchStatus, DayOfWeek } from "@prisma/client";

export type BranchListResponse = {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string;
  address: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  restaurantId: string;
  restaurantName: string;
  distance?: number;
  contactNumber: string | null;
  openHours: OpenHourListResponse[];
  status: string;
};

export type BranchCardResponse = {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  orderCountForNearestSlot: number;
  rating: number;
  distance?: number;
  categories: string[];
};

export type BranchDetailResponse = {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string;
  address: string;
  fullAddress: string;
  contactNumber: string | null;
  latitude: number;
  longitude: number;
  restaurantId: string;
  restaurantName: string;
  status: string;
  distance?: number;
  categories: string[];
  menus: BranchMenuCardResponse[];
  openHours: OpenHourListResponse[];
  reviews: ReviewResponse[];
  coupons: CouponResponse[];
};

export async function getBranchListByRestaurantId(
  restaurantId: string
): Promise<BranchListResponse[]> {
  const branches = await db.branch.findMany({
    where: {
      restaurantId: restaurantId,
      status: {
        not: BranchStatus.DELETED,
      },
    },
    include: {
      restaurant: true,
      OpeningHour: true,
    },
  });

  // Create map of enum values to their index
  const dayOrder = Object.values(DayOfWeek).reduce((acc, day, index) => {
    acc[day] = index;
    return acc;
  }, {} as Record<DayOfWeek, number>);

  return branches.map((c) => {
    return {
      id: c.id,
      name: c.name,
      imageUrl: c.imageUrl,
      description: c.description,
      address: c.address,
      fullAddress: `${c.address}`,
      latitude: c.latitude,
      longitude: c.longitude,
      restaurantId: c.restaurant.id,
      restaurantName: c.restaurant.name,
      status: c.status,
      contactNumber: c.contactNumber,
      openHours: [...c.OpeningHour].sort(
        (a, b) => dayOrder[a.day] - dayOrder[b.day]
      ),
    };
  });
}

export async function getFeaturedBranchList(
  count?: number | undefined,
  userLocation?: { latitude: number; longitude: number }
): Promise<BranchCardResponse[]> {
  const branches = await db.branch.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      restaurant: {
        include: {
          Menu: {
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
      PickUpSlot: true,
      Review: true,
    },
  });

  return branches.slice(0, count).map((b) => {
    let rating =
      b.Review.reduce((acc, r) => acc + r.rating, 0) / b.Review.length;

    if (isNaN(rating)) {
      rating = 0;
    }
    return {
      id: b.id,
      name: b.name,
      imageUrl: b.imageUrl,
      description: b.description,
      fullAddress: `${b.address}`,
      latitude: b.latitude,
      longitude: b.longitude,
      rating: rating,
      categories: b.restaurant.Menu.map((m) =>
        m.MenuCategory.map((mc) => mc.category.name)
      )
        .flat()
        .filter((value, index, array) => array.indexOf(value) === index)
        .slice(0, 3),
      orderCountForNearestSlot: b.PickUpSlot.filter(
        (ps) =>
          ps.date >= new Date() &&
          ps.date <= new Date(new Date().getTime() + 2 * 60 * 60 * 1000) // get orders for next 2 hours
      ).reduce((acc, ps) => acc + ps.orderCount, 0),
      distance:
        userLocation &&
        getDistanceInKilometer(
          userLocation.latitude,
          userLocation.longitude,
          b.latitude,
          b.longitude
        ),
    };
  });
}

export async function getBranchDetailByBranchId(
  branchId: string
): Promise<BranchDetailResponse | null> {
  const branch = await db.branch.findFirst({
    where: {
      id: branchId,
      status: "ACTIVE",
    },
    include: {
      BranchMenu: {
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
      OpeningHour: true,
      restaurant: {
        include: {
          Menu: {
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
      Review: true,
    },
  });

  if (branch === null) {
    return null;
  }

  const reviews = await getReviewByBranchId(branchId);
  const coupons = await getActiveCoupons(branchId);

  return {
    id: branch.id,
    name: branch.name,
    imageUrl: branch.imageUrl,
    description: branch.description,
    fullAddress: `${branch.address}`,
    latitude: branch.latitude,
    longitude: branch.longitude,
    contactNumber: branch.contactNumber,
    address: branch.address,
    restaurantId: branch.restaurant.id,
    restaurantName: branch.restaurant.name,
    status: branch.status,
    categories: branch.restaurant.Menu.map((m) =>
      m.MenuCategory.map((mc) => mc.category.name)
    )
      .flat()
      .filter((value, index, array) => array.indexOf(value) === index),
    menus: branch.BranchMenu.map((branchMenu) => {
      return {
        id: branchMenu.id,
        name: branchMenu.menu.name,
        description: branchMenu.menu.description,
        imageUrl: branchMenu.menu.imageUrl,
        price: branchMenu.price,
        branchId: branchMenu.branchId,
        menuCategories: branchMenu.menu.MenuCategory.map(
          (mc) => mc.category.name
        ),
        isActive: branchMenu.isActive,
      };
    }),
    openHours: branch.OpeningHour,
    reviews: reviews,
    coupons: coupons,
  };
}

export async function searchBranches(
  search: string,
  userLocation?: { latitude: number; longitude: number }
): Promise<BranchCardResponse[]> {
  const branches = await db.branch.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
      status: "ACTIVE",
    },
    include: {
      restaurant: {
        include: {
          Menu: {
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
      PickUpSlot: true,
      Review: true,
    },
  });

  return branches.map((b) => {
    let rating =
      b.Review.reduce((acc, r) => acc + r.rating, 0) / b.Review.length;

    if (isNaN(rating)) {
      rating = 0;
    }
    return {
      id: b.id,
      name: b.name,
      imageUrl: b.imageUrl,
      description: b.description,
      fullAddress: `${b.address}`,
      latitude: b.latitude,
      longitude: b.longitude,
      rating: rating,
      categories: b.restaurant.Menu.map((m) =>
        m.MenuCategory.map((mc) => mc.category.name)
      )
        .flat()
        .filter((value, index, array) => array.indexOf(value) === index)
        .slice(0, 3),
      orderCountForNearestSlot: b.PickUpSlot.filter(
        (ps) =>
          ps.date >= new Date() &&
          ps.date <= new Date(new Date().getTime() + 2 * 60 * 60 * 1000) // get orders for next 2 hours
      ).reduce((acc, ps) => acc + ps.orderCount, 0),
      distance:
        userLocation &&
        getDistanceInKilometer(
          userLocation.latitude,
          userLocation.longitude,
          b.latitude,
          b.longitude
        ),
    };
  });
}
