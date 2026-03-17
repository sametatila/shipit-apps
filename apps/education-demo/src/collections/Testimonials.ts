import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "rating", "isActive"],
    group: "İçerik",
  },
  fields: [
    {
      name: "author",
      type: "text",
      label: "Müşteri Adı",
      required: true,
    },
    {
      name: "role",
      type: "text",
      label: "Unvan / Şirket",
    },
    {
      name: "content",
      type: "textarea",
      label: "Yorum",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      label: "Puan (1-5)",
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: "avatar",
      type: "upload",
      label: "Profil Fotoğrafı",
      relationTo: "media",
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Aktif mi?",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
