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
    phone: "+90 539 497 14 38",
    email: "eurovizyondanismanlik@gmail.com",
    whatsapp: "+905394971438",
  },

  offices: [
    {
      name: "Genel Merkez",
      city: "Bursa",
      country: "TR",
      address: "Odunluk Mah. Okul Sok. No: 26 Moon Plaza Kat: 3 Ofis No: 15 Nilüfer/Bursa",
      phone: "+90 505 400 89 89",
      isHQ: true,
    },
    {
      name: "Ankara Ofisi",
      city: "Ankara",
      country: "TR",
      address: "Balgat Mah. Ceyhun Atuf Kansu Cad. No:20/10 Balgat, Çankaya/Ankara",
      phone: "+90 505 400 89 89",
      isHQ: false,
    },
    {
      name: "Dortmund Ofisi",
      city: "Dortmund",
      country: "DE",
      address: "Schiller Straße 4/A, 44147 Dortmund, Deutschland",
      phone: "+49 176 63132614",
      isHQ: false,
    },
    {
      name: "Bochum Ofisi",
      city: "Bochum",
      country: "DE",
      address: "Schiller Straße 4/A, 44147 Dortmund, Deutschland",
      phone: "+49 1522 7343732",
      isHQ: false,
    },
  ],

  social: {
    instagram: "https://instagram.com/eurovizyondanismanlik",
    facebook: "https://facebook.com/eurovizyondanismanlik",
    linkedin: "https://linkedin.com/company/eurovizyondanismanlik",
    youtube: "https://youtube.com/@eurovizyondanismanlik",
  },

  navigation: [
    { label: "nav.programs", href: "/programs" },
    { label: "nav.universities", href: "/universities" },
    { label: "nav.successStories", href: "/success-stories" },
    { label: "nav.blog", href: "/blog" },
    { label: "nav.about", href: "/about" },
    { label: "nav.contact", href: "/contact" },
  ],

  team: [
    {
      name: "Ömer Faruk Şanlı",
      role: "Geschäftsführender Direktor / Yönetici Direktör",
      city: "Bochum",
      phone: "+49 152 27343732",
    },
    {
      name: "Ömer Selçuk Köroğlu",
      role: "Geschäftsführer / Yönetici",
      city: "Dortmund",
      phone: "+49 176 63132614",
    },
    {
      name: "Yusuf Altun",
      role: "IT-Spezialist / IT Uzmanı",
      city: "Essen",
      phone: "+49 176 80839294",
    },
    {
      name: "Özge Ceren",
      role: "Bildungsberaterin / Eğitim Danışmanı",
      city: "Würzburg",
    },
    {
      name: "Turan Sarıkaya",
      role: "Marketing / Pazarlama",
      city: "Köln",
    },
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
