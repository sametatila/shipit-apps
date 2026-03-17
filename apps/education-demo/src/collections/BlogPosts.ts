import type { CollectionConfig } from "payload";
import { seoFields } from "@shipit/seo/payload";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt"],
    group: "İçerik",
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
      name: "markdownBody",
      type: "textarea",
      label: "İçerik (Markdown)",
      admin: {
        description: "Blog yazısının tam içeriği. Markdown formatında yazabilirsiniz.",
      },
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
    seoFields() as any,
  ],
};
