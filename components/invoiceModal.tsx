"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Car, PrinterIcon, X } from "lucide-react";
import { OrderResponse } from "@/services/order/orderRead";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceProps {
  order: OrderResponse | undefined;
  selectedOrderId: string | null;
  setSelectedOrderId: (orderId: string | null) => void;
}

export default function InvoiceModal({
  order,
  selectedOrderId,
  setSelectedOrderId,
}: InvoiceProps) {
  const [isOpen, setIsOpen] = useState(selectedOrderId ? true : false);
  const subtotal = order?.orderItems
    ? order.orderItems.reduce(
        (acc, item) => acc + item.quantity * item.unitPrice,
        0
      )
    : 0;
  const total = subtotal - (order?.promotionDiscount || 0);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) =>
        open ? setSelectedOrderId(selectedOrderId) : setSelectedOrderId(null)
      }
    >
      <DialogTrigger asChild>
        <Button variant="outline">View Invoice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[700px]">
        <Card className="w-full border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Invoice</CardTitle>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => window && window.print()}
              >
                <PrinterIcon className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </CardHeader>
          {order ? (
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="font-semibold">Order Details</h2>
                  <p className="text-sm text-muted-foreground">
                    Order #: {order.orderCode}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Date: {order.createdAt.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <h2 className="font-semibold">Customer</h2>
                  <p className="text-sm text-muted-foreground">
                    {order.customerName}
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="max-h-[300px] overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Item</th>
                      <th className="py-2 text-right">Qty</th>
                      <th className="py-2 text-right">Price</th>
                      <th className="py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems &&
                      order.orderItems.map((item, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-2">{item.branchMenu.name}</td>
                          <td className="py-2 text-right">{item.quantity}</td>
                          <td className="py-2 text-right">
                            {item.unitPrice} MMK
                          </td>
                          <td className="py-2 text-right">
                            {item.quantity * item.unitPrice} MMK
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Car className="h-12 w-12 text-gray-400" />
                <p className="text-gray-400">No order selected</p>
              </div>
            </CardContent>
          )}
          <CardFooter>
            <div className="w-full">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal} MMK</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{total} MMK</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
