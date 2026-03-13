import type { CollectionConfig } from "payload";

export const PracticeAreas: CollectionConfig = {
  slug: "practice-areas",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "sortOrder"],
    group: "Avukat",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Uzmanlık Alanı",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "URL Slug",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "richText",
      label: "Açıklama",
    },
    {
      name: "shortDescription",
      type: "textarea",
      label: "Kısa Açıklama",
      maxLength: 300,
    },
    {
      name: "icon",
      type: "text",
      label: "İkon Adı (Lucide)",
      admin: {
        description: "lucide-react ikon adı (ör: Scale, Shield, Users)",
      },
    },
    {
      name: "image",
      type: "upload",
      label: "Görsel",
      relationTo: "media",
    },
    {
      name: "caseResults",
      type: "array",
      label: "Dava Sonuçları",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Dava Başlığı",
          required: true,
        },
        {
          name: "result",
          type: "select",
          label: "Sonuç",
          options: [
            { label: "Kazanıldı", value: "won" },
            { label: "Uzlaşma", value: "settled" },
            { label: "Kaybedildi", value: "lost" },
          ],
        },
        {
          name: "description",
          type: "textarea",
          label: "Açıklama",
        },
      ],
    },
    {
      name: "sortOrder",
      type: "number",
      label: "Sıralama",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
