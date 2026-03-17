import type { CollectionConfig } from "payload";
import { seoFields } from "@shipit/seo/payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Sayfa",
    plural: "Sayfalar",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "updatedAt"],
    group: "İçerik",
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
    seoFields() as any,
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
