"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import MenuDetail from "./menuDetail";
import { BranchMenuCardResponse } from "@/services/branchMenu/BranchMenuList";
import { CartItem } from "@/hooks/useLocalStorage";

export default function MenuDetailDialog({
  isOpen,
  setIsOpen,
  menuCard,
  itemQuantities,
  addItemQuantities,
  removeItemQuantities,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  menuCard: BranchMenuCardResponse;
  itemQuantities: { menuId: string; quantity: number }[];
  addItemQuantities: (cartItem: CartItem) => void;
  removeItemQuantities: (id: string) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 pb-4">
        <MenuDetail
          menuCard={menuCard}
          setIsOpen={setIsOpen}
          itemQuantities={itemQuantities}
          addItemQuantities={addItemQuantities}
        />
      </DialogContent>
    </Dialog>
  );
}
