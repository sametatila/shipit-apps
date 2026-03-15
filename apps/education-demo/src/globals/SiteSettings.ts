import type { GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Ayarları",
  admin: {
    group: "Ayarlar",
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidateTag("site-settings", "default");
        } catch {
          // seed/CLI ortamında Next.js runtime yoktur, hatayı yoksay
        }
      },
    ],
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      label: "Site Adı",
      required: true,
    },
    {
      name: "siteDescription",
      type: "textarea",
      label: "Site Açıklaması",
    },
    {
      name: "logo",
      type: "upload",
      label: "Logo",
      relationTo: "media",
    },
    {
      name: "favicon",
      type: "upload",
      label: "Favicon",
      relationTo: "media",
    },
    {
      name: "contact",
      type: "group",
      label: "İletişim Bilgileri",
      fields: [
        {
          name: "phone",
          type: "text",
          label: "Telefon",
        },
        {
          name: "email",
          type: "email",
          label: "E-posta",
        },
        {
          name: "address",
          type: "textarea",
          label: "Adres",
        },
        {
          name: "whatsapp",
          type: "text",
          label: "WhatsApp Numarası",
        },
      ],
    },
    {
      name: "social",
      type: "group",
      label: "Sosyal Medya",
      fields: [
        {
          name: "instagram",
          type: "text",
          label: "Instagram URL",
        },
        {
          name: "facebook",
          type: "text",
          label: "Facebook URL",
        },
        {
          name: "twitter",
          type: "text",
          label: "Twitter/X URL",
        },
        {
          name: "youtube",
          type: "text",
          label: "YouTube URL",
        },
        {
          name: "linkedin",
          type: "text",
          label: "LinkedIn URL",
        },
        {
          name: "tiktok",
          type: "text",
          label: "TikTok URL",
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "SEO Ayarları",
      fields: [
        {
          name: "titleTemplate",
          type: "text",
          label: "Başlık Şablonu",
          admin: {
            description: "Örn: %s | Firma Adı (%s sayfa başlığının yerini alır)",
          },
        },
        {
          name: "defaultDescription",
          type: "textarea",
          label: "Varsayılan Meta Açıklama",
        },
      ],
    },
    {
      name: "analytics",
      type: "group",
      label: "Analytics & İzleme",
      fields: [
        {
          name: "gaId",
          type: "text",
          label: "Google Analytics ID",
          admin: {
            description: "Örn: G-XXXXXXXXXX",
          },
        },
        {
          name: "gtmId",
          type: "text",
          label: "Google Tag Manager ID",
          admin: {
            description: "Örn: GTM-XXXXXXX",
          },
        },
        {
          name: "searchConsoleId",
          type: "text",
          label: "Google Search Console Doğrulama Kodu",
          admin: {
            description: "google-site-verification meta tag değeri",
          },
        },
      ],
    },
    {
      name: "businessHours",
      type: "array",
      label: "Çalışma Saatleri",
      fields: [
        {
          name: "day",
          type: "text",
          label: "Gün",
          required: true,
        },
        {
          name: "hours",
          type: "text",
          label: "Saat Aralığı",
          required: true,
        },
      ],
    },
    {
      name: "googleMapsEmbed",
      type: "textarea",
      label: "Google Maps Embed URL",
    },
  ],
};
