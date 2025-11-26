"use client";

import { Clock, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderResponse } from "@/services/order/orderRead";
import { OrderStatus } from "@prisma/client";
import { useRouter } from "next/navigation";

const OrderCard = ({
  order,
  isActive = false,
}: {
  order: OrderResponse;
  isActive?: boolean;
}) => {
  const router = useRouter();
  return (
    <Card
      className="mb-4 hover:cursor-pointer hover:border hover:border-gray-400"
      onClick={() => router.push(`/ui/order?orderCode=${order.orderCode}`)}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {order.branch.name}
        </CardTitle>
        <CardDescription>
          {isActive ? (
            <span className="text-green-500 font-semibold">{order.status}</span>
          ) : (
            <div className="flex flex-col justify-end gap-2">
              <span className="font-semibold">{order.status}</span>
              <span>{order.createdAt.toLocaleDateString()}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold">{order.Total} MMK</p>
            <p className="text-sm text-muted-foreground">
              {order.orderItems.length} items
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function OrderHistory({
  ordersList,
}: {
  ordersList: OrderResponse[];
}) {
  const activeOrders = ordersList.filter(
    (order) =>
      order.status === OrderStatus.ORDERPLACED ||
      order.status === OrderStatus.PREPARING ||
      order.status === OrderStatus.READY
  );

  const pastOrders = ordersList.filter(
    (order) => activeOrders.indexOf(order) === -1
  );

  return (
    <div className="mx-auto px-4 py-8 max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2" /> Active Orders
          </h2>

          <ScrollArea className="h-[420px] w-full rounded-md border p-4">
            {activeOrders.map((order) => (
              <OrderCard key={order.id} order={order} isActive={true} />
            ))}
          </ScrollArea>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Package className="mr-2" /> Past Orders
          </h2>
          <ScrollArea className="h-[420px] w-full rounded-md border p-4">
            {pastOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ScrollArea>
        </section>
      </div>
    </div>
  );
}
