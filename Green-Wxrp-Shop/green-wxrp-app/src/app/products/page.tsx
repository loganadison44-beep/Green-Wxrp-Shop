import dynamic from "next/dynamic";

const ProductList = dynamic(() => import("../../features/products/ProductList"), {
  ssr: false,
});

export default function ProductsPage() {
  return (
    <main className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">สินค้า</h1>
      <ProductList />
    </main>
  );
}
