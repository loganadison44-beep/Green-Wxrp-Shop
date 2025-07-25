import React from "react";
import { useCart } from "./CartContext";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeFromCart } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end" onClick={onClose}>
      <div className="bg-white w-80 h-full p-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">ตะกร้าสินค้า</h2>
        <ul className="space-y-2 overflow-y-auto h-[calc(100%-60px)]">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.name} x {item.quantity}</span>
              <button className="text-red-500" onClick={() => removeFromCart(item.id)}>ลบ</button>
            </li>
          ))}
        </ul>
        <button className="mt-4 w-full bg-green-500 text-white p-2" onClick={onClose}>ปิด</button>
      </div>
    </div>
  );
}
