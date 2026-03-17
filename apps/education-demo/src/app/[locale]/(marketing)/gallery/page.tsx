import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { ImageGallery } from "@/components/shared/image-gallery";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: t("galleryTitle"),
    description: t("galleryDescription", { siteName: siteConfig.name }),
    path: "/gallery",
  });
}

const fallbackImages = [
  {
    src: "/images/gallery/gallery-1.svg",
    alt: "Alman üniversite kampüsü - Modern mimari, geniş avlu ve yürüyen öğrenciler",
  },
  {
    src: "/images/gallery/gallery-2.svg",
    alt: "Studienkolleg dersi - Sınıf ortamında eğitmen ve uluslararası öğrenciler",
  },
  {
    src: "/images/gallery/gallery-3.svg",
    alt: "Berlin şehir manzarası - Brandenburg Kapısı veya Reichstag binası önünde öğrenciler",
  },
  {
    src: "/images/gallery/gallery-4.svg",
    alt: "Alman üniversite kütüphanesi - Modern kütüphanede çalışan öğrenciler, kitaplıklar ve bilgisayarlar",
  },
  {
    src: "/images/gallery/gallery-5.svg",
    alt: "Mezuniyet töreni - Almanya'da mezun olan Türk öğrenciler, kep atma anı",
  },
  {
    src: "/images/gallery/gallery-6.svg",
    alt: "Danışmanlık ofisi - Öğrenci ve danışman arasında birebir görüşme, profesyonel ortam",
  },
  {
    src: "/images/gallery/gallery-7.svg",
    alt: "Almanca dil kursu - Küçük grup dersi, interaktif whiteboard ve konuşma pratiği",
  },
  {
    src: "/images/gallery/gallery-8.svg",
    alt: "München şehir manzarası - Marienplatz meydanı veya Englischer Garten parkında öğrenci hayatı",
  },
];

async function getGalleryImages(): Promise<{ src: string; alt: string }[]> {
  try {
    const { getPayload } = await import("payload");
    const config = await import("@/payload.config");
    const payload = await getPayload({ config: config.default });

    const galleries = await payload.find({
      collection: "galleries" as any,
      where: { status: { equals: "published" } },
      limit: 100,
      sort: "-createdAt",
    });

    if (galleries.docs.length === 0) return fallbackImages;

    const images: { src: string; alt: string }[] = [];
    for (const gallery of galleries.docs) {
      const galleryImages = gallery.images as any[];
      if (!galleryImages) continue;
      for (const item of galleryImages) {
        const media = item.image;
        if (!media) continue;
        const src = typeof media === "object" && media.url ? media.url : null;
        if (!src) continue;
        images.push({
          src,
          alt: item.caption || (typeof media === "object" && media.alt) || gallery.title || "",
        });
      }
    }

    return images.length > 0 ? images : fallbackImages;
  } catch {
    return fallbackImages;
  }
}

export default async function GalleryPage() {
  const t = await getTranslations("gallery");
  const tCommon = await getTranslations();
  const siteConfig = await getSiteConfig();
  const images = await getGalleryImages();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Breadcrumbs baseUrl={siteConfig.url} items={[{ label: tCommon("common.home"), href: "/" }, { label: t("title") }]} />
        <div className="text-center space-y-4 mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("subtitle")}
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>
        <ImageGallery images={images} columns={3} />
      </div>
    </section>
  );
}
