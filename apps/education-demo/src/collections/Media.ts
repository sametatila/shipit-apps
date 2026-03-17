import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    mimeTypes: ["image/*", "video/*", "application/pdf"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 512,
        position: "centre",
      },
      {
        name: "hero",
        width: 1920,
        height: 1080,
        position: "centre",
      },
    ],
  },
  admin: {
    useAsTitle: "alt",
    group: "Sistem",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt Metin",
      required: true,
    },
  ],
};
