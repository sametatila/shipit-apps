import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CTA } from "@/components/sections/cta";
import { Roadmap } from "@/components/sections/roadmap";
import { Link } from "@/i18n/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";

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

      {/* Uygunluk Testi Banner */}
      <section className="bg-primary/5 border-y">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">
                  Hangi program size uygun? 2 dakikada öğrenin!
                </p>
                <p className="text-sm text-muted-foreground">
                  Eğitim geçmişinize göre en uygun programı belirleyin.
                </p>
              </div>
            </div>
            <Link
              href="/eligibility-check"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 shrink-0"
            >
              Uygunluk Testi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Sürecinizi Birlikte Planlayalım"
        description="Ücretsiz danışmanlık görüşmesiyle size özel yol haritanızı oluşturalım. İlk adımı bugün atın."
      />
    </>
  );
}
