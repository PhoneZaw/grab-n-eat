import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderDetailById } from "@/services/order/orderRead";
import CheckoutForm from "./checkoutForm";
import { getAvailableSlot as getAvailableSlots } from "@/services/openHour/slotRead";
import { getClientAuth } from "@/lib/getSession";

export default async function CheckoutPage({
  params,
}: {
  params: { orderId: string };
}) {
  const user = await getClientAuth("/checkout/" + params.orderId);

  const order = await getOrderDetailById(params.orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const availableSlots = await getAvailableSlots(order.branch.id);

  if (availableSlots == null) {
    throw new Error("Current Restaurant is not available for order");
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-2 justify-center">
        <CheckoutForm order={order} availableSlots={availableSlots} />
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Your order from</CardTitle>
            <p className="text-sm font-medium">{order.branch.name}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">
                      {item.quantity} x {item.branchMenu.name}
                    </p>
                    <div className="text-sm ml-6 text-gray-500">
                      {item.specialInstruction}
                    </div>
                  </div>
                  <p className="font-medium">{item.unitPrice} MMK</p>
                </div>
              ))}
              <div className="flex justify-between pt-4 border-t">
                <p className="font-medium">Subtotal</p>
                <p className="font-medium">{order.TotalPrice} MMK</p>
              </div>
              {order.promotionCode && (
                <div className="flex justify-between text-green-400">
                  <p className="font-medium">
                    Discount <b> ({order.promotionCode})</b>
                  </p>
                  <p className="font-medium">
                    {" "}
                    - {order.promotionDiscount} MMK
                  </p>
                </div>
              )}
              <div className="flex justify-between pt-4 border-t text-lg font-bold">
                <p>Total</p>
                <p>{order.Total} MMK</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
