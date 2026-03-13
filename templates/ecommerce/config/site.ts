import type { SiteConfig } from "@shipit/seo";

export interface EcommerceSiteConfig extends SiteConfig {
  business: {
    type: "Store";
    name: string;
    logo?: string;
    currency: string;
    currencySymbol: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  contact: {
    phone?: string;
    email?: string;
    address?: string;
  };
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  snipcartApiKey: string;
}

export const siteConfig: EcommerceSiteConfig = {
  name: "Mağaza Adı",
  description: "Online alışveriş mağazası",
  url: "https://example.com",
  ogImage: "/og-image.jpg",
  locale: "tr_TR",
  seo: {
    titleTemplate: "%s | Mağaza Adı",
    defaultDescription: "Online alışveriş mağazası",
  },
  business: {
    type: "Store",
    name: "Mağaza Adı",
    logo: "/logo.png",
    currency: "TRY",
    currencySymbol: "TL",
  },
  navigation: [
    { label: "nav.home", href: "/" },
    { label: "nav.products", href: "/products" },
    { label: "nav.about", href: "/about" },
    { label: "nav.contact", href: "/contact" },
  ],
  contact: {
    phone: "+90 (212) 000 00 00",
    email: "info@example.com",
    address: "İstanbul, Türkiye",
  },
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  snipcartApiKey: "SNIPCART_API_KEY",
};
