import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Sayfa Başlığı",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "URL Slug",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "İçerik",
    },
    {
      name: "featuredImage",
      type: "upload",
      label: "Öne Çıkan Görsel",
      relationTo: "media",
    },
    {
      name: "seo",
      type: "group",
      label: "SEO Ayarları",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta Başlık",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta Açıklama",
        },
        {
          name: "ogImage",
          type: "upload",
          label: "OG Görseli",
          relationTo: "media",
        },
      ],
    },
    {
      name: "status",
      type: "select",
      label: "Durum",
      defaultValue: "draft",
      options: [
        { label: "Taslak", value: "draft" },
        { label: "Yayında", value: "published" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
