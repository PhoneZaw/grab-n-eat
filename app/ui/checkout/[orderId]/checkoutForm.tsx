"use client";

import {
  MapPinIcon,
  CreditCardIcon,
  ClockIcon,
  CalendarIcon,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Voucher } from "../voucher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderDetailResponse } from "@/services/order/orderRead";
import { useEffect, useState } from "react";
import { SlotResponse } from "@/services/openHour/slotRead";
import { parseDateToTimeString } from "@/lib/utils";
import { request } from "@/lib/request";
import { OrderCheckoutRequest } from "@/services/order/orderUpdate";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  OrderEmailTemplate,
  orderEmailTemplate,
} from "@/lib/orderEmailTemplate";
import { sendMail } from "@/lib/mailService";
import { format } from "date-fns";
import { ne } from "@faker-js/faker";

export default function CheckoutForm({
  order,
  availableSlots,
}: {
  order: OrderDetailResponse;
  availableSlots: SlotResponse[];
}) {
  const router = useRouter();
  const dateOptions = Array.from(
    new Set(availableSlots.map((slot) => slot.date.toDateString()))
  ).map((date) => ({
    value: date,
    label: date,
  }));

  var todaySlots = availableSlots.filter(
    (s) => s.date.toDateString() === new Date().toDateString()
  );

  // console.log("TodayDates", todaySlots);

  var filteredTodaySlots = todaySlots.filter((s) => {
    var date = new Date(
      availableSlots[0].date.getFullYear(),
      availableSlots[0].date.getMonth(),
      availableSlots[0].date.getDate(),
      availableSlots[0].slotStartTime.getHours(),
      availableSlots[0].slotStartTime.getMinutes()
    );

    return date.toLocaleString() > new Date().toLocaleString();
  });

  console.log(
    "Get Date",
    new Date(
      availableSlots[0].date.getFullYear(),
      availableSlots[0].date.getMonth(),
      availableSlots[0].date.getDate(),
      availableSlots[0].slotStartTime.getHours(),
      availableSlots[0].slotStartTime.getMinutes()
    )
  );

  console.log("FilteredTodaySlots", filteredTodaySlots);

  const [slotOptions, setSlotOptions] = useState(
    availableSlots.map((slot, index) => ({
      value: index.toString(),
      label: `${parseDateToTimeString(
        slot.slotStartTime
      )} - ${parseDateToTimeString(slot.slotEndTime)}`,
      ...slot,
    }))
  );

  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();

  useEffect(() => {
    const selectedTimeSlot = availableSlots
      .filter((slot) => slot.date.toDateString() === selectedDate)
      .map((slot, index) => ({
        value: index.toString(),
        label: `${parseDateToTimeString(
          slot.slotStartTime
        )} - ${parseDateToTimeString(slot.slotEndTime)}`,
        ...slot,
      }));
    setSlotOptions(selectedTimeSlot);
  }, [selectedDate]);

  async function handleCheckout() {
    console.log("Checkout");

    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select a date and time slot");
      return;
    }

    var selectedSlot = slotOptions.find(
      (slot) => slot.value === selectedTimeSlot
    );

    if (!selectedSlot) {
      alert("Invalid time slot");
      return;
    }

    var response = await request("/api/order/checkout", "POST", {
      orderId: order.id,
      date: selectedDate,
      slot: selectedTimeSlot,
      branchId: order.branch.id,
      deliverySlotDate: selectedSlot.date,
      deliverySlotStartTime: selectedSlot.slotStartTime,
      deliverySlotEndTime: selectedSlot.slotEndTime,
    } as OrderCheckoutRequest);

    toast({
      title: "Order placed",
      description: "Your order has been placed successfully",
    });

    await request("/api/sendMail/orderConfirm", "POST", {
      orderCode: order.orderCode,
      orderDate: format(order.createdAt, "dd/MM/yyyy"),
      customerName: order.customer.name,
      customerEmail: order.customer.email,
      total: order.Total,
      orderItems: order.orderItems.map((item) => ({
        name: item.branchMenu.name,
        quantity: item.quantity,
        price: item.branchMenu.price,
      })),
    } as OrderEmailTemplate);

    router.push("/ui/order?orderCode=" + order.orderCode);

    router.refresh();
  }

  return (
    <div className="space-y-6 max-w-2xl order-last lg:-order-last">
      <Card>
        <CardHeader>
          <CardTitle>Pick-up at</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-2">
            <MapPinIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">{order.branch.name}</h3>
              <p className="text-sm text-muted-foreground">
                {order.branch.fullAddress}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.branch.contactNumber}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pick-up options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="pickup-slot">Select a pickup slot</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Select onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a date">
                      {selectedDate ? (
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {
                            dateOptions.find(
                              (option) => option.value === selectedDate
                            )?.label
                          }
                        </div>
                      ) : (
                        "Select a date"
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {dateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Select
                  onValueChange={setSelectedTimeSlot}
                  disabled={selectedDate == undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot">
                      {selectedDate && selectedTimeSlot ? (
                        <div className="flex items-center">
                          <ClockIcon className="mr-2 h-4 w-4" />
                          {
                            slotOptions.find(
                              (option) => option.value === selectedTimeSlot
                            )?.label
                          }
                        </div>
                      ) : (
                        "Select a time slot"
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {slotOptions.map((slot, index) => (
                      <SelectItem key={index} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>{order.customer.name}</p>
            <p className="text-sm text-muted-foreground">
              {order.customer.email}
            </p>
            {order.customer.phone && (
              <p className="text-sm text-muted-foreground">
                {order.customer.phone}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Voucher orderId={order.id} couponCode={order.promotionCode} />

      {/* <StripePaymentComponent /> */}
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="cashOnPickup">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cashOnPickup" id="cashOnPickup" />
              <Label htmlFor="cashOnPickup" className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-2" />
                Cash on pickup
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center">
                <CreditCardIcon className="h-4 w-4 mr-2" />
                Credit or Debit Card
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      <Button
        className="w-full mt-6 bg-first hover:bg-first-darker"
        onClick={handleCheckout}
      >
        Place order
      </Button>
      <p className="text-sm text-muted-foreground text-center mt-4">
        By making this purchase you agree to our terms and conditions.
      </p>
    </div>
  );
}
