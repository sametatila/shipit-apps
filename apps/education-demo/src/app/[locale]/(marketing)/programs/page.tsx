import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { JsonLd, courseJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CourseCard } from "@/components/sector/course-card";
import { CTA } from "@/components/sections/cta";
import { Link } from "@/i18n/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { GraduationCap, BookOpen, Award, Wrench, Languages, ArrowRight, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Program type → icon mapping                                        */
/* ------------------------------------------------------------------ */

const programTypeIcons: Record<string, LucideIcon> = {
  studienkolleg: GraduationCap,
  bachelor: BookOpen,
  master: Award,
  ausbildung: Wrench,
  language: Languages,
};

const germanLevelLabels: Record<string, string> = {
  none: "Gerekmiyor",
  a1: "A1 seviye",
  a2: "A2 seviye",
  b1: "B1 seviye",
  b2: "B2 seviye",
  c1: "C1 seviye",
  c2: "C2 seviye",
};

const programTypeDurations: Record<string, string> = {
  studienkolleg: "P1Y",
  bachelor: "P3Y",
  master: "P2Y",
  ausbildung: "P2Y6M",
  language: "P6M",
};

/* ------------------------------------------------------------------ */
/*  Fallback data                                                      */
/* ------------------------------------------------------------------ */

const FALLBACK_PROGRAMS = [
  {
    slug: "studienkolleg",
    title: "Studienkolleg",
    description:
      "Almanya'da üniversite eğitimine hazırlık programı. Türk lise diploması ile doğrudan üniversiteye kabul alamayan öğrenciler için zorunlu hazırlık yılı. Matematik, fen bilimleri veya sosyal bilimler alanında yoğun Almanca eğitimle birlikte akademik temel dersleri içerir.",
    programType: "studienkolleg",
    duration: "1 yıl",
    level: "B1 seviye",
    language: "de",
  },
  {
    slug: "lisans",
    title: "Lisans (Bachelor)",
    description:
      "Almanya'nın dünyaca ünlü üniversitelerinde lisans eğitimi. Mühendislik, tıp, işletme, bilgisayar bilimleri ve daha birçok alanda ücretsiz veya düşük harçlı eğitim imkanı. Uluslararası geçerliliğe sahip diploma ile küresel kariyer fırsatları.",
    programType: "bachelor",
    duration: "3-4 yıl",
    level: "C1 seviye",
    language: "de",
  },
  {
    slug: "yuksek-lisans",
    title: "Yüksek Lisans (Master)",
    description:
      "Alanında uzmanlaşmak isteyen mezunlar için Almanya'da yüksek lisans programları. İngilizce ve Almanca seçenekleriyle 300'den fazla üniversitede 10.000'i aşkın program. Araştırma odaklı veya uygulamalı master seçenekleri mevcuttur.",
    programType: "master",
    duration: "2 yıl",
    level: "B2-C1 seviye",
    language: "de",
  },
  {
    slug: "ausbildung",
    title: "Ausbildung (Mesleki Eğitim)",
    description:
      "Almanya'nın dünyaca ünlü ikili mesleki eğitim sistemi. Haftanın bir kısmı okulda teorik eğitim, diğer kısmı işletmede pratik uygulama. Eğitim süresince maaş alarak 350'den fazla meslek dalında sertifika sahibi olun.",
    programType: "ausbildung",
    duration: "2-3 yıl",
    level: "B1-B2 seviye",
    language: "de",
  },
  {
    slug: "almanca-dil-kurslari",
    title: "Almanca Dil Kursları",
    description:
      "A1'den C2'ye kadar tüm seviyelerde yoğun Almanca dil eğitimi. Goethe-Institut, TestDaF ve DSH sınavlarına hazırlık programları. Almanya'da veya Türkiye'de yüz yüze ve online eğitim seçenekleri ile hedefinize en hızlı şekilde ulaşın.",
    programType: "language",
    duration: "3-12 ay",
    level: "A1-C2",
    language: "de",
  },
];

/* ------------------------------------------------------------------ */
/*  Data Fetching                                                      */
/* ------------------------------------------------------------------ */

interface ProgramData {
  slug: string;
  title: string;
  description: string;
  programType: string;
  duration: string;
  level: string;
  language: string;
}

async function getPrograms(): Promise<ProgramData[]> {
  try {
    const payload = await getPayload({ config });
    const { docs: courses } = await payload.find({
      collection: "courses",
      where: {
        status: { equals: "active" },
      },
      sort: "sortOrder",
      limit: 100,
    });

    if (courses.length === 0) return FALLBACK_PROGRAMS;

    return courses.map((course) => ({
      slug: course.slug as string,
      title: course.title as string,
      description: (course.shortDescription as string) || "",
      programType: (course.programType as string) || "studienkolleg",
      duration: (course.duration as string) || "",
      level: course.germanLevel
        ? germanLevelLabels[course.germanLevel as string] || (course.germanLevel as string)
        : "",
      language: (course.language as string) || "de",
    }));
  } catch {
    return FALLBACK_PROGRAMS;
  }
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Eğitim Programları",
    description: "Almanya'daki tüm eğitim programları: Studienkolleg, lisans, yüksek lisans, Ausbildung ve Almanca dil kursları hakkında detaylı bilgi edinin.",
    path: "/programs",
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ProgramsPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();
  const programs = await getPrograms();

  const jsonLdData = programs.map((program) =>
    courseJsonLd({
      name: program.title,
      description: program.description,
      provider: { name: siteConfig.name, url: siteConfig.url },
      url: `${siteConfig.url}/programs/${program.slug}`,
      duration: programTypeDurations[program.programType] || "P1Y",
      language: program.language,
    })
  );

  return (
    <>
      {jsonLdData.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}

      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Eğitim Programları" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Almanya Eğitim Fırsatları
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl mt-4">
            Eğitim Programları
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Almanya&apos;da eğitim hayalinizi gerçeğe dönüştürün. Studienkolleg&apos;den yüksek lisansa,
            Ausbildung&apos;dan dil kurslarına kadar tüm programlarda yanınızdayız.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <CourseCard
                key={program.slug}
                title={program.title}
                description={program.description}
                icon={programTypeIcons[program.programType] || GraduationCap}
                duration={program.duration}
                level={program.level}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Uygunluk Testi Banner - Şerit Tasarım */}
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
                  Eğitim geçmişiniz ve kariyer hedeflerinize göre en uygun programı belirleyin.
                </p>
              </div>
            </div>
            <Link
              href="/eligibility-check"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Uygunluk Testi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        title="Hangi Program Size Uygun?"
        description="Ücretsiz danışmanlık görüşmesi ile size en uygun eğitim programını birlikte belirleyelim. Uzman ekibimiz tüm süreçte yanınızda."
      />
    </>
  );
}
