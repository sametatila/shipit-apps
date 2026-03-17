import type { CollectionConfig } from "payload";
import { seoFields } from "@shipit/seo/payload";

export const SuccessStories: CollectionConfig = {
  slug: "success-stories",
  admin: {
    useAsTitle: "studentName",
    defaultColumns: ["studentName", "university", "program", "year"],
    group: "Eğitim",
  },
  fields: [
    {
      name: "studentName",
      type: "text",
      label: "Öğrenci Adı",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      label: "Fotoğraf",
      relationTo: "media",
    },
    {
      name: "university",
      type: "relationship",
      label: "Kabul Alınan Üniversite",
      relationTo: "universities",
    },
    {
      name: "universityName",
      type: "text",
      label: "Üniversite Adı (Manuel)",
      admin: {
        description: "Üniversite listede yoksa buraya yazın",
      },
    },
    {
      name: "program",
      type: "text",
      label: "Bölüm / Program",
      required: true,
    },
    {
      name: "programType",
      type: "select",
      label: "Program Türü",
      options: [
        { label: "Studienkolleg", value: "studienkolleg" },
        { label: "Lisans", value: "bachelor" },
        { label: "Yüksek Lisans", value: "master" },
        { label: "Ausbildung", value: "ausbildung" },
        { label: "Dil Kursu", value: "language" },
      ],
    },
    {
      name: "city",
      type: "text",
      label: "Şehir",
    },
    {
      name: "year",
      type: "number",
      label: "Yerleştirme Yılı",
      required: true,
    },
    {
      name: "testimonial",
      type: "textarea",
      label: "Öğrenci Yorumu",
      required: true,
    },
    {
      name: "videoUrl",
      type: "text",
      label: "Video URL (YouTube/Vimeo)",
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
      name: "isParentTestimonial",
      type: "checkbox",
      label: "Veli Yorumu mu?",
      defaultValue: false,
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Öne Çıkan",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Aktif",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    seoFields() as any,
  ],
};
