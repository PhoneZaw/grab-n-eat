import db from "@/lib/db";
import { OrderStatus, PickUpSlotStatus } from "@prisma/client";

export type OrderCheckoutRequest = {
  orderId: string;
  branchId: string;
  deliverySlotDate: Date;
  deliverySlotStartTime: Date;
  deliverySlotEndTime: Date;
  couponCode?: string | null;
};

export async function checkoutOrder(request: OrderCheckoutRequest) {
  console.log("checkout Order function");
  var order = await db.order.findFirst({
    where: {
      id: request.orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  var slot = await db.pickUpSlot.create({
    data: {
      date: request.deliverySlotDate,
      slotStartTime: request.deliverySlotStartTime,
      slotEndTime: request.deliverySlotEndTime,
      orderCount: 1,
      status: PickUpSlotStatus.ACTIVE,
      branchId: request.branchId,
    },
  });

  console.log("slot created", slot);

  if (order.promotionCode) {
    var coupon = await db.coupon.findFirst({
      where: {
        code: order.promotionCode,
      },
    });

    if (coupon) {
      console.log("coupon found", coupon);
      await db.coupon.update({
        where: {
          id: coupon.id,
        },
        data: {
          usedCount: coupon.usedCount + 1,
        },
      });
    }
  }

  await db.order.update({
    where: {
      id: request.orderId,
    },
    data: {
      status: OrderStatus.ORDERPLACED,
      pickUpSlotId: slot.id,
      createdAt: new Date(),
    },
  });

  console.log("order updated");
}

export type OrderPickUpRequest = {
  orderId: string;
};

export async function pickUpOrder(request: OrderPickUpRequest) {
  var order = await db.order.findFirst({
    where: {
      id: request.orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status !== OrderStatus.READY) {
    throw new Error("Order is not ready for pick up");
  }

  await db.order.update({
    where: {
      id: request.orderId,
    },
    data: {
      status: OrderStatus.PICKED,
      pickupDate: new Date(),
    },
  });

  return order;
}

export type OrderCancelRequest = {
  orderId: string;
};

export async function cancelOrder(request: OrderCancelRequest) {
  var order = await db.order.findFirst({
    where: {
      id: request.orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status !== OrderStatus.ORDERPLACED) {
    throw new Error("Order is not available to cancel");
  }

  await db.order.update({
    where: {
      id: request.orderId,
    },
    data: {
      status: OrderStatus.CANCELLED,
      cancelledAt: new Date(),
      cancelledReason: "Customer requested",
    },
  });

  return order;
}

export async function cancelOrderByCode(orderCode: string) {
  var order = await db.order.findFirst({
    where: {
      orderCode: orderCode,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  await db.order.update({
    where: {
      id: order.id,
    },
    data: {
      status: OrderStatus.CANCELLED,
    },
  });

  return order;
}

export async function acceptOrder(orderId: string) {
  var order = await db.order.findFirst({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.PREPARING,
    },
  });

  return order;
}

export async function rejectOrder(orderId: string) {
  var order = await db.order.findFirst({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.REJECTED,
    },
  });

  return order;
}

export async function completeOrder(orderId: string) {
  var order = await db.order.findFirst({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.READY,
    },
  });

  return order;
}
