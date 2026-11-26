import { useCallback, useEffect, useState } from "react";
import type { MenuItem } from "@/data/menu";

export interface CartLine {
  item: MenuItem;
  qty: number;
}

const KEY = "savor_cart_v1";

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    setLines(read());
    const onStorage = () => setLines(read());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: CartLine[]) => {
    setLines(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }, []);

  const add = useCallback((item: MenuItem) => {
    const cur = read();
    const idx = cur.findIndex((l) => l.item.id === item.id);
    if (idx >= 0) cur[idx].qty += 1;
    else cur.push({ item, qty: 1 });
    persist(cur);
  }, [persist]);

  const setQty = useCallback((id: string, qty: number) => {
    const cur = read().map((l) => (l.item.id === id ? { ...l, qty } : l)).filter((l) => l.qty > 0);
    persist(cur);
  }, [persist]);

  const remove = useCallback((id: string) => setQty(id, 0), [setQty]);
  const clear = useCallback(() => persist([]), [persist]);

  const total = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return { lines, add, setQty, remove, clear, total, count };
}
