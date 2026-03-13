import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { EligibilityChecker } from "@/components/sector/eligibility-checker";
import { CTA } from "@/components/sections/cta";
import { CheckCircle, Clock, Shield } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Uygunluk Testi",
    description:
      "Almanya'da hangi eğitim programına uygunsunuz? 2 dakikada profilinize en uygun programı öğrenin. Ücretsiz uygunluk testi.",
    path: "/eligibility-check",
  });
}

export default async function EligibilityCheckPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  return (
    <>
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Uygunluk Testi" },
          ]}
        />
      </div>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Ücretsiz Analiz
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Almanya&apos;da Hangi Program Size Uygun?
            </h1>
            <p className="text-lg text-muted-foreground">
              Eğitim geçmişiniz, Almanca seviyeniz ve hedeflerinize göre size en
              uygun Almanya eğitim programını 2 dakikada belirleyin.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />2 Dakika
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Tamamen Ücretsiz
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Kişisel Analiz
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <EligibilityChecker />
        </div>
      </section>

      <CTA
        title="Sonucunuzu Uzmanlarımızla Değerlendirin"
        description="Uygunluk testi sonucunuzu danışman ekibimizle birlikte değerlendirip, size özel eğitim planı oluşturalım."
        buttonText="Ücretsiz Danışmanlık Al"
        buttonHref="/apply"
      />
    </>
  );
}
