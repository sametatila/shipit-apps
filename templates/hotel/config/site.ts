export const siteConfig = {
  name: "Grand Anadolu Hotel",
  description:
    "İstanbul'un kalbinde konfor ve lüks bir arada. Modern odaları, eşsiz manzarası ve üstün hizmet anlayışı ile unutulmaz bir konaklama deneyimi.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og.jpg",
  locale: "tr_TR",

  theme: {
    primary: "220 60% 30%",
    secondary: "220 40% 95%",
    radius: "0.5rem",
  },

  contact: {
    phone: "+90 212 555 6789",
    email: "info@grandanadoluhotel.com",
    address: "Harbiye Mah. Cumhuriyet Cad. No:15, Şişli, İstanbul, Türkiye",
    whatsapp: "+902125556789",
  },

  social: {
    instagram: "https://instagram.com/grandanadoluhotel",
    facebook: "https://facebook.com/grandanadoluhotel",
    twitter: "https://twitter.com/grandanadolu",
    linkedin: "",
    youtube: "",
  },

  navigation: [
    { label: "nav.home", href: "/" },
    { label: "nav.about", href: "/about" },
    { label: "nav.rooms", href: "/rooms" },
    { label: "nav.gallery", href: "/gallery" },
    { label: "nav.contact", href: "/contact" },
  ],

  business: {
    type: "Hotel" as const,
    openingHours: ["Mo-Su 00:00-23:59"],
    coordinates: { lat: 41.0486, lng: 28.9939 },
    starRating: 4,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    amenities: [
      "Ücretsiz Wi-Fi",
      "Açık Havuz",
      "Kapalı Havuz",
      "SPA & Wellness",
      "Fitness Merkezi",
      "Restoran",
      "Otopark",
      "Oda Servisi",
      "Çalışma Odası",
      "Toplantı Salonu",
      "Transfer Hizmeti",
      "Concierge",
    ],
    priceRange: "$$$",
  },

  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    searchConsoleId: process.env.GOOGLE_SEARCH_CONSOLE_ID ?? "",
    vercelAnalytics: true,
  },

  seo: {
    titleTemplate: "%s | Grand Anadolu Hotel",
    defaultDescription:
      "İstanbul'un kalbinde konfor ve lüks bir arada. Modern odalar, eşsiz manzara ve üstün hizmet anlayışı.",
  },
};

export type SiteConfig = typeof siteConfig;
