import React, { useState } from "react";
import Image from "next/image";
import { useProducts } from "./useProducts";
import { filterProducts } from "./filter.js";
import type { Product } from "./types";

export default function ProductList() {
  const { products, loading, error } = useProducts();
  const [query, setQuery] = useState("");

  const filtered: Product[] = filterProducts(products, query);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="ค้นหา"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      {loading && <p>กำลังโหลด...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="border rounded p-2 flex flex-col items-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={150}
              height={150}
              className="object-cover"
            />
            <h3 className="mt-2 font-bold text-center">{product.name}</h3>
            <p className="text-sm text-gray-600">฿{product.price}</p>
            <p className={product.inStock ? "text-green-500" : "text-red-500"}>
              {product.inStock ? "มีสินค้า" : "หมด"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
