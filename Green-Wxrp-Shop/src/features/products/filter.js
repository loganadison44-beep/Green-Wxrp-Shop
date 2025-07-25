export function filterProducts(products, query) {
  return products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
}
