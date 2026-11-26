import { Minus, Plus, Trash2, ShoppingBag, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatINR } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { advanceOrderStatus, createOrder, getOrder, STATUS_FLOW, STATUS_LABEL, type Order } from "@/lib/orders";

export function CartSheet() {
  const { lines, setQty, remove, clear, total, count } = useCart();
  const { lang, t } = useI18n();
  const [table, setTable] = useState("");
  const [open, setOpen] = useState(false);
  const [placed, setPlaced] = useState<Order | null>(null);

  // Item-wise savings
  const savings = lines.reduce((s, l) => {
    const orig = l.item.originalPrice ?? l.item.price;
    return s + Math.max(0, orig - l.item.price) * l.qty;
  }, 0);
  const originalTotal = total + savings;

  // Status polling — simulates kitchen progress every 4s
  useEffect(() => {
    if (!placed) return;
    const tick = () => {
      const fresh = getOrder(placed.id);
      if (!fresh) return;
      if (fresh.status !== STATUS_FLOW[STATUS_FLOW.length - 1]) advanceOrderStatus(placed.id);
      setPlaced(getOrder(placed.id));
    };
    const i = setInterval(tick, 4000);
    return () => clearInterval(i);
  }, [placed]);

  const placeOrder = () => {
    if (!table.trim()) { toast.error(t("needTable")); return; }
    if (lines.length === 0) return;
    const order = createOrder(table.trim(), lines, total);
    setPlaced(order);
    clear();
    setTable("");
    toast.success("Order placed!");
  };

  const statusIdx = placed ? STATUS_FLOW.indexOf(placed.status) : -1;

  return (
    <Sheet open={open} onOpenChange={(o) => { setOpen(o); if (!o) setPlaced(null); }}>
      <SheetTrigger asChild>
        <Button size="lg" className="fixed bottom-6 right-6 z-40 rounded-full shadow-glow gap-2 h-14 px-6">
          <ShoppingBag className="h-5 w-5" />
          <span className="font-medium">{t("cart")}</span>
          {count > 0 && (
            <span className="ml-1 rounded-full bg-gold text-foreground/90 px-2 py-0.5 text-xs font-semibold">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="font-display text-2xl">{t("yourOrder")}</SheetTitle>
        </SheetHeader>

        {placed ? (
          <div className="flex-1 overflow-auto px-6 py-6">
            <div className="rounded-2xl border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> {t("orderConfirmed")}
              </div>
              <div className="font-display text-3xl mt-1">{placed.id}</div>
              <div className="mt-2 text-sm">{t("table")} <span className="font-semibold">{placed.table}</span></div>

              {/* Status tracker */}
              <div className="mt-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{t("status")}</div>
                <div className="space-y-2">
                  {STATUS_FLOW.map((s, i) => {
                    const done = i <= statusIdx;
                    const active = i === statusIdx;
                    return (
                      <div key={s} className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full ${done ? "bg-gold" : "bg-muted"} ${active ? "ring-4 ring-gold/30 animate-pulse" : ""}`} />
                        <span className={`text-sm ${done ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                          {STATUS_LABEL[s][lang]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {placed.items.map((i) => (
                  <div key={i.id} className="flex justify-between text-sm">
                    <span>{i.qty} × {i.name}</span>
                    <span className="tabular-nums text-muted-foreground">{formatINR(i.qty * i.price)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t flex justify-between font-display text-xl">
                <span>{t("total")}</span><span>{formatINR(placed.total)}</span>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">{t("thankYou")}</p>
            </div>
            <Button className="w-full mt-6" variant="outline" onClick={() => { setPlaced(null); setOpen(false); }}>
              {t("close")}
            </Button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex-1 grid place-items-center px-6 text-center">
            <div>
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">{t("emptyCart")}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto px-6 py-4 space-y-3">
              {lines.map((l) => {
                const orig = l.item.originalPrice;
                const lineSavings = orig ? (orig - l.item.price) * l.qty : 0;
                return (
                  <div key={l.item.id} className="flex gap-3 p-3 rounded-xl border bg-card">
                    <img src={l.item.image} alt={l.item.name} className="h-16 w-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <h4 className="font-medium truncate">{l.item.i18n?.name[lang] ?? l.item.name}</h4>
                        <button onClick={() => remove(l.item.id)} className="text-muted-foreground hover:text-destructive">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{formatINR(l.item.price)}</span>
                        {orig && <span className="line-through text-xs">{formatINR(orig)}</span>}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border">
                          <button onClick={() => setQty(l.item.id, l.qty - 1)} className="p-1.5 hover:bg-muted rounded-l-full">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-2 text-sm font-medium tabular-nums w-6 text-center">{l.qty}</span>
                          <button onClick={() => setQty(l.item.id, l.qty + 1)} className="p-1.5 hover:bg-muted rounded-r-full">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold tabular-nums">{formatINR(l.item.price * l.qty)}</div>
                          {lineSavings > 0 && (
                            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 tabular-nums">
                              −{formatINR(lineSavings)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 pt-2">
                <Trash2 className="h-3 w-3" /> {t("clearCart")}
              </button>
            </div>

            <div className="border-t p-6 space-y-4 bg-card/50">
              <div>
                <Label htmlFor="table" className="text-xs uppercase tracking-wider">{t("table")}</Label>
                <Input id="table" value={table} onChange={(e) => setTable(e.target.value)} placeholder="e.g. 12" className="mt-1.5" />
              </div>
              {savings > 0 && (
                <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-sm">
                  <span>{t("youSave")}</span>
                  <span className="tabular-nums font-semibold">{formatINR(savings)}</span>
                </div>
              )}
              <div className="flex justify-between font-display text-2xl">
                <span>{t("total")}</span>
                <div className="text-right">
                  <div className="tabular-nums">{formatINR(total)}</div>
                  {savings > 0 && (
                    <div className="text-sm text-muted-foreground line-through tabular-nums font-sans">
                      {formatINR(originalTotal)}
                    </div>
                  )}
                </div>
              </div>
              <Button size="lg" className="w-full bg-gradient-warm text-primary-foreground border-0 hover:opacity-90" onClick={placeOrder}>
                {t("placeOrder")}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
