import type { CollectionConfig } from "payload";
import { seoFields } from "@shipit/seo/payload";

export const Universities: CollectionConfig = {
  slug: "universities",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "city", "type", "isPartner"],
    group: "Eğitim",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Üniversite Adı",
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
      name: "logo",
      type: "upload",
      label: "Logo",
      relationTo: "media",
    },
    {
      name: "coverImage",
      type: "upload",
      label: "Kapak Görseli",
      relationTo: "media",
    },
    {
      name: "city",
      type: "text",
      label: "Şehir",
      required: true,
    },
    {
      name: "bundesland",
      type: "select",
      label: "Eyalet (Bundesland)",
      options: [
        { label: "Baden-Württemberg", value: "baden-wuerttemberg" },
        { label: "Bayern (Bavyera)", value: "bayern" },
        { label: "Berlin", value: "berlin" },
        { label: "Brandenburg", value: "brandenburg" },
        { label: "Bremen", value: "bremen" },
        { label: "Hamburg", value: "hamburg" },
        { label: "Hessen", value: "hessen" },
        { label: "Mecklenburg-Vorpommern", value: "mecklenburg-vorpommern" },
        { label: "Niedersachsen (Aşağı Saksonya)", value: "niedersachsen" },
        { label: "Nordrhein-Westfalen", value: "nordrhein-westfalen" },
        { label: "Rheinland-Pfalz", value: "rheinland-pfalz" },
        { label: "Saarland", value: "saarland" },
        { label: "Sachsen (Saksonya)", value: "sachsen" },
        { label: "Sachsen-Anhalt", value: "sachsen-anhalt" },
        { label: "Schleswig-Holstein", value: "schleswig-holstein" },
        { label: "Thüringen", value: "thueringen" },
      ],
    },
    {
      name: "type",
      type: "select",
      label: "Tür",
      options: [
        { label: "Devlet Üniversitesi (Universität)", value: "public-uni" },
        { label: "Teknik Üniversite (TU)", value: "tu" },
        { label: "Uygulamalı Bilimler (Fachhochschule)", value: "fh" },
        { label: "Özel Üniversite", value: "private" },
        { label: "Sanat / Müzik Yüksekokulu", value: "art" },
      ],
    },
    {
      name: "description",
      type: "richText",
      label: "Tanıtım",
    },
    {
      name: "shortDescription",
      type: "textarea",
      label: "Kısa Tanıtım",
      maxLength: 300,
    },
    {
      name: "websiteUrl",
      type: "text",
      label: "Web Sitesi",
    },
    {
      name: "ranking",
      type: "group",
      label: "Sıralama Bilgileri",
      fields: [
        {
          name: "qsWorld",
          type: "number",
          label: "QS Dünya Sıralaması",
        },
        {
          name: "theWorld",
          type: "number",
          label: "THE Dünya Sıralaması",
        },
      ],
    },
    {
      name: "stats",
      type: "group",
      label: "İstatistikler",
      fields: [
        {
          name: "totalStudents",
          type: "number",
          label: "Toplam Öğrenci Sayısı",
        },
        {
          name: "internationalPercent",
          type: "number",
          label: "Uluslararası Öğrenci Oranı (%)",
        },
        {
          name: "semesterFee",
          type: "text",
          label: "Dönemlik Ücret (Semesterbeitrag)",
          admin: {
            description: "Örn: ~310€/dönem",
          },
        },
      ],
    },
    {
      name: "programs",
      type: "array",
      label: "Sunulan Programlar",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Program Adı",
          required: true,
        },
        {
          name: "degree",
          type: "select",
          label: "Derece",
          options: [
            { label: "Lisans (B.Sc./B.A.)", value: "bachelor" },
            { label: "Yüksek Lisans (M.Sc./M.A.)", value: "master" },
            { label: "Doktora", value: "phd" },
          ],
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
        },
      ],
    },
    {
      name: "isPartner",
      type: "checkbox",
      label: "Anlaşmalı Üniversite",
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
    seoFields() as any,
  ],
};
