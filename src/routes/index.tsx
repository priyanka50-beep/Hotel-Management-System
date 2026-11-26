import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Moon, Sun, Search, UtensilsCrossed } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CATEGORIES, CATEGORY_LABEL, MENU, type Category } from "@/data/menu";
import { MenuCard } from "@/components/MenuCard";
import { CartSheet } from "@/components/CartSheet";
import { QrDialog } from "@/components/QrDialog";
import { LangSwitcher } from "@/components/LangSwitcher";
import { OrdersDialog } from "@/components/OrdersDialog";
import { useTheme } from "@/hooks/use-theme";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Savor — Digital Menu & Ordering" },
      { name: "description", content: "Browse our seasonal menu, scan the QR, and order from your table." },
      { property: "og:title", content: "Savor — Digital Menu" },
      { property: "og:description", content: "A modern dining experience. Scan, browse, and order in seconds." },
    ],
  }),
  component: Index,
});

function Index() {
  const { theme, toggle } = useTheme();
  const { lang, t } = useI18n();
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MENU.filter((m) => active === "All" || m.category === active).filter((m) => {
      if (!q) return true;
      const name = (m.i18n?.name[lang] ?? m.name).toLowerCase();
      const desc = (m.i18n?.description[lang] ?? m.description).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [active, query, lang]);

  const grouped = useMemo(() => {
    const map = new Map<Category, typeof MENU>();
    filtered.forEach((m) => {
      const arr = map.get(m.category) ?? [];
      arr.push(m);
      map.set(m.category, arr);
    });
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />

      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-gold" />
            <span className="font-display text-xl tracking-tight">Savor</span>
          </div>
          <div className="flex items-center gap-1">
            <LangSwitcher />
            <OrdersDialog />
            <QrDialog />
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme" className="rounded-full">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-40 dark:opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-20 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold mb-4">Est. 2018 · Seasonal Kitchen</span>
          <h1 className="font-display text-5xl sm:text-7xl leading-[1.05]">
            A taste of <span className="text-gradient-gold italic">elegance</span><br />on every plate.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Browse our chef-curated menu, build your order, and we'll bring it straight to your table.
          </p>
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search")}
              className="pl-11 h-12 rounded-full bg-card shadow-soft border-border"
            />
          </div>
        </div>
      </section>

      <nav className="sticky top-16 z-20 bg-background/80 backdrop-blur-xl border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                active === c
                  ? "bg-foreground text-background shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {c === "All" ? t("all") : CATEGORY_LABEL[c][lang]}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 pb-32">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No dishes match your search.</p>
        )}
        {CATEGORIES.filter((c) => grouped.has(c)).map((cat) => (
          <section key={cat} className="mb-16">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-3xl sm:text-4xl">{CATEGORY_LABEL[cat][lang]}</h2>
              <div className="h-px flex-1 ml-6 bg-border" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {grouped.get(cat)!.map((item) => <MenuCard key={item.id} item={item} />)}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p className="font-display text-lg text-foreground">Savor</p>
        <p className="mt-1">12 Vintner's Lane · Open daily 11am–11pm</p>
      </footer>

      <CartSheet />
    </div>
  );
}
