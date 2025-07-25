import { useEffect, useState } from "react";
import type { Product } from "./types";
import { fetchProducts } from "./api";

const LS_KEY = "products-cache";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const cached = localStorage.getItem(LS_KEY);
        if (cached) setProducts(JSON.parse(cached));
        if (!navigator.onLine) throw new Error('offline');
        const data = await fetchProducts();
        setProducts(data);
        localStorage.setItem(LS_KEY, JSON.stringify(data));
        setError(null);
      } catch (err) {
        if (!products.length) {
          const cached = localStorage.getItem(LS_KEY);
          if (cached) setProducts(JSON.parse(cached));
        }
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { products, loading, error };
}
