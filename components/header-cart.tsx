"use client";

import { RestaurantCart, useExistingCart } from "@/hooks/useLocalStorage";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeaderCart() {
  const [cart, setCart] = useState<RestaurantCart | null>(null);
  const existingCart = useExistingCart(); // Move hook to component level

  useEffect(() => {
    if (existingCart && existingCart.items.length > 0) {
      setCart(existingCart);
    }
  }, [existingCart]);

  return (
    <Button variant="ghost" className="relative p-2">
      <Link
        href={
          cart && cart.items.length && cart.restaurantId
            ? `/ui/restaurant/${cart?.restaurantId}`
            : "#"
        }
      >
        <ShoppingCart className="h-6 w-6 text-[#004E64]" />
        {cart && cart.items.length > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-[#FF6B35] text-white hover:bg-[#FF6B35]">
            {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
