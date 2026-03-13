import type { CollectionConfig } from "payload";

export const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "programType", "language", "status"],
    group: "Eğitim",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Program Adı",
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
      name: "programType",
      type: "select",
      label: "Program Türü",
      required: true,
      options: [
        { label: "Studienkolleg", value: "studienkolleg" },
        { label: "Lisans (Bachelor)", value: "bachelor" },
        { label: "Yüksek Lisans (Master)", value: "master" },
        { label: "Doktora (PhD)", value: "phd" },
        { label: "Ausbildung (Mesleki Eğitim)", value: "ausbildung" },
        { label: "Almanca Dil Kursu", value: "language" },
        { label: "Yaz Okulu", value: "summer-school" },
      ],
    },
    {
      name: "field",
      type: "select",
      label: "Alan / Bölüm",
      options: [
        { label: "Mühendislik", value: "engineering" },
        { label: "Tıp", value: "medicine" },
        { label: "İşletme / Ekonomi", value: "business" },
        { label: "Bilgisayar Bilimleri / IT", value: "cs" },
        { label: "Hukuk", value: "law" },
        { label: "Doğa Bilimleri", value: "science" },
        { label: "Sosyal Bilimler", value: "social-science" },
        { label: "Sanat / Tasarım", value: "art" },
        { label: "Mimarlık", value: "architecture" },
        { label: "Diğer", value: "other" },
      ],
    },
    {
      name: "description",
      type: "richText",
      label: "Detaylı Açıklama",
    },
    {
      name: "shortDescription",
      type: "textarea",
      label: "Kısa Açıklama",
      maxLength: 300,
    },
    {
      name: "image",
      type: "upload",
      label: "Program Görseli",
      relationTo: "media",
    },
    {
      name: "language",
      type: "select",
      label: "Eğitim Dili",
      options: [
        { label: "Almanca", value: "de" },
        { label: "İngilizce", value: "en" },
        { label: "Almanca & İngilizce", value: "de-en" },
      ],
      defaultValue: "de",
    },
    {
      name: "duration",
      type: "text",
      label: "Süre",
      admin: {
        description: "Örn: 1 Yıl, 3-4 Yıl, 6 Ay, 2 Yıl",
      },
    },
    {
      name: "germanLevel",
      type: "select",
      label: "Gereken Almanca Seviyesi",
      options: [
        { label: "Gerekmiyor", value: "none" },
        { label: "A1", value: "a1" },
        { label: "A2", value: "a2" },
        { label: "B1", value: "b1" },
        { label: "B2", value: "b2" },
        { label: "C1", value: "c1" },
        { label: "C2", value: "c2" },
      ],
    },
    {
      name: "tuitionInfo",
      type: "textarea",
      label: "Ücret Bilgisi",
      admin: {
        description: "Örn: Devlet üniversiteleri ücretsiz, sadece semesterbeitrag (~300€/dönem)",
      },
    },
    {
      name: "requirements",
      type: "array",
      label: "Başvuru Şartları",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Şart",
          required: true,
        },
      ],
    },
    {
      name: "highlights",
      type: "array",
      label: "Öne Çıkan Özellikler",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Özellik",
          required: true,
        },
      ],
    },
    {
      name: "applicationDeadline",
      type: "text",
      label: "Başvuru Son Tarihi",
      admin: {
        description: "Örn: Kış dönemi: 15 Temmuz, Yaz dönemi: 15 Ocak",
      },
    },
    {
      name: "relatedUniversities",
      type: "relationship",
      label: "İlgili Üniversiteler",
      relationTo: "universities" as any,
      hasMany: true,
    },
    {
      name: "status",
      type: "select",
      label: "Durum",
      options: [
        { label: "Aktif", value: "active" },
        { label: "Yakında", value: "upcoming" },
        { label: "Pasif", value: "inactive" },
      ],
      defaultValue: "active",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Öne Çıkan Program",
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
      name: "seo",
      type: "group",
      label: "SEO Ayarları",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta Başlık",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta Açıklama",
        },
      ],
    },
  ],
};
