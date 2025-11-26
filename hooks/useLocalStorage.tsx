// get and set local storage

import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export type RestaurantCart = {
  restaurantId: string;
  items: CartItem[];
};

export type CartItem = {
  menuId: string;
  specialInstruction?: string;
  quantity: number;
};

const CART_UPDATED_EVENT = "cartUpdated";

export function useRestaurantCart(restaurantId: string) {
  const [cart, setCart] = useLocalStorage<RestaurantCart>(`cart`, {
    restaurantId,
    items: [],
  });

  const updateCartAndNotify = (newCart: RestaurantCart) => {
    setCart(newCart);
    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent(CART_UPDATED_EVENT, {
        detail: newCart,
      })
    );
  };

  return {
    cart,
    addItemQuantity: (cartItem: CartItem) => {
      console.log("add item quantity", cartItem);
      var item = cart.items.find((item) => item.menuId === cartItem.menuId);

      if (item) {
        item.quantity += cartItem.quantity;
      } else {
        cart.items.push(cartItem);
      }
      updateCartAndNotify({
        ...cart,
        items: [...cart.items],
      });
    },
    removeItemQuantity: (menuId: string) => {
      console.log("remove item quantity", menuId);
      var item = cart.items.find((item) => item.menuId === menuId);

      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          cart.items = cart.items.filter((item) => item.menuId !== menuId);
        }
      }

      updateCartAndNotify({
        ...cart,
        items: [...cart.items],
      });
    },
    clearItems: () => {
      console.log("clear items");
      updateCartAndNotify({
        ...cart,
        items: [],
      });
    },
    setCart: updateCartAndNotify,
  };
}

export function useExistingCart() {
  const [cart, setCart] = useLocalStorage<RestaurantCart | null>(`cart`, null);

  useEffect(() => {
    const handleCartUpdate = (e: CustomEvent<RestaurantCart>) => {
      setCart(e.detail);
    };

    window.addEventListener(
      CART_UPDATED_EVENT,
      handleCartUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        CART_UPDATED_EVENT,
        handleCartUpdate as EventListener
      );
    };
  }, [setCart]);

  return cart;
}
