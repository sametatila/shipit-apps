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
import { MenuItems } from "./collections/MenuItems";
import { Rooms } from "./collections/Rooms";
import { Products } from "./collections/Products";
import { Projects } from "./collections/Projects";
import { PracticeAreas } from "./collections/PracticeAreas";
import { Courses } from "./collections/Courses";
import { Universities } from "./collections/Universities";
import { SuccessStories } from "./collections/SuccessStories";
import { Applications } from "./collections/Applications";
import { Testimonials } from "./collections/Testimonials";
import { BlogPosts } from "./collections/BlogPosts";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Ortak collection'lar - her template'de bulunur
const coreCollections = [Users, Media, Pages, Testimonials, BlogPosts];

// Sektörel collection eşlemesi
const sectorCollections: Record<string, typeof coreCollections> = {
  restaurant: [MenuItems],
  hotel: [Rooms],
  ecommerce: [Products],
  construction: [Projects],
  lawyer: [PracticeAreas],
  education: [Courses, Universities, SuccessStories, Applications],
  corporate: [],
};

// SHIPIT_TEMPLATE env ile hangi sektörün collection'ları yüklenecek belirlenir
// Boşsa tüm collection'lar yüklenir (geliştirme modu)
const template = process.env.SHIPIT_TEMPLATE;
const extraCollections = template && sectorCollections[template]
  ? sectorCollections[template]
  : [MenuItems, Rooms, Products, Projects, PracticeAreas, Courses, Universities, SuccessStories, Applications]; // dev: hepsi

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [...coreCollections, ...extraCollections],
  globals: [SiteSettings],
  graphQL: {
    disable: process.env.DISABLE_GRAPHQL === "true",
    schemaOutputFile: path.resolve(dirname, "generated-schema.graphql"),
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "build-time-placeholder-secret-not-for-production",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        "postgresql://postgres:postgres@localhost:5432/shipit",
    },
  }),
  sharp,
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        defaultFromAddress: process.env.RESEND_FROM_EMAIL || "noreply@example.com",
        defaultFromName: process.env.RESEND_FROM_NAME || "ShipIt",
        apiKey: process.env.RESEND_API_KEY,
      })
    : nodemailerAdapter({
        defaultFromAddress: "dev@localhost",
        defaultFromName: "ShipIt Dev",
      }),
});
