import type { CollectionConfig } from "payload";
import { seoFields } from "@shipit/seo/payload";

export const Rooms: CollectionConfig = {
  slug: "rooms",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "pricePerNight", "capacity"],
    group: "Otel",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Oda Adı",
      required: true,
    },
    {
      name: "type",
      type: "select",
      label: "Oda Tipi",
      required: true,
      options: [
        { label: "Standart", value: "standard" },
        { label: "Deluxe", value: "deluxe" },
        { label: "Suite", value: "suite" },
        { label: "Aile Odası", value: "family" },
        { label: "Kral Dairesi", value: "presidential" },
      ],
    },
    {
      name: "description",
      type: "richText",
      label: "Açıklama",
    },
    {
      name: "pricePerNight",
      type: "number",
      label: "Gecelik Fiyat (TL)",
      required: true,
      min: 0,
    },
    {
      name: "capacity",
      type: "number",
      label: "Kapasite (Kişi)",
      required: true,
      min: 1,
    },
    {
      name: "size",
      type: "number",
      label: "Oda Büyüklüğü (m²)",
    },
    {
      name: "amenities",
      type: "select",
      label: "Olanaklar",
      hasMany: true,
      options: [
        { label: "Wi-Fi", value: "wifi" },
        { label: "Klima", value: "ac" },
        { label: "Mini Bar", value: "minibar" },
        { label: "TV", value: "tv" },
        { label: "Balkon", value: "balcony" },
        { label: "Deniz Manzarası", value: "sea-view" },
        { label: "Jakuzi", value: "jacuzzi" },
        { label: "Kasa", value: "safe" },
        { label: "Saç Kurutma Makinesi", value: "hairdryer" },
        { label: "Çay/Kahve", value: "tea-coffee" },
      ],
    },
    {
      name: "images",
      type: "array",
      label: "Oda Görselleri",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "isAvailable",
      type: "checkbox",
      label: "Müsait mi?",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    seoFields() as any,
  ],
};
