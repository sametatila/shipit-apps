import type { Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "ShipIt Template",
  description: "Modern, hızlı ve SEO dostu web sitesi",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og.jpg",

  // i18n ayarları
  i18n: {
    defaultLocale: "tr" as Locale,
    locales: ["tr", "en", "de", "ar", "ru", "nl"] as Locale[],
    localeLabels: {
      tr: "Türkçe",
      en: "English",
      de: "Deutsch",
      ar: "العربية",
      ru: "Русский",
      nl: "Nederlands",
    } as Record<Locale, string>,
    localeCodes: {
      tr: "TR",
      en: "GB",
      de: "DE",
      ar: "SA",
      ru: "RU",
      nl: "NL",
    } as Record<Locale, string>,
    // Hangi diller aktif? (site.ts'den kolayca kontrol)
    enabledLocales: ["tr"] as Locale[], // Tek dil: sadece ["tr"]. Çoklu: ["tr", "en", "de"]
  },

  theme: {
    primary: "222.2 47.4% 11.2%",
    secondary: "210 40% 96.1%",
    radius: "0.5rem",
  },

  contact: {
    phone: "+90 555 123 4567",
    email: "info@example.com",
    address: "Örnek Mah. Örnek Cad. No:1, İstanbul, Türkiye",
    whatsapp: "+905551234567",
  },

  social: {
    instagram: "https://instagram.com/example",
    facebook: "https://facebook.com/example",
    twitter: "https://twitter.com/example",
    linkedin: "",
    youtube: "",
  },

  navigation: [
    { label: "nav.home", href: "/" },
    { label: "nav.about", href: "/about" },
    { label: "nav.services", href: "/services" },
    { label: "nav.gallery", href: "/gallery" },
    { label: "nav.contact", href: "/contact" },
  ],

  business: {
    type: "LocalBusiness" as const,
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-14:00"],
    coordinates: { lat: 41.0082, lng: 28.9784 },
  },

  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    searchConsoleId: process.env.GOOGLE_SEARCH_CONSOLE_ID ?? "",
    vercelAnalytics: true,
  },

  seo: {
    titleTemplate: "%s | ShipIt Template",
    defaultDescription: "Modern, hızlı ve SEO dostu web sitesi",
  },
};

export type SiteConfig = typeof siteConfig;
