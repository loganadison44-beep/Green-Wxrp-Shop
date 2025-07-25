'use client';
import { useCart } from "@/features/cart/useCart";

export default function CartPage() {
  const { items, removeItem, updateItem } = useCart();

  const handleQtyChange = (id: string, qty: number) => {
    updateItem(id, qty);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Cart</h1>
      {items.length === 0 && <p>Cart empty</p>}
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 items-center">
          <span className="flex-1">{item.name}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value))}
            className="border px-2 py-1 w-20"
            min={1}
          />
          <button
            onClick={() => removeItem(item.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
