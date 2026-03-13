import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Stats } from "@/components/sections/stats";
import { Team } from "@/components/sections/team";
import { CTA } from "@/components/sections/cta";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: t("aboutTitle"),
    description: t("aboutDescription", { siteName: siteConfig.name }),
    path: "/about",
  });
}

export default async function AboutPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  return (
    <>
      <div className="container mx-auto px-4">
        <Breadcrumbs baseUrl={siteConfig.url} items={[{ label: t("common.home"), href: "/" }, { label: t("about.title") }]} />
      </div>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t("about.subtitle")}
            </p>
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              {t("about.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("about.description")}
            </p>
          </div>
        </div>
      </section>

      <Stats
        title={t("about.statsTitle")}
        stats={[
          { value: "500", suffix: "+", label: t("home.stats.happyCustomers") },
          { value: "10", suffix: "+", label: t("home.stats.yearsExperience") },
          { value: "50", suffix: "+", label: t("home.stats.completedProjects") },
          { value: "15", suffix: "+", label: t("home.stats.expertTeam") },
        ]}
      />

      <Team
        title={t("about.teamTitle")}
        subtitle={t("about.teamSubtitle")}
        members={[
          { name: "Ali Yıldız", role: "Kurucu & CEO", bio: "10 yıllık sektör deneyimi" },
          { name: "Ayşe Kara", role: "Operasyon Müdürü", bio: "Müşteri ilişkileri uzmanı" },
          { name: "Burak Öztürk", role: "Teknik Müdür", bio: "Teknik çözüm ve planlama" },
        ]}
      />

      <CTA
        title={t("about.ctaTitle")}
        description={t("about.ctaDescription")}
      />
    </>
  );
}
