"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { BranchDetailResponse } from "@/services/branch/branchList";
import { CartItem, RestaurantCart } from "@/hooks/useLocalStorage";
import { OrderCreateRequest } from "@/services/order/orderCreate";
import { request, requestWithResponse } from "@/lib/request";
import { useRouter } from "next/navigation";

export type DetailCart = {
  branchId: string;
  orderItems: {
    id: string;
    branchId: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    quantity: number;
    specialInstruction: string | undefined;
  }[];
  totalPrice: number;
};

export default function Cart({
  restaurant,
  cart,
  addItemQuantities,
  removeItemQuantities,
  clearItems,
  customerId,
  isOpenHours,
}: {
  restaurant: BranchDetailResponse;
  cart: RestaurantCart;
  addItemQuantities: (cartItem: CartItem) => void;
  removeItemQuantities: (id: string) => void;
  clearItems: () => void;
  customerId: string;
  isOpenHours: boolean | undefined;
}) {
  const router = useRouter();
  function getDetailCart(
    restaurant: BranchDetailResponse,
    cart: RestaurantCart
  ) {
    var items = cart.items.map((item) => {
      var data = restaurant.menus.find((menu) => menu.id === item.menuId) ?? {
        id: "",
        branchId: "",
        name: "",
        description: "",
        imageUrl: "",
        price: 0,
        quantity: 0,
        specialInstruction: "",
      };

      return {
        ...data,
        quantity: item.quantity,
        specialInstruction: item.specialInstruction,
      };
    });
    return {
      branchId: restaurant.id,
      orderItems: items,
      totalPrice: items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };
  }

  const [detailCart, setDetailCart] = React.useState<DetailCart>(
    getDetailCart(restaurant, cart)
  );

  useEffect(() => {
    setDetailCart(getDetailCart(restaurant, cart));
  }, [cart]);

  async function handleCartSubmit() {
    console.log("Cart submitted");

    const order: OrderCreateRequest = {
      customerId: customerId,
      branchId: detailCart.branchId,
      orderItems: detailCart.orderItems.map((item) => {
        return {
          branchMenuId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
          specialInstruction: item.specialInstruction,
        };
      }),
    };

    var response = await requestWithResponse("/api/order", "POST", order);

    clearItems();

    router.push("/ui/checkout/" + response.orderId);

    router.refresh();
  }

  return (
    <Card className="max-w-md mx-auto min-h-[600px] flex flex-col justify-between w-[360px]">
      <CardContent className="">
        <div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Cart{" "}
              <span className={"text-base font-semibold"}>
                {" "}
                {!isOpenHours && "(Order For NextDay)"}
              </span>
            </h2>
            <h2 className="text-xl font-bold mb-4">Your items</h2>

            <div className="flex flex-col gap-4">
              {detailCart && detailCart.orderItems.length > 0 ? (
                detailCart.orderItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <img
                      alt="Product image"
                      className="w-16 h-16 rounded-md object-cover mr-4"
                      height="64"
                      src={item.imageUrl ?? "/placeholder.png"}
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width="64"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.specialInstruction}
                      </p>
                      <div className="flex items-center justify-between mt-2 gap-4">
                        <p className="flex justify-center items-center">
                          <span className="font-bold text-sm text-[#FF6B35]">
                            {item.price} MMK
                          </span>
                          {/* <span className="text-sm line-through text-gray-500">
                            {item.unitPrice} MMK
                          </span> */}
                        </p>

                        <div className="flex items-center border rounded-full">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-l-full"
                            onClick={() => {
                              removeItemQuantities(item.id);
                            }}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-r-full"
                            onClick={() => {
                              addItemQuantities({
                                menuId: item.id,
                                quantity: 1,
                              });
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>There is no item in cart</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>{detailCart ? detailCart.totalPrice : 0} MMK</span>
            </div>
          </div>
          <Button
            className="w-full mt-6 bg-first hover:bg-first-darker text-white"
            disabled={detailCart?.orderItems.length === 0}
            onClick={handleCartSubmit}
          >
            Review payment and time
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
