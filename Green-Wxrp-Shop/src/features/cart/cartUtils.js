export function addItem(items, product) {
  const existing = items.find((i) => i.id === product.id);
  if (existing) {
    return items.map((i) =>
      i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  }
  return [...items, { ...product, quantity: 1 }];
}

export function removeItem(items, id) {
  return items.filter((i) => i.id !== id);
}
