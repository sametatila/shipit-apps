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
          { value: "2000", suffix: "+", label: t("home.stats.happyCustomers") },
          { value: "8", suffix: "+", label: t("home.stats.yearsExperience") },
          { value: "40", suffix: "+", label: t("home.stats.completedProjects") },
          { value: "12", suffix: "+", label: t("home.stats.expertTeam") },
        ]}
      />

      <Team
        title={t("about.teamTitle")}
        subtitle={t("about.teamSubtitle")}
        members={[
          { name: "Dr. Elif Kaya", role: "Kurucu & Genel Müdür", bio: "Heidelberg Üniversitesi mezunu, 12 yıllık Almanya eğitim danışmanlığı deneyimi. DAAD bursiyeri.", image: "/images/team/elif-kaya.svg" },
          { name: "Ahmet Schneider", role: "Üniversite Yerleştirme Uzmanı", bio: "TU Berlin mezunu, 40'tan fazla Alman üniversitesiyle doğrudan iletişimde. Studienkolleg ve lisans başvuru uzmanı.", image: "/images/team/ahmet-schneider.svg" },
          { name: "Selin Yılmaz", role: "Ausbildung Danışmanı", bio: "Hamburg'da yaşamış, Alman iş piyasası ve Ausbildung sistemi konusunda uzman. Firma eşleştirme ve vize süreç yönetimi.", image: "/images/team/selin-yilmaz.svg" },
          { name: "Markus Weber", role: "Almanca Eğitim Koordinatörü", bio: "Anadili Almanca, Goethe-Institut sertifikalı. TestDaF ve DSH hazırlık programları sorumlusu.", image: "/images/team/markus-weber.svg" },
        ]}
      />

      <CTA
        title={t("about.ctaTitle")}
        description={t("about.ctaDescription")}
      />
    </>
  );
}
