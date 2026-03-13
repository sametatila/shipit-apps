import type { CollectionConfig } from "payload";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt"],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
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
      name: "excerpt",
      type: "textarea",
      label: "Özet",
      maxLength: 300,
    },
    {
      name: "content",
      type: "richText",
      label: "İçerik",
    },
    {
      name: "featuredImage",
      type: "upload",
      label: "Öne Çıkan Görsel",
      relationTo: "media",
    },
    {
      name: "category",
      type: "text",
      label: "Kategori",
    },
    {
      name: "tags",
      type: "array",
      label: "Etiketler",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "author",
      type: "relationship",
      label: "Yazar",
      relationTo: "users",
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Yayın Tarihi",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      label: "Durum",
      defaultValue: "draft",
      options: [
        { label: "Taslak", value: "draft" },
        { label: "Yayında", value: "published" },
      ],
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
