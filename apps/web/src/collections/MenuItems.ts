import type { CollectionConfig } from "payload";

export const MenuItems: CollectionConfig = {
  slug: "menu-items",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "isAvailable"],
    group: "Restoran",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Ürün Adı",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Açıklama",
    },
    {
      name: "price",
      type: "number",
      label: "Fiyat (TL)",
      required: true,
      min: 0,
    },
    {
      name: "category",
      type: "select",
      label: "Kategori",
      required: true,
      options: [
        { label: "Kebaplar", value: "kebaplar" },
        { label: "Pideler", value: "pideler" },
        { label: "Lahmacun", value: "lahmacun" },
        { label: "Çorbalar", value: "corbalar" },
        { label: "Salatalar", value: "salatalar" },
        { label: "Tatlılar", value: "tatlilar" },
        { label: "İçecekler", value: "icecekler" },
        { label: "Başlangıçlar", value: "baslangiclar" },
        { label: "Ana Yemekler", value: "ana-yemekler" },
        { label: "Izgara", value: "izgara" },
      ],
    },
    {
      name: "image",
      type: "upload",
      label: "Ürün Görseli",
      relationTo: "media",
    },
    {
      name: "isAvailable",
      type: "checkbox",
      label: "Mevcut mu?",
      defaultValue: true,
    },
    {
      name: "isPopular",
      type: "checkbox",
      label: "Popüler Ürün",
      defaultValue: false,
    },
    {
      name: "isNew",
      type: "checkbox",
      label: "Yeni Ürün",
      defaultValue: false,
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
  ],
};
