import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CTA } from "@/components/sections/cta";
import { Roadmap } from "@/components/sections/roadmap";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Yol Haritası | Almanya Eğitim Süreci",
    description: "Almanya'da üniversiteye yerleşme sürecinde izleyeceğiniz adım adım yol haritası. Belge hazırlığından Almanya'ya yerleşime kadar tüm süreç.",
    path: "/roadmap",
  });
}

export default async function RoadmapPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  return (
    <>
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Yol Haritası" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 pb-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Adım Adım Süreç
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl mt-4">
            Almanya Eğitim Yol Haritası
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Başvuru sürecinizden Almanya&apos;ya yerleşime kadar tüm adımları
            planlıyoruz. Her aşamada yanınızdayız.
          </p>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <Roadmap />

      {/* CTA */}
      <CTA
        title="Sürecinizi Birlikte Planlayalım"
        description="Ücretsiz danışmanlık görüşmesiyle size özel yol haritanızı oluşturalım. İlk adımı bugün atın."
      />
    </>
  );
}
