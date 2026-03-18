import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_galleries_status" AS ENUM('draft', 'published');

    CREATE TABLE IF NOT EXISTS "galleries" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "description" varchar,
      "status" "enum_galleries_status" DEFAULT 'draft',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "galleries_images" (
      "id" serial PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "image_id" integer NOT NULL,
      "caption" varchar
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "galleries_slug_idx" ON "galleries" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "galleries_created_at_idx" ON "galleries" USING btree ("created_at");

    CREATE INDEX IF NOT EXISTS "galleries_images_order_idx" ON "galleries_images" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "galleries_images_parent_id_idx" ON "galleries_images" USING btree ("_parent_id");

    ALTER TABLE "galleries_images"
      ADD CONSTRAINT "galleries_images_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

    ALTER TABLE "galleries_images"
      ADD CONSTRAINT "galleries_images_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "galleries"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "galleries_images";
    DROP TABLE IF EXISTS "galleries";
    DROP TYPE IF EXISTS "enum_galleries_status";
  `);
}
