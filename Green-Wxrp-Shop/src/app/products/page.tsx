"use client"
import React, { useState } from "react";
import ProductList from "@/features/products/ProductList";
import { CartProvider } from "@/features/cart/CartContext";
import FloatingCartButton from "@/features/cart/FloatingCartButton";
import CartDrawer from "@/features/cart/CartDrawer";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  return (
    <CartProvider>
      <div className="min-h-screen">
        <h1 className="text-xl font-bold p-4">สินค้า</h1>
        <ProductList />
        <FloatingCartButton onClick={() => setOpen(true)} />
        <CartDrawer open={open} onClose={() => setOpen(false)} />
      </div>
    </CartProvider>
  );
}
