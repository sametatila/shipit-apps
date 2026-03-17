import type { CollectionConfig } from "payload";

export const Galleries: CollectionConfig = {
  slug: "galleries",
  labels: {
    singular: "Galeri",
    plural: "Galeriler",
  },
  admin: {
    useAsTitle: "title",
    group: "İçerik",
    defaultColumns: ["title", "status", "updatedAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Açıklama",
    },
    {
      name: "images",
      type: "array",
      label: "Görseller",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Görsel",
          required: true,
        },
        {
          name: "caption",
          type: "text",
          label: "Açıklama",
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
