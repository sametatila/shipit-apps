import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Courses } from "./collections/Courses";
import { Universities } from "./collections/Universities";
import { SuccessStories } from "./collections/SuccessStories";
import { Applications } from "./collections/Applications";
import { Testimonials } from "./collections/Testimonials";
import { BlogPosts } from "./collections/BlogPosts";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Courses,
    Universities,
    SuccessStories,
    Applications,
    Testimonials,
    BlogPosts,
  ],
  globals: [SiteSettings],
  graphQL: {
    disable: process.env.DISABLE_GRAPHQL === "true",
    schemaOutputFile: path.resolve(dirname, "generated-schema.graphql"),
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? (() => { throw new Error("PAYLOAD_SECRET environment variable is required"); })(),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        "postgresql://postgres:postgres@localhost:5432/education_demo",
    },
  }),
  sharp,
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        defaultFromAddress: process.env.RESEND_FROM_EMAIL || "noreply@example.com",
        defaultFromName: process.env.RESEND_FROM_NAME || "Almanya Eğitim Danışmanlığı",
        apiKey: process.env.RESEND_API_KEY,
      })
    : nodemailerAdapter({
        defaultFromAddress: "dev@localhost",
        defaultFromName: "Almanya Eğitim Dev",
      }),
});
