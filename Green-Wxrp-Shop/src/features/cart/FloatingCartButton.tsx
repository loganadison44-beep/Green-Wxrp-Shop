import React from "react";
import { useCart } from "./CartContext";

export default function FloatingCartButton({ onClick }: { onClick: () => void }) {
  const { items } = useCart();
  const total = items.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-4 shadow-lg"
    >
      ตะกร้า ({total})
    </button>
  );
}
