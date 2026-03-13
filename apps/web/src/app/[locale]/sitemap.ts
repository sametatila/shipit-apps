import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/get-site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteConfig = await getSiteConfig();
  const baseUrl = siteConfig.url;
  const enabledLocales = siteConfig.i18n.enabledLocales;
  const defaultLocale = siteConfig.i18n.defaultLocale;

  const staticPages = ["", "/about", "/services", "/gallery", "/contact"];
  const entries: MetadataRoute.Sitemap = [];

  // Statik sayfalar
  for (const path of staticPages) {
    const alternates = buildAlternates(baseUrl, path, enabledLocales, defaultLocale);
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
      alternates: enabledLocales.length > 1 ? { languages: alternates } : undefined,
    });

    for (const locale of enabledLocales) {
      if (locale === defaultLocale) continue;
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 0.9 : 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  // Dinamik CMS içerikleri
  try {
    const { getPayload } = await import("payload");
    const config = await import("@/payload.config");
    const payload = await getPayload({ config: config.default });

    // Blog yazıları (varsa)
    try {
      const posts = await payload.find({
        collection: "blog-posts",
        limit: 1000,
        where: { status: { equals: "published" } },
      });
      for (const post of posts.docs) {
        const slug = (post as any).slug;
        if (!slug) continue;
        const path = `/blog/${slug}`;
        const alternates = buildAlternates(baseUrl, path, enabledLocales, defaultLocale);
        entries.push({
          url: `${baseUrl}${path}`,
          lastModified: new Date(post.updatedAt),
          changeFrequency: "weekly",
          priority: 0.7,
          alternates: enabledLocales.length > 1 ? { languages: alternates } : undefined,
        });
      }
    } catch {
      // Collection mevcut değilse atla
    }
  } catch {
    // Payload erişilemezse sadece statik sayfaları döndür
  }

  return entries;
}

function buildAlternates(
  baseUrl: string,
  path: string,
  locales: string[],
  defaultLocale: string
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    const prefix = locale === defaultLocale ? "" : `/${locale}`;
    alternates[locale] = `${baseUrl}${prefix}${path}`;
  }
  return alternates;
}
