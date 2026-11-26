import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardList, Download, Trash2 } from "lucide-react";
import { downloadCsv, getOrders, ordersToCsv, saveOrders, STATUS_LABEL, type Order } from "@/lib/orders";
import { formatINR } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export function OrdersDialog() {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const { lang, t } = useI18n();

  useEffect(() => {
    if (!open) return;
    setOrders(getOrders());
    const i = setInterval(() => setOrders(getOrders()), 1500);
    return () => clearInterval(i);
  }, [open]);

  const exportCsv = () => {
    if (orders.length === 0) return;
    downloadCsv(`savor-orders-${new Date().toISOString().slice(0, 10)}.csv`, ordersToCsv(orders));
    toast.success("CSV downloaded");
  };

  const clearAll = () => {
    saveOrders([]);
    setOrders([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full gap-1.5">
          <ClipboardList className="h-4 w-4" />
          <span className="hidden sm:inline">{t("orders")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center justify-between gap-3">
            <span>{t("orders")} ({orders.length})</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={exportCsv} disabled={orders.length === 0} className="gap-1.5">
                <Download className="h-3.5 w-3.5" /> {t("exportCsv")}
              </Button>
              {orders.length > 0 && (
                <Button size="sm" variant="ghost" onClick={clearAll} className="gap-1.5 text-muted-foreground">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-auto -mx-6 px-6 space-y-3">
          {orders.length === 0 && <p className="text-center text-muted-foreground py-12">{t("noOrders")}</p>}
          {[...orders].reverse().map((o) => (
            <div key={o.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="font-display text-lg">{o.id}</div>
                  <div className="text-xs text-muted-foreground">
                    Table {o.table} · {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gold/20 text-foreground">
                  {STATUS_LABEL[o.status][lang]}
                </span>
              </div>
              <div className="mt-3 text-sm space-y-1">
                {o.items.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>{i.qty} × {i.name}</span>
                    <span className="tabular-nums text-muted-foreground">{formatINR(i.qty * i.price)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t flex justify-between font-medium">
                <span>{t("total")}</span>
                <span className="tabular-nums">{formatINR(o.total)}</span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
