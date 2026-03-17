import type { CollectionConfig } from "payload";

export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  labels: {
    singular: "Bülten Abonesi",
    plural: "Bülten Aboneleri",
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "status", "subscribedAt"],
    group: "Bülten",
    description: "Newsletter aboneleri",
  },
  fields: [
    {
      name: "email",
      type: "email",
      label: "E-posta",
      required: true,
      unique: true,
    },
    {
      name: "name",
      type: "text",
      label: "İsim",
    },
    {
      name: "status",
      type: "select",
      label: "Durum",
      defaultValue: "active",
      options: [
        { label: "Aktif", value: "active" },
        { label: "Abonelikten Çıktı", value: "unsubscribed" },
        { label: "Bounced", value: "bounced" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "subscribedAt",
      type: "date",
      label: "Abone Olma Tarihi",
      defaultValue: () => new Date().toISOString(),
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "unsubscribedAt",
      type: "date",
      label: "Abonelikten Çıkma Tarihi",
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
        condition: (data) => data?.status === "unsubscribed",
      },
    },
    {
      name: "unsubscribeToken",
      type: "text",
      label: "Abonelikten Çıkma Token",
      admin: {
        hidden: true,
      },
    },
    {
      name: "source",
      type: "select",
      label: "Kaynak",
      defaultValue: "blog",
      options: [
        { label: "Blog Sayfası", value: "blog" },
        { label: "Ana Sayfa", value: "homepage" },
        { label: "Footer", value: "footer" },
        { label: "Popup", value: "popup" },
        { label: "Manuel", value: "manual" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "array",
      label: "Etiketler",
      admin: {
        description: "Abone segmentasyonu için etiketler",
      },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
