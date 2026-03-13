import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "completionDate"],
    group: "İnşaat",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Proje Adı",
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
      label: "Proje Açıklaması",
    },
    {
      name: "category",
      type: "select",
      label: "Kategori",
      required: true,
      options: [
        { label: "Konut", value: "residential" },
        { label: "Ticari", value: "commercial" },
        { label: "Endüstriyel", value: "industrial" },
        { label: "Restorasyon", value: "restoration" },
        { label: "Altyapı", value: "infrastructure" },
      ],
    },
    {
      name: "location",
      type: "text",
      label: "Konum",
    },
    {
      name: "completionDate",
      type: "date",
      label: "Tamamlanma Tarihi",
    },
    {
      name: "status",
      type: "select",
      label: "Durum",
      defaultValue: "completed",
      options: [
        { label: "Devam Ediyor", value: "ongoing" },
        { label: "Tamamlandı", value: "completed" },
        { label: "Planlanıyor", value: "planned" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "beforeImage",
      type: "upload",
      label: "Öncesi Görseli",
      relationTo: "media",
    },
    {
      name: "afterImage",
      type: "upload",
      label: "Sonrası Görseli",
      relationTo: "media",
    },
    {
      name: "gallery",
      type: "array",
      label: "Galeri",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
          label: "Açıklama",
        },
      ],
    },
  ],
};
