'use client';
import Link from "next/link";
import { useCart } from "./useCart";

export default function CartButton() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <Link
      href="/cart"
      className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full px-4 py-2 shadow-lg"
    >
      Cart ({count})
    </Link>
  );
}
