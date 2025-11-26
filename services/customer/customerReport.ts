import { OrderStatus } from "@prisma/client";
import db from "../../lib/db";

export type CustomerReportResponse = {
  id: string;
  name: string;
  email: string;
  status: string;
  orderCount: number;
  cancelOrderCount: number;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export async function getCustomerReport(): Promise<CustomerReportResponse[]> {
  var customers = await db.customer.findMany({
    include: {
      orders: true,
    },
  });

  return customers.map((c) => {
    return {
      id: c.id,
      name: c.name,
      email: c.email,
      status: c.status,
      orderCount: c.orders.length,
      cancelOrderCount: c.orders.filter(
        (o) => o.status === OrderStatus.CANCELLED
      ).length,
    };
  });
}
