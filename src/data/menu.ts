import bruschetta from "@/assets/bruschetta.jpg";
import calamari from "@/assets/calamari.jpg";
import salmon from "@/assets/salmon.jpg";
import steak from "@/assets/steak.jpg";
import risotto from "@/assets/risotto.jpg";
import pizza from "@/assets/pizza.jpg";
import lavaCake from "@/assets/lava-cake.jpg";
import tiramisu from "@/assets/tiramisu.jpg";
import juice from "@/assets/juice.jpg";
import cappuccino from "@/assets/cappuccino.jpg";
import paneerTikka from "@/assets/paneer-tikka.jpg";
import butterChicken from "@/assets/butter-chicken.jpg";
import biryani from "@/assets/biryani.jpg";
import gulabJamun from "@/assets/gulab-jamun.jpg";
import chai from "@/assets/chai.jpg";
import lassi from "@/assets/lassi.jpg";

export type Category = "Starters" | "Main Course" | "Desserts" | "Beverages";
export type Lang = "en" | "hi" | "es";

export interface Translations {
  name: Record<Lang, string>;
  description: Record<Lang, string>;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Optional original price (used to compute savings) */
  originalPrice?: number;
  category: Category;
  image: string;
  tag?: string;
  i18n?: Translations;
}

export const CATEGORIES: Category[] = ["Starters", "Main Course", "Desserts", "Beverages"];

export const CATEGORY_LABEL: Record<Category, Record<Lang, string>> = {
  Starters: { en: "Starters", hi: "स्टार्टर्स", es: "Entrantes" },
  "Main Course": { en: "Main Course", hi: "मुख्य व्यंजन", es: "Plato Principal" },
  Desserts: { en: "Desserts", hi: "मिठाइयाँ", es: "Postres" },
  Beverages: { en: "Beverages", hi: "पेय", es: "Bebidas" },
};

