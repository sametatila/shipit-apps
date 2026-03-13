import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Features } from "@/components/sections/features";
import { CTA } from "@/components/sections/cta";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: t("servicesTitle"),
    description: t("servicesDescription", { siteName: siteConfig.name }),
    path: "/services",
  });
}

export default async function ServicesPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  return (
    <>
      <div className="container mx-auto px-4">
        <Breadcrumbs baseUrl={siteConfig.url} items={[{ label: t("common.home"), href: "/" }, { label: t("services.title") }]} />
      </div>
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("services.subtitle")}
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl mt-4">
            {t("services.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.description")}
          </p>
        </div>
      </section>

      <Features
        title={t("services.sectionTitle")}
        features={[
          { title: t("services.consulting.title"), description: t("services.consulting.description"), icon: "Lightbulb" },
          { title: t("services.design.title"), description: t("services.design.description"), icon: "Palette" },
          { title: t("services.implementation.title"), description: t("services.implementation.description"), icon: "Wrench" },
          { title: t("services.analysis.title"), description: t("services.analysis.description"), icon: "BarChart3" },
          { title: t("services.techSupport.title"), description: t("services.techSupport.description"), icon: "Settings" },
          { title: t("services.customerService.title"), description: t("services.customerService.description"), icon: "Headphones" },
        ]}
      />

      <CTA title={t("services.ctaTitle")} description={t("services.ctaDescription")} />
    </>
  );
}
