import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartItem = { id: string; qty: number };

type CartCtx = {
  items: CartItem[];
  detailed: { product: Product; qty: number }[];
  count: number;
  total: number;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "lumen-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add = (id: string) =>
    setItems(prev => {
      const ex = prev.find(i => i.id === id);
      return ex ? prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { id, qty: 1 }];
    });
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems(prev => qty <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty } : i));
  const clear = () => setItems([]);

  const detailed = items
    .map(i => ({ product: products.find(p => p.id === i.id)!, qty: i.qty }))
    .filter(x => x.product);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = detailed.reduce((s, x) => s + x.product.price * x.qty, 0);

  return <Ctx.Provider value={{ items, detailed, count, total, add, remove, setQty, clear }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
