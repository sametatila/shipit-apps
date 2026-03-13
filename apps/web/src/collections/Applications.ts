import type { CollectionConfig } from "payload";

export const Applications: CollectionConfig = {
  slug: "applications",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "programType", "status", "createdAt"],
    group: "Eğitim",
  },
  fields: [
    {
      name: "fullName",
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
      required: true,
    },
    {
      name: "whatsapp",
      type: "text",
      label: "WhatsApp Numarası",
    },
    {
      name: "currentEducation",
      type: "select",
      label: "Mevcut Eğitim Durumu",
      options: [
        { label: "Lise Öğrencisi", value: "high-school" },
        { label: "Lise Mezunu", value: "high-school-grad" },
        { label: "Üniversite Öğrencisi", value: "university" },
        { label: "Lisans Mezunu", value: "bachelor-grad" },
        { label: "Yüksek Lisans Mezunu", value: "master-grad" },
        { label: "Çalışan", value: "working" },
      ],
    },
    {
      name: "programType",
      type: "select",
      label: "İlgilenilen Program",
      required: true,
      options: [
        { label: "Studienkolleg", value: "studienkolleg" },
        { label: "Lisans (Bachelor)", value: "bachelor" },
        { label: "Yüksek Lisans (Master)", value: "master" },
        { label: "Doktora (PhD)", value: "phd" },
        { label: "Ausbildung", value: "ausbildung" },
        { label: "Almanca Dil Kursu", value: "language" },
        { label: "Henüz Karar Vermedim", value: "undecided" },
      ],
    },
    {
      name: "fieldOfStudy",
      type: "text",
      label: "İlgilenilen Alan / Bölüm",
    },
    {
      name: "germanLevel",
      type: "select",
      label: "Mevcut Almanca Seviyesi",
      options: [
        { label: "Hiç Bilmiyorum", value: "none" },
        { label: "A1", value: "a1" },
        { label: "A2", value: "a2" },
        { label: "B1", value: "b1" },
        { label: "B2", value: "b2" },
        { label: "C1", value: "c1" },
        { label: "C2", value: "c2" },
      ],
    },
    {
      name: "preferredSemester",
      type: "select",
      label: "Tercih Edilen Dönem",
      options: [
        { label: "Kış Dönemi (Wintersemester)", value: "winter" },
        { label: "Yaz Dönemi (Sommersemester)", value: "summer" },
        { label: "En Yakın Dönem", value: "asap" },
      ],
    },
    {
      name: "budget",
      type: "select",
      label: "Bütçe Aralığı",
      options: [
        { label: "Burs Arıyorum", value: "scholarship" },
        { label: "10.000€ altı", value: "under-10k" },
        { label: "10.000€ - 20.000€", value: "10k-20k" },
        { label: "20.000€ üstü", value: "over-20k" },
      ],
    },
    {
      name: "message",
      type: "textarea",
      label: "Ek Notlar / Mesaj",
    },
    {
      name: "source",
      type: "select",
      label: "Bizi Nereden Duydunuz?",
      options: [
        { label: "Google Araması", value: "google" },
        { label: "Instagram", value: "instagram" },
        { label: "YouTube", value: "youtube" },
        { label: "Arkadaş Tavsiyesi", value: "referral" },
        { label: "Fuar / Etkinlik", value: "event" },
        { label: "Diğer", value: "other" },
      ],
    },
    {
      name: "status",
      type: "select",
      label: "Başvuru Durumu",
      options: [
        { label: "Yeni Başvuru", value: "new" },
        { label: "İletişime Geçildi", value: "contacted" },
        { label: "Danışmanlık Başladı", value: "consulting" },
        { label: "Evraklar Hazırlanıyor", value: "documents" },
        { label: "Üniversiteye Başvuruldu", value: "applied" },
        { label: "Kabul Alındı", value: "accepted" },
        { label: "Vize Aşamasında", value: "visa" },
        { label: "Kayıt Tamamlandı", value: "enrolled" },
        { label: "İptal", value: "cancelled" },
      ],
      defaultValue: "new",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "assignedTo",
      type: "relationship",
      label: "Atanan Danışman",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "notes",
      type: "array",
      label: "Danışman Notları",
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
