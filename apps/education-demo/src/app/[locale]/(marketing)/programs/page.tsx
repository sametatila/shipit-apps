import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { JsonLd, courseJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CourseCard } from "@/components/sector/course-card";
import { CTA } from "@/components/sections/cta";
import { GraduationCap, BookOpen, Award, Lightbulb, Wrench, Languages, Globe } from "lucide-react";

const programs = [
  {
    slug: "studienkolleg",
    title: "Studienkolleg",
    description:
      "Almanya'da üniversite eğitimine hazırlık programı. Türk lise diploması ile doğrudan üniversiteye kabul alamayan öğrenciler için zorunlu hazırlık yılı. Matematik, fen bilimleri veya sosyal bilimler alanında yoğun Almanca eğitimle birlikte akademik temel dersleri içerir.",
    icon: GraduationCap,
    duration: "1 yıl",
    level: "B1 seviye",
    language: "de",
    timeRequired: "P1Y",
  },
  {
    slug: "lisans",
    title: "Lisans (Bachelor)",
    description:
      "Almanya'nın dünyaca ünlü üniversitelerinde lisans eğitimi. Mühendislik, tıp, işletme, bilgisayar bilimleri ve daha birçok alanda ücretsiz veya düşük harçlı eğitim imkanı. Uluslararası geçerliliğe sahip diploma ile küresel kariyer fırsatları.",
    icon: BookOpen,
    duration: "3-4 yıl",
    level: "C1 seviye",
    language: "de",
    timeRequired: "P3Y",
  },
  {
    slug: "yuksek-lisans",
    title: "Yüksek Lisans (Master)",
    description:
      "Alanında uzmanlaşmak isteyen mezunlar için Almanya'da yüksek lisans programları. İngilizce ve Almanca seçenekleriyle 300'den fazla üniversitede 10.000'i aşkın program. Araştırma odaklı veya uygulamalı master seçenekleri mevcuttur.",
    icon: Award,
    duration: "2 yıl",
    level: "B2-C1 seviye",
    language: "de",
    timeRequired: "P2Y",
  },
  {
    slug: "doktora",
    title: "Doktora (PhD)",
    description:
      "Almanya'da doktora programları ile akademik kariyerinizi zirveye taşıyın. Max Planck, Fraunhofer gibi dünyaca ünlü araştırma enstitülerinde çalışma imkanı. Doktora öğrencilerine maaşlı pozisyonlar ve araştırma bursları sunulmaktadır.",
    icon: Lightbulb,
    duration: "3-5 yıl",
    level: "C1 seviye",
    language: "de",
    timeRequired: "P4Y",
  },
  {
    slug: "ausbildung",
    title: "Ausbildung (Mesleki Eğitim)",
    description:
      "Almanya'nın dünyaca ünlü ikili mesleki eğitim sistemi. Haftanın bir kısmı okulda teorik eğitim, diğer kısmı işletmede pratik uygulama. Eğitim süresince maaş alarak 350'den fazla meslek dalında sertifika sahibi olun.",
    icon: Wrench,
    duration: "2-3 yıl",
    level: "B1-B2 seviye",
    language: "de",
    timeRequired: "P2Y6M",
  },
  {
    slug: "almanca-dil-kurslari",
    title: "Almanca Dil Kursları",
    description:
      "A1'den C2'ye kadar tüm seviyelerde yoğun Almanca dil eğitimi. Goethe-Institut, TestDaF ve DSH sınavlarına hazırlık programları. Almanya'da veya Türkiye'de yüz yüze ve online eğitim seçenekleri ile hedefinize en hızlı şekilde ulaşın.",
    icon: Languages,
    duration: "3-12 ay",
    level: "A1-C2",
    language: "de",
    timeRequired: "P6M",
  },
  {
    slug: "yaz-okulu",
    title: "Yaz Okulu (Summer School)",
    description:
      "Almanya'yı kısa süreli deneyimlemek isteyenler için yaz okulu programları. Alman üniversitelerinde akademik dersler, dil kursları ve kültürel aktiviteler. Almanya'da eğitim almayı düşünenler için mükemmel bir ön deneyim fırsatı.",
    icon: Globe,
    duration: "4-8 hafta",
    level: "B1 seviye",
    language: "de",
    timeRequired: "P6W",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Eğitim Programları",
    description: "Almanya'daki tüm eğitim programları: Studienkolleg, lisans, yüksek lisans, doktora, Ausbildung, dil kursları ve yaz okulları hakkında detaylı bilgi edinin.",
    path: "/programs",
  });
}

export default async function ProgramsPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  const jsonLdData = programs.map((program) =>
    courseJsonLd({
      name: program.title,
      description: program.description,
      provider: { name: siteConfig.name, url: siteConfig.url },
      url: `${siteConfig.url}/programs/${program.slug}`,
      duration: program.timeRequired,
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
            Almanya&apos;da eğitim hayalinizi gerçeğe dönüştürün. Studienkolleg&apos;den doktoraya,
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
                icon={program.icon}
                href={`/programs/${program.slug}`}
                duration={program.duration}
                level={program.level}
              />
            ))}
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
