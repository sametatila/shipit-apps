// Shared SEO field group for Payload CMS collections
// Usage: import { seoFields } from "@shipit/seo/payload";
//        fields: [...otherFields, seoFields()]

interface SeoFieldOptions {
  /** Path to the SeoScorePanel component in the app's importMap */
  componentPath?: string;
  /** Include ogImage upload field */
  ogImage?: boolean;
}

interface PayloadField {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  relationTo?: string;
  admin?: Record<string, unknown>;
  fields?: PayloadField[];
}

export function seoFields(options?: SeoFieldOptions): PayloadField {
  const {
    componentPath = "@/components/admin/SeoScorePanel",
    ogImage = false,
  } = options || {};

  const fields: PayloadField[] = [
    {
      name: "focusKeyword",
      type: "text",
      label: "Odak Anahtar Kelime",
      admin: {
        description:
          "İçeriğin hedeflediği ana anahtar kelime. SEO puanı buna göre hesaplanır.",
      },
    },
    {
      name: "metaTitle",
      type: "text",
      label: "Meta Başlık (SEO)",
      admin: {
        description: "Arama sonuçlarında görünecek başlık. 50-60 karakter ideal.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "Meta Açıklama (SEO)",
      admin: {
        description:
          "Arama sonuçlarında görünecek açıklama. 120-160 karakter ideal.",
      },
    },
  ];

  if (ogImage) {
    fields.push({
      name: "ogImage",
      type: "upload",
      label: "Sosyal Medya Görseli (OG Image)",
      relationTo: "media",
    });
  }

  fields.push({
    name: "seoScore",
    type: "ui",
    label: "SEO Puanı",
    admin: {
      components: {
        Field: componentPath,
      },
    },
  });

  return {
    name: "seo",
    type: "group",
    label: "SEO",
    admin: {
      description: "Arama motoru optimizasyonu ayarları",
    },
    fields,
  };
}
