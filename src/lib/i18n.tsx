import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/data/menu";

const KEY = "savor_lang";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

const STRINGS = {
  search: { en: "Search dishes, ingredients…", hi: "व्यंजन या सामग्री खोजें…", es: "Buscar platos, ingredientes…" },
  all: { en: "All", hi: "सभी", es: "Todos" },
  addToOrder: { en: "Add to order", hi: "ऑर्डर में जोड़ें", es: "Añadir al pedido" },
  cart: { en: "Cart", hi: "कार्ट", es: "Carrito" },
  yourOrder: { en: "Your Order", hi: "आपका ऑर्डर", es: "Tu Pedido" },
  emptyCart: { en: "Your cart is empty.", hi: "आपका कार्ट खाली है।", es: "Tu carrito está vacío." },
  table: { en: "Table number", hi: "टेबल नंबर", es: "Número de mesa" },
  total: { en: "Total", hi: "कुल", es: "Total" },
  youSave: { en: "You save", hi: "आपकी बचत", es: "Ahorras" },
  placeOrder: { en: "Place Order", hi: "ऑर्डर करें", es: "Realizar Pedido" },
  clearCart: { en: "Clear cart", hi: "कार्ट खाली करें", es: "Vaciar carrito" },
  orderConfirmed: { en: "Order confirmed", hi: "ऑर्डर पुष्टि", es: "Pedido confirmado" },
  thankYou: { en: "Thank you. Your order is on its way.", hi: "धन्यवाद। आपका ऑर्डर तैयार किया जा रहा है।", es: "Gracias. Tu pedido está en camino." },
  status: { en: "Status", hi: "स्थिति", es: "Estado" },
  close: { en: "Close", hi: "बंद करें", es: "Cerrar" },
  orders: { en: "Orders", hi: "ऑर्डर्स", es: "Pedidos" },
  exportCsv: { en: "Export CSV", hi: "CSV निर्यात करें", es: "Exportar CSV" },
  noOrders: { en: "No orders yet.", hi: "अभी तक कोई ऑर्डर नहीं।", es: "Aún no hay pedidos." },
  qrTitle: { en: "Scan to view menu", hi: "मेनू देखने के लिए स्कैन करें", es: "Escanea para ver el menú" },
  language: { en: "Language", hi: "भाषा", es: "Idioma" },
  needTable: { en: "Please enter your table number", hi: "कृपया टेबल नंबर दर्ज करें", es: "Introduce el número de mesa" },
  added: { en: "added", hi: "जोड़ा गया", es: "añadido" },
  off: { en: "off", hi: "छूट", es: "dto." },
} as const;

export type StringKey = keyof typeof STRINGS;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: StringKey) => string }>({
  lang: "en", setLang: () => {}, t: (k) => STRINGS[k].en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) as Lang | null);
    if (stored) setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(KEY, l);
  };

  const t = (k: StringKey) => STRINGS[k][lang] ?? STRINGS[k].en;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
