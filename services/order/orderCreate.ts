import db from "@/lib/db";
import { generateUID } from "@/lib/utils";
import { OrderItemStatus, OrderStatus } from "@prisma/client";

export type OrderCreateRequest = {
  customerId: string;
  branchId: string;
  orderItems: OrderItemCreateRequest[];
  promotionCode?: string | null;
  promotionDiscount?: number | null;
  specialInstruction?: string | null;
};

export type OrderItemCreateRequest = {
  branchMenuId: string;
  quantity: number;
  unitPrice: number;
  specialInstruction?: string | null;
};

export async function createOrder(
  order: OrderCreateRequest
): Promise<{ orderId: string; orderCode: string } | undefined> {
  console.log("add Order function");
  var totalPrice = 0;
  order.orderItems.forEach((orderItem) => {
    totalPrice += orderItem.unitPrice * orderItem.quantity;
  });
  var total = totalPrice - (order.promotionDiscount || 0);

  var newOrder = await db.order.create({
    data: {
      orderCode: generateOrderCode(),
      promotionCode: order.promotionCode,
      promotionDiscount: order.promotionDiscount,
      TotalPrice: totalPrice,
      Total: total,
      status: OrderStatus.PENDING,
      orderDate: new Date(),
      customerId: order.customerId,
      branchId: order.branchId,
      createdAt: new Date(),
    },
  });
  for (const orderItem of order.orderItems) {
    await db.orderItem.create({
      data: {
        quantity: orderItem.quantity,
        unitPrice: orderItem.unitPrice,
        branchMenuId: orderItem.branchMenuId,
        specialInstruction: orderItem.specialInstruction,
        orderId: newOrder.id,
        status: OrderItemStatus.ACTIVE,
      },
    });
  }
  return { orderId: newOrder.id, orderCode: newOrder.orderCode };
}

function generateOrderCode(): string {
  return generateUID();
}
