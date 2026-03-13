import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Ad Soyad",
    },
    {
      name: "role",
      type: "select",
      label: "Rol",
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editör", value: "editor" },
      ],
    },
  ],
};
