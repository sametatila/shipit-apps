import type { SiteConfig } from "@shipit/seo";

export interface CorporateSiteConfig extends SiteConfig {
  business: {
    type: "Organization";
    name: string;
    founded?: string;
    industry?: string;
    logo?: string;
    slogan?: string;
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
    linkedin?: string;
  };
}

export const siteConfig: CorporateSiteConfig = {
  name: "Şirket Adı",
  description: "Profesyonel kurumsal web sitesi",
  url: "https://example.com",
  ogImage: "/og-image.jpg",
  locale: "tr_TR",
  seo: {
    titleTemplate: "%s | Şirket Adı",
    defaultDescription: "Profesyonel kurumsal web sitesi",
  },
  business: {
    type: "Organization",
    name: "Şirket Adı",
    founded: "2020",
    industry: "Genel",
    logo: "/logo.png",
    slogan: "Profesyonel Çözümler",
  },
  navigation: [
    { label: "nav.home", href: "/" },
    { label: "nav.about", href: "/about" },
    { label: "nav.services", href: "/services" },
    { label: "nav.gallery", href: "/gallery" },
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
    linkedin: "https://linkedin.com",
  },
};
