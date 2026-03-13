import type { SiteConfig } from "@shipit/seo";

export interface LawyerSiteConfig extends SiteConfig {
  business: {
    type: "LegalService";
    name: string;
    founded?: string;
    logo?: string;
    barAssociation?: string;
    barNumber?: string;
    practiceAreas?: string[];
  };
  navigation: {
    label: string;
    href: string;
  }[];
  contact: {
    phone?: string;
    email?: string;
    address?: string;
    fax?: string;
  };
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const siteConfig: LawyerSiteConfig = {
  name: "Hukuk Bürosu",
  description: "Profesyonel hukuk danışmanlığı ve avukatlık hizmetleri",
  url: "https://example.com",
  ogImage: "/og-image.jpg",
  locale: "tr_TR",
  seo: {
    titleTemplate: "%s | Hukuk Bürosu",
    defaultDescription:
      "Profesyonel hukuk danışmanlığı ve avukatlık hizmetleri",
  },
  business: {
    type: "LegalService",
    name: "Hukuk Bürosu",
    founded: "2015",
    logo: "/logo.png",
    barAssociation: "İstanbul Barosu",
    barNumber: "XXXXX",
    practiceAreas: [
      "Ceza Hukuku",
      "Ticaret Hukuku",
      "İş Hukuku",
      "Aile Hukuku",
      "Gayrimenkul Hukuku",
      "İcra ve İflas Hukuku",
    ],
  },
  navigation: [
    { label: "nav.home", href: "/" },
    { label: "nav.about", href: "/about" },
    { label: "nav.practiceAreas", href: "/practice-areas" },
    { label: "nav.contact", href: "/contact" },
  ],
  contact: {
    phone: "+90 (212) 000 00 00",
    email: "info@example.com",
    address: "İstanbul, Türkiye",
    fax: "+90 (212) 000 00 01",
  },
  social: {
    linkedin: "https://linkedin.com",
  },
};
