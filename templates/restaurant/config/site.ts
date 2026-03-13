export const siteConfig = {
  name: "Lezzet Sofrası",
  description:
    "Geleneksel Türk mutfağının en lezzetli örneklerini sunan restoran. Kebap, pide, lahmacun ve daha fazlası.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og.jpg",
  locale: "tr_TR",

  theme: {
    primary: "24 95% 40%",
    secondary: "30 80% 95%",
    radius: "0.5rem",
  },

  contact: {
    phone: "+90 555 123 4567",
    email: "info@lezzetsofrasi.com",
    address: "Atatürk Mah. Cumhuriyet Cad. No:42, İstanbul, Türkiye",
    whatsapp: "+905551234567",
  },

  social: {
    instagram: "https://instagram.com/lezzetsofrasi",
    facebook: "https://facebook.com/lezzetsofrasi",
    twitter: "",
    linkedin: "",
    youtube: "",
  },

  navigation: [
    { label: "nav.home", href: "/" },
    { label: "nav.about", href: "/about" },
    { label: "nav.menu", href: "/menu" },
    { label: "nav.gallery", href: "/gallery" },
    { label: "nav.contact", href: "/contact" },
  ],

  business: {
    type: "Restaurant" as const,
    openingHours: [
      "Mo-Sa 11:00-23:00",
      "Su 12:00-22:00",
    ],
    coordinates: { lat: 41.0082, lng: 28.9784 },
    servesCuisine: ["Türk Mutfağı", "Kebap", "Pide", "Lahmacun"],
    priceRange: "$$",
    menuUrl: "/menu",
  },

  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    searchConsoleId: process.env.GOOGLE_SEARCH_CONSOLE_ID ?? "",
    vercelAnalytics: true,
  },

  seo: {
    titleTemplate: "%s | Lezzet Sofrası",
    defaultDescription:
      "Geleneksel Türk mutfağının en lezzetli örneklerini sunan restoran. Kebap, pide, lahmacun ve daha fazlası.",
  },
};

export type SiteConfig = typeof siteConfig;
