import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Kullanıcı",
    plural: "Kullanıcılar",
  },
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Sistem",
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
