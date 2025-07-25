import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../products/types";
import { addItem, removeItem } from "./cartUtils.js";

export type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartState | undefined>(undefined);
const LS_KEY = "cart-items";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cached = localStorage.getItem(LS_KEY);
    if (cached) setItems(JSON.parse(cached));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(product: Product) {
    setItems((prev) => addItem(prev, product));
  }

  function removeFromCart(id: string) {
    setItems((prev) => removeItem(prev, id));
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
