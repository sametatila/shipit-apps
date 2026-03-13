import type { SiteConfig } from "@shipit/seo";

export interface ConstructionSiteConfig extends SiteConfig {
  business: {
    type: "GeneralContractor";
    name: string;
    founded?: string;
    logo?: string;
    licenseNumber?: string;
    specializations?: string[];
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

export const siteConfig: ConstructionSiteConfig = {
  name: "İnşaat Firması",
  description: "Profesyonel inşaat ve müteahhitlik hizmetleri",
  url: "https://example.com",
  ogImage: "/og-image.jpg",
  locale: "tr_TR",
  seo: {
    titleTemplate: "%s | İnşaat Firması",
    defaultDescription: "Profesyonel inşaat ve müteahhitlik hizmetleri",
  },
  business: {
    type: "GeneralContractor",
    name: "İnşaat Firması",
    founded: "2010",
    logo: "/logo.png",
    licenseNumber: "XXXX-XXXX",
    specializations: [
      "Konut Projeleri",
      "Ticari Yapılar",
      "Restorasyon",
      "İç Mimari",
    ],
  },
  navigation: [
    { label: "nav.home", href: "/" },
    { label: "nav.about", href: "/about" },
    { label: "nav.projects", href: "/projects" },
    { label: "nav.services", href: "/services" },
    { label: "nav.contact", href: "/contact" },
  ],
  contact: {
    phone: "+90 (212) 000 00 00",
    email: "info@example.com",
    address: "İstanbul, Türkiye",
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};
