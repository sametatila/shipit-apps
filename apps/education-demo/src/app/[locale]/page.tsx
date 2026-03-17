import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Pricing } from "@/components/sections/pricing";
import { JsonLd, educationalOrganizationJsonLd, faqJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Link } from "@/i18n/navigation";
import { Badge } from "@shipit/ui/badge";
import {
  GraduationCap,
  BookOpen,
  Award,
  Wrench,
  Languages,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { UniversityLogoSlider } from "@/components/sections/university-logo-slider";
import { getPayload } from "payload";
import config from "@/payload.config";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Mappings                                                           */
/* ------------------------------------------------------------------ */

const programTypeIcons: Record<string, LucideIcon> = {
  studienkolleg: GraduationCap,
  bachelor: BookOpen,
  master: Award,
  ausbildung: Wrench,
  language: Languages,
};

/* ------------------------------------------------------------------ */
/*  Fallback data                                                      */
/* ------------------------------------------------------------------ */

const FALLBACK_PROGRAMS = [
  { icon: GraduationCap, title: "Studienkolleg", desc: "1 yıllık üniversite hazırlık programı", badge: "B1 Almanca" },
  { icon: BookOpen, title: "Lisans (Bachelor)", desc: "Devlet üniversitelerinde ücretsiz eğitim", badge: "3-4 Yıl" },
  { icon: Award, title: "Yüksek Lisans (Master)", desc: "İngilizce ve Almanca program seçenekleri", badge: "2 Yıl" },
  { icon: Wrench, title: "Ausbildung", desc: "Maaşlı mesleki eğitim (800-1.200€/ay)", badge: "2-3 Yıl" },
  { icon: Languages, title: "Almanca Kursları", desc: "A1'den C2'ye, TestDaF & DSH hazırlık", badge: "3-12 Ay" },
];

const FALLBACK_TESTIMONIALS = [
  {
    name: "Elif Yıldırım",
    role: "TU München - Makine Mühendisliği",
    content: "Studienkolleg sürecinden üniversite başvurusuna kadar her adımda yanımdaydılar. Şimdi TU München'de hayallerimin bölümünde okuyorum. Vize sürecindeki destekleri olmasaydı bu kadar kolay olmazdı.",
    rating: 5,
  },
  {
    name: "Burak Arslan",
    role: "Ausbildung - Berlin, IT-Systemelektroniker",
    content: "Lisans yerine Ausbildung tercih ettim ve çok doğru bir karardı. Firma eşleştirmesinden Almanca kursuna kadar her şeyi organize ettiler. Şimdi Berlin'de hem eğitim alıyor hem maaş kazanıyorum.",
    rating: 5,
  },
  {
    name: "Zeynep Koç",
    role: "Veli - Kızı Heidelberg Üniversitesi'nde",
    content: "Kızımızın Almanya'da üniversite okuması için danışmanlık aldık. Sperrkonto'dan vize randevusuna, Anmeldung'dan sağlık sigortasına kadar tüm süreçte bize rehberlik ettiler. Çok teşekkür ederiz.",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Data Fetching                                                      */
/* ------------------------------------------------------------------ */

interface ProgramPreview {
  icon: LucideIcon;
  title: string;
  desc: string;
  badge: string;
}

interface TestimonialData {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const germanLevelLabels: Record<string, string> = {
  none: "Gerekmiyor",
  a1: "A1 Almanca",
  a2: "A2 Almanca",
  b1: "B1 Almanca",
  b2: "B2 Almanca",
  c1: "C1 Almanca",
  c2: "C2 Almanca",
};

const programTypeLabels: Record<string, string> = {
  studienkolleg: "Studienkolleg",
  bachelor: "Lisans",
  master: "Master",
  ausbildung: "Ausbildung",
  language: "Dil Kursu",
};

async function getHomepagePrograms(): Promise<ProgramPreview[]> {
  try {
    const payload = await getPayload({ config });
    const { docs: courses } = await payload.find({
      collection: "courses",
      where: {
        status: { equals: "active" },
      },
      sort: "sortOrder",
      limit: 6,
    });

    if (courses.length === 0) return FALLBACK_PROGRAMS;

    return courses.map((course) => ({
      icon: programTypeIcons[course.programType as string] || GraduationCap,
      title: course.title as string,
      desc: (course.shortDescription as string) || "",
      badge: course.duration
        ? (course.duration as string)
        : course.germanLevel
          ? germanLevelLabels[course.germanLevel as string] || ""
          : "",
    }));
  } catch {
    return FALLBACK_PROGRAMS;
  }
}

interface PricingPlanData {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

const FALLBACK_PRICING: PricingPlanData[] = [
  {
    name: "Basic Paket",
    price: "",
    description: "Üniversite başvuru sürecinizi profesyonel destekle başlatın.",
    features: [
      "Üniversite başvuru dosyası hazırlama",
      "%100 kabul garantisi",
      "1 üniversiteye başvuru",
      "Anlaşmalı dil kursu desteği",
    ],
    ctaText: "Başvuru Yap",
  },
  {
    name: "Standart Paket",
    price: "",
    description: "Başvurudan vize sürecine kadar uçtan uca danışmanlık.",
    features: [
      "Vize dosyası hazırlama ve randevu",
      "WhatsApp grubu & Zoom toplantısı",
      "Vize kabul ve iade garantisi",
      "En uygun 3 dil kursu desteği",
    ],
    ctaText: "Başvuru Yap",
    popular: true,
  },
  {
    name: "Premium Paket",
    price: "",
    description: "Türkiye'den Almanya'ya tam kapsamlı premium hizmet.",
    features: [
      "3 üniversiteye başvuru",
      "%100 vize kabul ve iade garantisi",
      "Adres kaydı ve oturum desteği",
      "İlk 6 ay iletişim desteği",
    ],
    ctaText: "Başvuru Yap",
  },
];

async function getHomepagePricing(): Promise<PricingPlanData[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "service-packages" as any,
      where: { status: { equals: "active" } },
      sort: "sortOrder",
      limit: 3,
    });

    if (docs.length === 0) return FALLBACK_PRICING;

    return (docs as any[]).map((doc) => {
      const price = doc.price as number;
      const currency = (doc.currency as string) || "EUR";
      const formattedPrice =
        currency === "EUR"
          ? `${price.toLocaleString("tr-TR")}€`
          : `₺${price.toLocaleString("tr-TR")}`;

      const highlights =
        (doc.highlights as { text: string }[] | null)?.map((h) => h.text) || [];

      return {
        name: doc.name as string,
        price: formattedPrice,
        description: (doc.description as string) || "",
        features: highlights.length > 0 ? highlights : [],
        ctaText: (doc.ctaText as string) || "Başvuru Yap",
        popular: (doc.popular as boolean) || false,
      };
    });
  } catch {
    return FALLBACK_PRICING;
  }
}

async function getHomepageTestimonials(): Promise<TestimonialData[]> {
  try {
    const payload = await getPayload({ config });
    const { docs: stories } = await payload.find({
      collection: "success-stories",
      where: {
        isActive: { equals: true },
        featured: { equals: true },
      },
      sort: "-year",
      limit: 3,
      depth: 1,
    });

    if (stories.length === 0) {
      // Try without featured filter
      const { docs: allStories } = await payload.find({
        collection: "success-stories",
        where: {
          isActive: { equals: true },
        },
        sort: "-year",
        limit: 3,
        depth: 1,
      });

      if (allStories.length === 0) return FALLBACK_TESTIMONIALS;

      return allStories.map((story) => {
        const uniRelation = story.university as { name?: string } | null;
        const universityName =
          (uniRelation && typeof uniRelation === "object" && uniRelation.name) ||
          (story.universityName as string) ||
          "";
        const programType = story.isParentTestimonial
          ? "Veli"
          : programTypeLabels[story.programType as string] || "";

        return {
          name: story.studentName as string,
          role: `${programType} - ${universityName}${story.city ? `, ${story.city}` : ""}`,
          content: story.testimonial as string,
          rating: (story.rating as number) || 5,
        };
      });
    }

    return stories.map((story) => {
      const uniRelation = story.university as { name?: string } | null;
      const universityName =
        (uniRelation && typeof uniRelation === "object" && uniRelation.name) ||
        (story.universityName as string) ||
        "";
      const programType = story.isParentTestimonial
        ? "Veli"
        : programTypeLabels[story.programType as string] || "";

      return {
        name: story.studentName as string,
        role: `${programType} - ${universityName}${story.city ? `, ${story.city}` : ""}`,
        content: story.testimonial as string,
        rating: (story.rating as number) || 5,
      };
    });
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function HomePage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();
  const [programs, testimonials, pricingPlans] = await Promise.all([
    getHomepagePrograms(),
    getHomepageTestimonials(),
    getHomepagePricing(),
  ]);

  return (
    <>
      <JsonLd
        data={educationalOrganizationJsonLd({
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          phone: siteConfig.contact.phone,
          email: siteConfig.contact.email,
          address: {
            street: siteConfig.offices[0].address,
            city: siteConfig.offices[0].city,
            postalCode: "34340",
            country: siteConfig.offices[0].country,
          },
          coordinates: siteConfig.business.coordinates,
          openingHours: siteConfig.business.openingHours,
        })}
      />

      {/* Hero */}
      <Hero
        title={t("home.hero.title")}
        subtitle={t("home.hero.subtitle")}
        description={t("home.hero.description")}
        ctaText={t("home.hero.cta")}
        secondaryCtaText={t("home.hero.secondaryCta")}
        secondaryCtaHref={`tel:${siteConfig.contact.phone}`}
        image="/images/hero/hero-bg.svg"
      />

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
                  Ücretsiz uygunluk testimizle profilinize en uygun programı
                  belirleyin.
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

      {/* Programlar Önizleme */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Eğitim Programları
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Almanya&apos;da Size Uygun Program
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Link
                key={program.title}
                href="/programs"
                className="group flex items-start gap-4 rounded-xl border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <program.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {program.title}
                    </h3>
                    {program.badge && (
                      <Badge variant="secondary" className="text-[10px]">
                        {program.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {program.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Tüm Programları İncele
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hizmetlerimiz */}
      <Features
        title={t("home.features.title")}
        subtitle={t("home.features.subtitle")}
        features={[
          {
            title: t("home.features.professional.title"),
            description: t("home.features.professional.description"),
            icon: "GraduationCap",
          },
          {
            title: t("home.features.support247.title"),
            description: t("home.features.support247.description"),
            icon: "BookOpen",
          },
          {
            title: t("home.features.reliable.title"),
            description: t("home.features.reliable.description"),
            icon: "Wrench",
          },
          {
            title: t("home.features.customerFocused.title"),
            description: t("home.features.customerFocused.description"),
            icon: "Languages",
          },
          {
            title: t("home.features.experiencedTeam.title"),
            description: t("home.features.experiencedTeam.description"),
            icon: "Shield",
          },
          {
            title: t("home.features.qualityGuarantee.title"),
            description: t("home.features.qualityGuarantee.description"),
            icon: "Globe",
          },
        ]}
      />

      {/* İstatistikler */}
      <Stats
        stats={[
          {
            value: "100",
            suffix: "+",
            label: t("home.stats.happyCustomers"),
          },
          {
            value: "2",
            suffix: "+",
            label: t("home.stats.yearsExperience"),
          },
          {
            value: "10",
            suffix: "+",
            label: t("home.stats.completedProjects"),
          },
          {
            value: "6",
            suffix: "+",
            label: t("home.stats.expertTeam"),
          },
        ]}
      />

      {/* Partner Üniversiteler - Logo Slider */}
      <UniversityLogoSlider />

      {/* Hizmet Paketleri Önizleme */}
      <Pricing
        title="Hizmet Paketlerimiz"
        subtitle="Danışmanlık Hizmetleri"
        plans={pricingPlans}
      />

      {/* Başarı Hikayeleri */}
      <Testimonials
        title={t("home.testimonials.title")}
        subtitle={t("home.testimonials.subtitle")}
        testimonials={testimonials}
      />

      {/* SSS */}
      <JsonLd
        data={faqJsonLd([
          { question: t("home.faq.q1"), answer: t("home.faq.a1") },
          { question: t("home.faq.q2"), answer: t("home.faq.a2") },
          { question: t("home.faq.q3"), answer: t("home.faq.a3") },
          { question: t("home.faq.q4"), answer: t("home.faq.a4") },
          { question: t("home.faq.q5"), answer: t("home.faq.a5") },
          { question: t("home.faq.q6"), answer: t("home.faq.a6") },
        ])}
      />
      <Faq
        title={t("home.faq.title")}
        subtitle={t("home.faq.subtitle")}
        faqs={[
          { question: t("home.faq.q1"), answer: t("home.faq.a1") },
          { question: t("home.faq.q2"), answer: t("home.faq.a2") },
          { question: t("home.faq.q3"), answer: t("home.faq.a3") },
          { question: t("home.faq.q4"), answer: t("home.faq.a4") },
          { question: t("home.faq.q5"), answer: t("home.faq.a5") },
          { question: t("home.faq.q6"), answer: t("home.faq.a6") },
        ]}
      />

      {/* CTA */}
      <CTA
        title={t("home.cta.title")}
        description={t("home.cta.description")}
        buttonText={t("home.hero.cta")}
      />
    </>
  );
}
