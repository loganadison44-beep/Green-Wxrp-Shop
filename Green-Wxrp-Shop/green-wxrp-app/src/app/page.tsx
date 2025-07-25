'use client';
import { useEffect, useState } from 'react';
import { useCart } from '@/features/cart/useCart';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Herbal Tea', price: 50, stock: 10 },
  { id: '2', name: 'Lime Drink', price: 40, stock: 5 },
  { id: '3', name: 'Ginger Shot', price: 30, stock: 8 },
];

export default function Home() {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const { addItem } = useCart();

  useEffect(() => {
    // Here you could fetch products from Google Sheets
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Products</h1>
      {products.map((p) => (
        <div key={p.id} className="flex gap-4 items-center">
          <span className="flex-1">
            {p.name} - ฿{p.price}
          </span>
          <button
            onClick={() => addItem({ id: p.id, name: p.name, price: p.price })}
            className="bg-green-600 text-white px-2 py-1 rounded"
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
