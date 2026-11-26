import { Plus } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/hooks/use-cart";
import { formatINR } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const { lang, t } = useI18n();
  const name = item.i18n?.name[lang] ?? item.name;
  const description = item.i18n?.description[lang] ?? item.description;
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;
  const savings = hasDiscount ? item.originalPrice! - item.price : 0;
  const pct = hasDiscount ? Math.round((savings / item.originalPrice!) * 100) : 0;

  return (
    <article className="group rounded-2xl overflow-hidden bg-card border shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={item.image}
          alt={name}
          loading="lazy"
          width={768}
          height={576}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {item.tag && (
          <span className="absolute top-3 left-3 bg-background/90 backdrop-blur text-xs font-medium px-2.5 py-1 rounded-full">
            {item.tag}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow-soft">
            {pct}% {t("off")}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{name}</h3>
          <div className="text-right whitespace-nowrap">
            <div className="font-display text-lg text-gold tabular-nums">{formatINR(item.price)}</div>
            {hasDiscount && (
              <div className="text-xs text-muted-foreground line-through tabular-nums">
                {formatINR(item.originalPrice!)}
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
        {hasDiscount && (
          <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {t("youSave")} {formatINR(savings)}
          </p>
        )}
        <button
          onClick={() => { add(item); toast.success(`${name} ${t("added")}`); }}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-2.5 text-sm font-medium transition-transform active:scale-95 hover:bg-primary"
        >
          <Plus className="h-4 w-4" /> {t("addToOrder")}
        </button>
      </div>
    </article>
  );
}