export const MENU: MenuItem[] = [
  {
    id: "s1", category: "Starters", image: bruschetta, tag: "Vegetarian",
    name: "Tomato Basil Bruschetta",
    description: "Toasted sourdough, vine tomatoes, garlic, basil oil.",
    price: 320, originalPrice: 380,
    i18n: {
      name: { en: "Tomato Basil Bruschetta", hi: "टमाटर तुलसी ब्रुश्केटा", es: "Bruschetta de Tomate y Albahaca" },
      description: {
        en: "Toasted sourdough, vine tomatoes, garlic, basil oil.",
        hi: "टोस्टेड सॉर्डो, ताज़े टमाटर, लहसुन, तुलसी का तेल।",
        es: "Pan de masa madre, tomate, ajo y aceite de albahaca.",
      },
    },
  },
  {
    id: "s2", category: "Starters", image: calamari,
    name: "Crispy Calamari",
    description: "Lightly battered squid, lemon aioli, charred lime.",
    price: 480,
    i18n: {
      name: { en: "Crispy Calamari", hi: "कुरकुरा कैलामारी", es: "Calamares Crujientes" },
      description: {
        en: "Lightly battered squid, lemon aioli, charred lime.",
        hi: "हल्का तला हुआ स्क्विड, नींबू आयोली, भुना नींबू।",
        es: "Calamares rebozados, alioli de limón, lima a la brasa.",
      },
    },
  },
  {
    id: "s3", category: "Starters", image: paneerTikka, tag: "Vegetarian",
    name: "Paneer Tikka",
    description: "Char-grilled cottage cheese skewers, mint chutney.",
    price: 380, originalPrice: 450,
    i18n: {
      name: { en: "Paneer Tikka", hi: "पनीर टिक्का", es: "Paneer Tikka" },
      description: {
        en: "Char-grilled cottage cheese skewers, mint chutney.",
        hi: "तंदूर में भुने पनीर के टुकड़े, पुदीना चटनी।",
        es: "Brochetas de queso paneer al carbón, chutney de menta.",
      },
    },
  },
  {
    id: "m1", category: "Main Course", image: salmon, tag: "Chef's pick",
    name: "Pan-Seared Salmon",
    description: "Wild salmon, asparagus, lemon-butter glaze.",
    price: 1250,
    i18n: {
      name: { en: "Pan-Seared Salmon", hi: "पैन-सीयर्ड सैल्मन", es: "Salmón a la Plancha" },
      description: {
        en: "Wild salmon, asparagus, lemon-butter glaze.",
        hi: "जंगली सैल्मन, शतावरी, नींबू-मक्खन की चमक।",
        es: "Salmón salvaje, espárragos y mantequilla de limón.",
      },
    },
  },
  {
    id: "m2", category: "Main Course", image: steak,
    name: "Aged Ribeye Steak",
    description: "300g prime ribeye, rosemary jus, smoked salt.",
    price: 1850, originalPrice: 2100,
    i18n: {
      name: { en: "Aged Ribeye Steak", hi: "एज्ड रिबआई स्टेक", es: "Entrecot Madurado" },
      description: {
        en: "300g prime ribeye, rosemary jus, smoked salt.",
        hi: "300 ग्राम प्राइम रिबआई, रोज़मेरी जस, स्मोक्ड नमक।",
        es: "300g de entrecot, jugo de romero y sal ahumada.",
      },
    },
  },
  {
    id: "m3", category: "Main Course", image: risotto, tag: "Vegetarian",
    name: "Wild Mushroom Risotto",
    description: "Carnaroli rice, porcini, parmesan, thyme.",
    price: 850,
    i18n: {
      name: { en: "Wild Mushroom Risotto", hi: "जंगली मशरूम रिसोट्टो", es: "Risotto de Setas" },
      description: {
        en: "Carnaroli rice, porcini, parmesan, thyme.",
        hi: "कार्नारोली चावल, पोर्सिनी, परमेज़न, थाइम।",
        es: "Arroz Carnaroli, porcini, parmesano y tomillo.",
      },
    },
  },
  {
    id: "m4", category: "Main Course", image: pizza,
    name: "Margherita Pizza",
    description: "San Marzano tomato, fior di latte, basil.",
    price: 650,
    i18n: {
      name: { en: "Margherita Pizza", hi: "मार्गेरीटा पिज़्ज़ा", es: "Pizza Margherita" },
      description: {
        en: "San Marzano tomato, fior di latte, basil.",
        hi: "सान मार्ज़ानो टमाटर, ताज़ा मोज़ेरेला, तुलसी।",
        es: "Tomate San Marzano, mozzarella fresca, albahaca.",
      },
    },
  },
  {
    id: "m5", category: "Main Course", image: butterChicken, tag: "Popular",
    name: "Butter Chicken",
    description: "Tandoori chicken in silky tomato-cream gravy, naan.",
    price: 720, originalPrice: 850,
    i18n: {
      name: { en: "Butter Chicken", hi: "बटर चिकन", es: "Pollo a la Mantequilla" },
      description: {
        en: "Tandoori chicken in silky tomato-cream gravy, naan.",
        hi: "तंदूरी चिकन, मखमली टमाटर-मलाई की ग्रेवी, नान।",
        es: "Pollo tandoori en salsa cremosa de tomate, naan.",
      },
    },
  },
  {
    id: "m6", category: "Main Course", image: biryani, tag: "Signature",
    name: "Hyderabadi Biryani",
    description: "Saffron basmati, slow-cooked lamb, raita.",
    price: 690,
    i18n: {
      name: { en: "Hyderabadi Biryani", hi: "हैदराबादी बिरयानी", es: "Biryani de Hyderabad" },
      description: {
        en: "Saffron basmati, slow-cooked lamb, raita.",
        hi: "केसर बासमती, धीमी आँच पर पकाया मटन, रायता।",
        es: "Arroz basmati con azafrán, cordero al dum, raita.",
      },
    },
  },
  {
    id: "d1", category: "Desserts", image: lavaCake, tag: "Popular",
    name: "Molten Chocolate Cake",
    description: "Warm dark chocolate, vanilla ice cream, berries.",
    price: 380,
    i18n: {
      name: { en: "Molten Chocolate Cake", hi: "मोल्टन चॉकलेट केक", es: "Coulant de Chocolate" },
      description: {
        en: "Warm dark chocolate, vanilla ice cream, berries.",
        hi: "गरम डार्क चॉकलेट, वनीला आइसक्रीम, बेरीज़।",
        es: "Chocolate negro tibio, helado de vainilla y frutos rojos.",
      },
    },
  },
  {
    id: "d2", category: "Desserts", image: tiramisu,
    name: "Classic Tiramisu",
    description: "Espresso-soaked ladyfingers, mascarpone, cocoa.",
    price: 350,
    i18n: {
      name: { en: "Classic Tiramisu", hi: "क्लासिक तिरामिसु", es: "Tiramisú Clásico" },
      description: {
        en: "Espresso-soaked ladyfingers, mascarpone, cocoa.",
        hi: "एस्प्रेसो में भीगे लेडीफ़िंगर्स, मस्कारपोन, कोको।",
        es: "Bizcochos al espresso, mascarpone y cacao.",
      },
    },
  },
  {
    id: "d3", category: "Desserts", image: gulabJamun,
    name: "Gulab Jamun",
    description: "Warm milk dumplings in saffron-rose syrup, pistachio.",
    price: 220, originalPrice: 280,
    i18n: {
      name: { en: "Gulab Jamun", hi: "गुलाब जामुन", es: "Gulab Jamun" },
      description: {
        en: "Warm milk dumplings in saffron-rose syrup, pistachio.",
        hi: "केसर-गुलाब चाशनी में गरम जामुन, पिस्ता।",
        es: "Bolitas de leche en almíbar de azafrán y rosa, pistacho.",
      },
    },
  },
  {
    id: "b1", category: "Beverages", image: juice,
    name: "Fresh Orange Juice",
    description: "Hand-pressed Valencia oranges, garden mint.",
    price: 180,
    i18n: {
      name: { en: "Fresh Orange Juice", hi: "ताज़ा संतरे का रस", es: "Zumo de Naranja Natural" },
      description: {
        en: "Hand-pressed Valencia oranges, garden mint.",
        hi: "ताज़ा निचोड़े वैलेंशिया संतरे, बाग़ की पुदीना।",
        es: "Naranjas Valencia exprimidas a mano y menta.",
      },
    },
  },
  {
    id: "b2", category: "Beverages", image: cappuccino,
    name: "Cappuccino",
    description: "Double shot espresso, velvet steamed milk.",
    price: 160,
    i18n: {
      name: { en: "Cappuccino", hi: "कैपुचिनो", es: "Capuchino" },
      description: {
        en: "Double shot espresso, velvet steamed milk.",
        hi: "डबल शॉट एस्प्रेसो, मखमली स्टीम्ड दूध।",
        es: "Doble espresso con leche vaporizada cremosa.",
      },
    },
  },
  {
    id: "b3", category: "Beverages", image: chai,
    name: "Masala Chai",
    description: "Brewed black tea, ginger, cardamom, full cream milk.",
    price: 90,
    i18n: {
      name: { en: "Masala Chai", hi: "मसाला चाय", es: "Té Chai Masala" },
      description: {
        en: "Brewed black tea, ginger, cardamom, full cream milk.",
        hi: "काली चाय, अदरक, इलायची, पूर्ण क्रीम दूध।",
        es: "Té negro, jengibre, cardamomo y leche entera.",
      },
    },
  },
  {
    id: "b4", category: "Beverages", image: lassi,
    name: "Mango Lassi",
    description: "Alphonso mango, yogurt, saffron, pistachio.",
    price: 220, originalPrice: 260,
    i18n: {
      name: { en: "Mango Lassi", hi: "आम लस्सी", es: "Lassi de Mango" },
      description: {
        en: "Alphonso mango, yogurt, saffron, pistachio.",
        hi: "अल्फांसो आम, दही, केसर, पिस्ता।",
        es: "Mango Alphonso, yogur, azafrán y pistacho.",
      },
    },
  },
];
