import type { CollectionConfig } from "payload";

export const FormSubmissions: CollectionConfig = {
  slug: "form-submissions",
  labels: {
    singular: "Form Gönderisi",
    plural: "Form Gönderileri",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "status", "createdAt"],
    group: "İletişim",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Ad Soyad",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "E-posta",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Telefon",
    },
    {
      name: "message",
      type: "textarea",
      label: "Mesaj",
    },
    {
      name: "source",
      type: "text",
      label: "Kaynak Sayfa",
      admin: {
        readOnly: true,
        description: "Formun gönderildiği sayfa",
      },
    },
    {
      name: "status",
      type: "select",
      label: "Durum",
      options: [
        { label: "Yeni", value: "new" },
        { label: "Okundu", value: "read" },
        { label: "Yanıtlandı", value: "replied" },
        { label: "Kapatıldı", value: "closed" },
      ],
      defaultValue: "new",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "assignedTo",
      type: "relationship",
      label: "Atanan Kişi",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "notes",
      type: "array",
      label: "Notlar",
      fields: [
        {
          name: "date",
          type: "date",
          label: "Tarih",
          required: true,
        },
        {
          name: "note",
          type: "textarea",
          label: "Not",
          required: true,
        },
      ],
    },
  ],
};
