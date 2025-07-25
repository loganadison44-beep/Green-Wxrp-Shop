"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("");

  // Load products from localStorage and fetch latest from Google Sheets
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cached = localStorage.getItem("products");
    if (cached) {
      try {
        setProducts(JSON.parse(cached));
      } catch {
        // ignore parse errors
      }
    }

    const sheetId = process.env.NEXT_PUBLIC_SHEET_ID;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!sheetId || !apiKey) return;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Products?key=${apiKey}`;

    async function load() {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (!data.values) return;
        const rows = data.values.slice(1); // skip header
        const list: Product[] = rows.map((r: string[]) => ({
          id: r[0],
          name: r[1],
          price: parseFloat(r[2] || "0"),
          category: r[3] || "",
          image: r[4] || "",
          inStock: (r[5] || "").toLowerCase() !== "0",
        }));
        setProducts(list);
        localStorage.setItem("products", JSON.stringify(list));
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    }

    load();
  }, []);

  const displayed = filter
    ? products.filter((p) =>
        p.category.toLowerCase().includes(filter.toLowerCase())
      )
    : products;

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="ค้นหาหมวดหมู่"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-xs"
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {displayed.map((p) => (
          <div key={p.id} className="border rounded shadow p-4 flex flex-col">
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-cover mb-2 rounded"
              />
            )}
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-500 mb-1">หมวดหมู่: {p.category}</p>
            <p className="font-medium mb-2">ราคา {p.price} บาท</p>
            <p
              className={
                p.inStock ? "text-green-600" : "text-red-600"
              }
            >
              {p.inStock ? "มีสต็อก" : "หมดสต็อก"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
