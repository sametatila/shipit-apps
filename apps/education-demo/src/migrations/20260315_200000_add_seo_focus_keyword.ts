import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add focusKeyword to all collections that have SEO fields
  const tables = [
    "pages",
    "blog_posts",
    "courses",
    "universities",
    "success_stories",
  ];

  for (const table of tables) {
    await db.execute(
      sql.raw(
        `ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "seo_focus_keyword" varchar;`,
      ),
    );
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const tables = [
    "pages",
    "blog_posts",
    "courses",
    "universities",
    "success_stories",
  ];

  for (const table of tables) {
    await db.execute(
      sql.raw(
        `ALTER TABLE "${table}" DROP COLUMN IF EXISTS "seo_focus_keyword";`,
      ),
    );
  }
}
