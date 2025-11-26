import {
  CircleUser,
  Clock,
  Home,
  LineChart,
  LogOutIcon,
  Package,
  Salad,
  ShoppingCart,
  Star,
  Store,
  TicketPercent,
  Users,
  Utensils,
} from "lucide-react";

export const adminMenus = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard/dashboard",
  },
  {
    icon: Store,
    label: "Restaurants",
    href: "/dashboard/restaurant",
  },
  {
    icon: Users,
    label: "Customers",
    href: "/dashboard/customer",
  },
  {
    icon: Salad,
    label: "Categories",
    href: "/dashboard/category",
  },
];

export const ownerMenus = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard/owner-dashboard",
  },
  {
    icon: Store,
    label: "Branches",
    href: "/dashboard/branch",
  },
  {
    icon: Users,
    label: "StaffManagement",
    href: "/dashboard/staff",
  },
  {
    icon: ShoppingCart,
    label: "Orders",
    href: "/dashboard/order",
  },
  {
    icon: Star,
    label: "Rating&Reviews",
    href: "/dashboard/rating",
  },
  {
    icon: Clock,
    label: "OpenHours",
    href: "/dashboard/openhours",
  },
  {
    icon: Utensils,
    label: "Menus",
    href: "/dashboard/menu",
  },
  {
    icon: TicketPercent,
    label: "Coupons",
    href: "/dashboard/coupon",
  },
  {
    icon: LineChart,
    label: "Report",
    href: "/dashboard/order-report",
  },
];

export const managerMenus = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard/manager-dashboard",
  },
  {
    icon: ShoppingCart,
    label: "Orders",
    href: "/dashboard/order",
  },
  {
    icon: Star,
    label: "Rating&Reviews",
    href: "/dashboard/rating",
  },
  {
    icon: Clock,
    label: "OpenHours",
    href: "/dashboard/openhours",
  },
  {
    icon: Utensils,
    label: "Menus",
    href: "/dashboard/branchMenu",
  },
  {
    icon: TicketPercent,
    label: "Coupons",
    href: "/dashboard/coupon",
  },
  {
    icon: LineChart,
    label: "Report",
    href: "/dashboard/order-report",
  },
];

export const userMenus = [
  {
    icon: CircleUser,
    label: "Profile",
    href: "/dashboard/profile",
  },
  {
    icon: LogOutIcon,
    label: "Logout",
    href: "/api/auth/dashboard/logout",
  },
];
