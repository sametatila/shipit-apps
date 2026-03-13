import type { Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "Almanya Eğitim Danışmanlığı",
  description: "Türkiye'den Almanya'ya eğitim danışmanlığı - Studienkolleg, Lisans, Yüksek Lisans, Ausbildung ve Almanca dil eğitimi",
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
    enabledLocales: ["tr"] as Locale[],
  },

  theme: {
    primary: "221.2 83.2% 53.3%",
    secondary: "210 40% 96.1%",
    radius: "0.5rem",
  },

  contact: {
    phone: "+90 (212) 000 00 00",
    email: "info@almanya-egitim.com",
    address: "Levent Mah. Büyükdere Cad. No:42, Beşiktaş, İstanbul",
    whatsapp: "+902120000000",
    germanyOffice: "Friedrichstraße 123, 10117 Berlin, Deutschland",
  },

  social: {
    instagram: "https://instagram.com/almanya-egitim",
    facebook: "https://facebook.com/almanya-egitim",
    twitter: "",
    linkedin: "https://linkedin.com/company/almanya-egitim",
    youtube: "https://youtube.com/@almanya-egitim",
  },

  navigation: [
    { label: "nav.programs", href: "/programs" },
    { label: "nav.universities", href: "/universities" },
    { label: "nav.successStories", href: "/success-stories" },
    { label: "nav.blog", href: "/blog" },
    { label: "nav.about", href: "/about" },
    { label: "nav.contact", href: "/contact" },
  ],

  business: {
    type: "EducationalOrganization" as const,
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-15:00"],
    coordinates: { lat: 41.0782, lng: 29.0109 },
  },

  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    searchConsoleId: process.env.GOOGLE_SEARCH_CONSOLE_ID ?? "",
    vercelAnalytics: true,
  },

  seo: {
    titleTemplate: "%s | Almanya Eğitim Danışmanlığı",
    defaultDescription: "Türkiye'den Almanya'ya eğitim danışmanlığı - Studienkolleg, Lisans, Yüksek Lisans, Ausbildung ve Almanca dil eğitimi",
  },
};

export type SiteConfig = typeof siteConfig;
