import db from "@/lib/db";
import { generateUID } from "@/lib/utils";
import { OrderItemStatus, OrderStatus } from "@prisma/client";
import { orderCreateSchema, OrderCreateInput } from "@/lib/validation/order";

export type OrderCreateRequest = OrderCreateInput;

export type OrderItemCreateRequest = {
  branchMenuId: string;
  quantity: number;
  unitPrice: number;
  specialInstruction?: string | null;
};

export async function createOrder(
  order: OrderCreateRequest
): Promise<{ orderId: string; orderCode: string } | undefined> {
  // Validate input
  const validation = orderCreateSchema.safeParse(order);
  if (!validation.success) {
    throw new Error(`Validation failed: ${validation.error.message}`);
  }

  let totalPrice = 0;
  order.orderItems.forEach((orderItem) => {
    totalPrice += orderItem.unitPrice * orderItem.quantity;
  });
  
  const total = totalPrice - (order.promotionDiscount || 0);

  try {
    const result = await db.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
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
        await tx.orderItem.create({
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

      return newOrder;
    });

    return { orderId: result.id, orderCode: result.orderCode };
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
}

function generateOrderCode(): string {
  return generateUID();
}
