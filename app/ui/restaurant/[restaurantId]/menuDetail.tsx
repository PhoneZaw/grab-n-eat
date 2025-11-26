"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BranchMenuDetailResponse } from "@/services/branchMenu/BranchMenuList";
import { request, requestWithResponse } from "@/lib/request";
import { CartItem } from "@/hooks/useLocalStorage";

export default function MenuDetail({
  menuCard,
  setIsOpen,
  itemQuantities,
  addItemQuantities,
}: {
  menuCard: BranchMenuDetailResponse;
  setIsOpen: (value: boolean) => void;
  itemQuantities: { menuId: string; quantity: number }[];
  addItemQuantities: (cartItem: CartItem) => void;
}) {
  const [quantity, setQuantity] = useState(
    itemQuantities.find((item) => item.menuId === menuCard.id)?.quantity ?? 1
  );
  const [specialInstructions, setSpecialInstructions] = useState("");

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const [menuDetail, setMenuDetail] =
    useState<BranchMenuDetailResponse>(menuCard);

  useEffect(() => {
    async function fetchMenuDetail() {
      const response = await requestWithResponse(
        "/api/branchMenus/" + menuCard.id,
        "GET"
      );
      setMenuDetail(response);

      console.log("Menu detail", response);
    }

    fetchMenuDetail();

    console.log("fetching menu detail");
  }, []);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addItemQuantities({
      menuId: menuDetail.id,
      specialInstruction: specialInstructions,
      quantity,
    });

    setIsOpen(false);
  }

  return (
    <div>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="px-5 h-full">
          <img
            src={menuDetail.imageUrl ?? "/placeholder.png?height=300&width=600"}
            alt={menuDetail.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="space-y-6">
            <div>
              <p className="text-2xl font-bold">{menuDetail.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {menuDetail.description}
              </p>
            </div>

            <div className="text-3xl font-bold text-primary">
              {menuDetail.price} MMK
            </div>

            <div className="rounded-md">
              <h3 className="text-lg font-semibold mb-2">
                Special instructions
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Special requests are subject to the restaurant's approval. Tell
                us here!
              </p>
              <Textarea
                placeholder="e.g. No mayo"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
      <hr className="mb-4" />
      <form
        onSubmit={submitHandler}
        className="flex items-center justify-between gap-8 px-5"
      >
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <span onClick={decrementQuantity}>-</span>
          </Button>
          <span className="text-xl font-semibold">{quantity}</span>
          <Button variant="outline" size="icon" asChild>
            <span onClick={incrementQuantity}>+</span>
          </Button>
        </div>
        <Button type="submit" className="w-full bg-first hover:bg-first-darker">
          Add to cart
        </Button>
      </form>
    </div>
  );
}
