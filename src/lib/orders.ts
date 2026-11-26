import type { MenuItem } from "@/data/menu";

export type OrderStatus = "received" | "preparing" | "ready" | "served";

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  table: string;
  total: number;
  items: OrderItem[];
  createdAt: string;
  status: OrderStatus;
}

const KEY = "savor_orders_v2";

export const STATUS_FLOW: OrderStatus[] = ["received", "preparing", "ready", "served"];
export const STATUS_LABEL: Record<OrderStatus, { en: string; hi: string; es: string }> = {
  received: { en: "Received", hi: "प्राप्त", es: "Recibido" },
  preparing: { en: "Preparing", hi: "तैयार हो रहा है", es: "Preparando" },
  ready: { en: "Ready to serve", hi: "परोसने के लिए तैयार", es: "Listo para servir" },
  served: { en: "Served", hi: "परोसा गया", es: "Servido" },
};

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(KEY, JSON.stringify(orders));
}

export function createOrder(table: string, lines: { item: MenuItem; qty: number }[], total: number): Order {
  const order: Order = {
    id: "ORD-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    table,
    total,
    items: lines.map((l) => ({ id: l.item.id, name: l.item.name, qty: l.qty, price: l.item.price })),
    createdAt: new Date().toISOString(),
    status: "received",
  };
  const all = getOrders();
  all.push(order);
  saveOrders(all);
  return order;
}

/** Simulate kitchen progress: advance status one step on every call */
export function advanceOrderStatus(id: string): OrderStatus | null {
  const all = getOrders();
  const idx = all.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  const cur = all[idx].status;
  const i = STATUS_FLOW.indexOf(cur);
  if (i < STATUS_FLOW.length - 1) {
    all[idx].status = STATUS_FLOW[i + 1];
    saveOrders(all);
  }
  return all[idx].status;
}

export function getOrder(id: string): Order | null {
  return getOrders().find((o) => o.id === id) ?? null;
}

export function ordersToCsv(orders: Order[]): string {
  const header = ["Order ID", "Table", "Created At", "Status", "Item", "Qty", "Unit Price (INR)", "Line Total (INR)", "Order Total (INR)"];
  const rows: string[][] = [];
  for (const o of orders) {
    for (const it of o.items) {
      rows.push([
        o.id, o.table, o.createdAt, o.status,
        it.name, String(it.qty), it.price.toFixed(2),
        (it.qty * it.price).toFixed(2), o.total.toFixed(2),
      ]);
    }
  }
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [header, ...rows].map((r) => r.map(escape).join(",")).join("\n");
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
