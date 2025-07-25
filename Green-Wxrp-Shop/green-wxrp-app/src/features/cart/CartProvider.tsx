'use client';
import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => Promise<void>;
  removeItem: (id: string) => void;
  updateItem: (id: string, qty: number) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CART_STORAGE_KEY = "cart";

async function validateStock(id: string, qty: number): Promise<boolean> {
  try {
    const { google } = await import("googleapis");
    const sheets = google.sheets({ version: "v4" });
    const sheetId = process.env.NEXT_PUBLIC_SHEET_ID;
    if (!sheetId) return true;
    const range = `Products!A2:E`;
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range });
    const rows = res.data.values || [];
    const row = rows.find((r) => r[0] === id);
    if (!row) return true;
    const stock = parseInt(row[4] as string, 10);
    return qty <= stock;
  } catch {
    // fail open
    return true;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) setItems(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = async (item: Omit<CartItem, "quantity">, qty = 1) => {
    const existing = items.find((i) => i.id === item.id);
    const newQty = (existing?.quantity || 0) + qty;
    if (!(await validateStock(item.id, newQty))) return;
    if (existing) {
      setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, quantity: newQty } : p)));
    } else {
      setItems((prev) => [...prev, { ...item, quantity: qty }]);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateItem = async (id: string, qty: number) => {
    if (!(await validateStock(id, qty))) return;
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartProvider missing");
  return ctx;
}
