import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "inStock"],
    group: "E-Ticaret",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Ürün Adı",
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
      type: "richText",
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
      name: "salePrice",
      type: "number",
      label: "İndirimli Fiyat (TL)",
      min: 0,
    },
    {
      name: "category",
      type: "text",
      label: "Kategori",
      required: true,
    },
    {
      name: "images",
      type: "array",
      label: "Ürün Görselleri",
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
      name: "sku",
      type: "text",
      label: "SKU / Stok Kodu",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "inStock",
      type: "checkbox",
      label: "Stokta var mı?",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "weight",
      type: "number",
      label: "Ağırlık (g)",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
