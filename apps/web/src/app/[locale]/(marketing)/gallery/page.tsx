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

const images = [
  { src: "/images/gallery-1.jpg", alt: "Gallery 1" },
  { src: "/images/gallery-2.jpg", alt: "Gallery 2" },
  { src: "/images/gallery-3.jpg", alt: "Gallery 3" },
  { src: "/images/gallery-4.jpg", alt: "Gallery 4" },
  { src: "/images/gallery-5.jpg", alt: "Gallery 5" },
  { src: "/images/gallery-6.jpg", alt: "Gallery 6" },
];

export default async function GalleryPage() {
  const t = await getTranslations("gallery");
  const tCommon = await getTranslations();
  const siteConfig = await getSiteConfig();

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
