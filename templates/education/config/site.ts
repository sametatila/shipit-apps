import type { SiteConfig } from "@shipit/seo";

export interface EducationSiteConfig extends SiteConfig {
  business: {
    type: "EducationalOrganization";
    name: string;
    founded?: string;
    logo?: string;
    slogan?: string;
    accreditation?: string;
    courseCategories?: string[];
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
    youtube?: string;
  };
}

export const siteConfig: EducationSiteConfig = {
  name: "Eğitim Danışmanlığı",
  description: "Geleceğinizi şekillendiren profesyonel eğitim danışmanlığı hizmetleri",
  url: "https://example.com",
  ogImage: "/og-image.jpg",
  locale: "tr_TR",
  seo: {
    titleTemplate: "%s | Eğitim Danışmanlığı",
    defaultDescription: "Geleceğinizi şekillendiren profesyonel eğitim danışmanlığı hizmetleri",
  },
  business: {
    type: "EducationalOrganization",
    name: "Eğitim Danışmanlığı",
    founded: "2020",
    logo: "/logo.png",
    slogan: "Geleceğinizi Birlikte Planlayalım",
    accreditation: "MEB Onaylı",
    courseCategories: [
      "Yurt Dışı Eğitim",
      "Dil Eğitimi",
      "Sınav Hazırlık",
      "Kariyer Danışmanlığı",
      "Akademik Koçluk",
      "Online Eğitim",
    ],
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
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
};
