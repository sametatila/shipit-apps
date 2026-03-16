import type { Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "EuroVizyon Danışmanlık",
  description: "Türkiye'den Almanya'ya eğitim danışmanlığı - Studienkolleg, Lisans, Yüksek Lisans, Ausbildung ve Almanca dil eğitimi",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og.jpg",

  // i18n ayarları
  i18n: {
    defaultLocale: "tr" as Locale,
    locales: ["tr"] as Locale[],
    localeLabels: {
      tr: "Türkçe",
    } as Record<Locale, string>,
    localeCodes: {
      tr: "TR",
    } as Record<Locale, string>,
    enabledLocales: ["tr"] as Locale[],
  },

  theme: {
    primary: "214 100% 34%",
    secondary: "214 49% 48%",
    accent: "48 100% 50%",
    radius: "0.5rem",
  },

  contact: {
    phone: "+90 (212) 000 00 00",
    email: "info@eurovizyon.com",
    whatsapp: "+902120000000",
  },

  offices: [
    {
      name: "Genel Merkez",
      city: "İstanbul",
      country: "TR",
      address: "Levent Mah. Büyükdere Cad. No:42, Beşiktaş, İstanbul",
      phone: "+90 (212) 000 00 00",
      isHQ: true,
    },
    {
      name: "Ankara Ofisi",
      city: "Ankara",
      country: "TR",
      address: "Kızılay Mah. Atatürk Bulvarı No:121, Çankaya, Ankara",
      phone: "+90 (312) 000 00 00",
      isHQ: false,
    },
    {
      name: "Dortmund Ofisi",
      city: "Dortmund",
      country: "DE",
      address: "Kampstraße 45, 44137 Dortmund, Deutschland",
      phone: "+49 (231) 000 00 00",
      isHQ: false,
    },
    {
      name: "Bochum Ofisi",
      city: "Bochum",
      country: "DE",
      address: "Kortumstraße 68, 44787 Bochum, Deutschland",
      phone: "+49 (234) 000 00 00",
      isHQ: false,
    },
  ],

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
    titleTemplate: "%s | EuroVizyon Danışmanlık",
    defaultDescription: "Türkiye'den Almanya'ya eğitim danışmanlığı - Studienkolleg, Lisans, Yüksek Lisans, Ausbildung ve Almanca dil eğitimi",
  },
};

export type SiteConfig = typeof siteConfig;
