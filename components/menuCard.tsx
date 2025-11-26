"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import MenuDetailDialog from "@/app/ui/restaurant/[restaurantId]/DialogComponent";
import { BranchMenuCardResponse } from "@/services/branchMenu/BranchMenuList";
import { CartItem } from "@/hooks/useLocalStorage";

export default function MenuCard({
  menu,
  itemQuantities,
  addItemQuantities,
  removeItemQuantities,
}: {
  menu: BranchMenuCardResponse;
  itemQuantities: { menuId: string; quantity: number }[];
  addItemQuantities: (cartItem: CartItem) => void;
  removeItemQuantities: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const itemQuantity = itemQuantities.find((item) => item.menuId === menu.id);

  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-end">
            <div className="flex items-start gap-6">
              <img
                src={menu.imageUrl ?? "/placeholder.png"}
                alt={menu.name}
                className="w-20 h-20 rounded-md object-cover"
              />
              <div>
                <h3 className="font-semibold">{menu.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {menu.description.slice(0, 40)}
                </p>
                <p className="mt-1">{menu.price} MMK</p>
              </div>
            </div>
            {itemQuantity ? (
              <div className="flex items-center border rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-l-full"
                  onClick={() => {
                    removeItemQuantities(menu.id);
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{itemQuantity.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-r-full"
                  onClick={() => {
                    addItemQuantities({
                      menuId: menu.id,
                      quantity: 1,
                    });
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <Button
                  size="icon"
                  className="ml-2  bg-first hover:bg-first-darker"
                  onClick={() => setIsOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <MenuDetailDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuCard={menu}
        itemQuantities={itemQuantities}
        addItemQuantities={addItemQuantities}
        removeItemQuantities={removeItemQuantities}
      />
    </div>
  );
}
