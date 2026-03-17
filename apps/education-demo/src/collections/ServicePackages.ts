import type { CollectionConfig } from "payload";

export const ServicePackages: CollectionConfig = {
  slug: "service-packages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "popular", "sortOrder", "status"],
    group: "Hizmetler",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Paket Adı",
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
      type: "textarea",
      label: "Kısa Açıklama",
    },
    {
      name: "price",
      type: "number",
      label: "Fiyat",
      required: true,
      admin: {
        description: "Sayısal değer (örn: 1000)",
      },
    },
    {
      name: "currency",
      type: "select",
      label: "Para Birimi",
      options: [
        { label: "Euro (€)", value: "EUR" },
        { label: "Türk Lirası (₺)", value: "TRY" },
      ],
      defaultValue: "EUR",
    },
    {
      name: "features",
      type: "array",
      label: "Paket Özellikleri",
      admin: {
        description:
          "Karşılaştırma tablosunda gösterilecek özellikler. Değer alanına 'Dahil', 'Dahil değil' veya özel metin yazabilirsiniz.",
      },
      fields: [
        {
          name: "featureName",
          type: "text",
          label: "Özellik Adı",
          required: true,
        },
        {
          name: "value",
          type: "text",
          label: "Değer",
          required: true,
          admin: {
            description:
              "Örn: Dahil, Dahil değil, 1, 3, %100, Anlaşmalı dil kursu",
          },
        },
      ],
    },
    {
      name: "highlights",
      type: "array",
      label: "Öne Çıkan Maddeler (Kart Görünümü)",
      admin: {
        description: "Kart görünümünde gösterilecek kısa özellik listesi",
      },
      fields: [
        {
          name: "text",
          type: "text",
          label: "Madde",
          required: true,
        },
      ],
    },
    {
      name: "note",
      type: "textarea",
      label: "Paket Notu",
      admin: {
        description:
          "Örn: Yeminli tercüme ve başvuru masrafları pakete dahildir.",
      },
    },
    {
      name: "ctaText",
      type: "text",
      label: "Buton Metni",
      defaultValue: "Başvuru Yap",
    },
    {
      name: "popular",
      type: "checkbox",
      label: "Öne Çıkan Paket",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
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
    {
      name: "status",
      type: "select",
      label: "Durum",
      options: [
        { label: "Aktif", value: "active" },
        { label: "Pasif", value: "inactive" },
      ],
      defaultValue: "active",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
