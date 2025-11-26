import db from "@/lib/db";
import { format } from "date-fns";

export type OrderReport = {
  orderId: string;
  orderDate: string;
  customerName: string;
  branchName: string;
  orderItems: {
    name: string;
    quantity: number;
    price: number;
  }[];
  orderStatus: string;
  total: number;
  branchAddress: string;
  pickupTime: string;
  customerRating: number;
};

export async function getOrderReportData(
  branchId?: string
): Promise<OrderReport[]> {
  console.log("branchId", branchId);
  const orders = await db.order.findMany({
    where: branchId ? { branchId } : {},
    include: {
      customer: {
        select: {
          name: true,
        },
      },
      branch: {
        select: {
          name: true,
          address: true,
        },
      },
      OrderItem: {
        include: {
          branchMenu: {
            include: {
              menu: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      Review: {
        select: {
          rating: true,
        },
      },
    },
  });

  return orders.map((order) => ({
    orderId: order.orderCode,
    orderDate: format(new Date(order.orderDate), "yyyy-MM-dd HH:mm"),
    customerName: order.customer.name,
    branchName: order.branch.name,
    orderItems: order.OrderItem.map((item) => ({
      name: item.branchMenu.menu.name,
      quantity: item.quantity,
      price: item.unitPrice,
    })),
    orderStatus: order.status,
    total: order.Total,
    branchAddress: order.branch.address,
    pickupTime: order.pickupDate
      ? format(new Date(order.pickupDate), "yyyy-MM-dd HH:mm")
      : "",
    customerRating: order.Review[0]?.rating || 0,
  }));
}
