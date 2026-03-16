import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CTA } from "@/components/sections/cta";
import { UniversitySearch, type UniversityData } from "@/components/universities/university-search";
import { getPayload } from "payload";
import config from "@/payload.config";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Üniversite Arama | Almanya Üniversiteleri",
    description:
      "Almanya'daki üniversiteleri keşfedin. Filtrelerle size en uygun üniversiteyi bulun: tür, eyalet, dil, şartlı kabul ve daha fazlası.",
    path: "/universities",
  });
}

/* ------------------------------------------------------------------ */
/*  Data Fetching                                                      */
/* ------------------------------------------------------------------ */

async function getUniversities(): Promise<UniversityData[]> {
  try {
    const payload = await getPayload({ config });

    // Fetch universities
    const { docs: universities } = await payload.find({
      collection: "universities",
      limit: 500,
      sort: "sortOrder",
    });

    // Fetch blog posts with category "Üniversite Rehberi" to link
    const { docs: blogPosts } = await payload.find({
      collection: "blog-posts",
      where: {
        status: { equals: "published" },
        category: { equals: "Üniversite Rehberi" },
      },
      limit: 500,
    });

    // Build a map: university slug → blog slug
    const blogSlugMap = new Map<string, string>();
    for (const post of blogPosts) {
      // Match blog to university by checking tags or title
      const uniSlug = findMatchingUniversitySlug(post, universities);
      if (uniSlug) {
        blogSlugMap.set(uniSlug, post.slug);
      }
    }

    return universities.map((uni) => ({
      id: uni.id,
      name: uni.name,
      slug: uni.slug,
      city: uni.city,
      bundesland: uni.bundesland ?? null,
      type: uni.type ?? null,
      founded: uni.founded ?? null,
      shortDescription: uni.shortDescription ?? null,
      websiteUrl: uni.websiteUrl ?? null,
      ranking: uni.ranking ?? null,
      stats: uni.stats ?? null,
      conditionalAcceptance: uni.conditionalAcceptance ?? null,
      conditionalAcceptanceLevel: uni.conditionalAcceptanceLevel ?? null,
      studienkolleg: uni.studienkolleg ?? null,
      applicationDeadlines: uni.applicationDeadlines ?? null,
      programs: (uni.programs as UniversityData["programs"]) ?? null,
      isPartner: uni.isPartner ?? null,
      blogSlug: blogSlugMap.get(uni.slug) ?? null,
    }));
  } catch {
    // CMS unavailable — return fallback data
    return FALLBACK_UNIVERSITIES;
  }
}

function findMatchingUniversitySlug(
  blogPost: { title: string; slug: string; tags?: { tag: string; id?: string | null }[] | null },
  universities: { name: string; slug: string }[]
): string | null {
  const blogSlugLower = blogPost.slug.toLowerCase();
  const blogTitleLower = blogPost.title.toLowerCase();

  for (const uni of universities) {
    const uniSlugLower = uni.slug.toLowerCase();
    const uniNameLower = uni.name.toLowerCase();

    // Match by slug similarity
    if (blogSlugLower.includes(uniSlugLower) || uniSlugLower.includes(blogSlugLower)) {
      return uni.slug;
    }

    // Match by name in title
    const shortName = uniNameLower.replace(/\(.*\)/, "").trim();
    if (blogTitleLower.includes(shortName) || blogTitleLower.includes(uniNameLower)) {
      return uni.slug;
    }

    // Match by abbreviation in parentheses
    const match = uni.name.match(/\(([^)]+)\)/);
    if (match && blogTitleLower.includes(match[1].toLowerCase())) {
      return uni.slug;
    }
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  Fallback Data                                                      */
/* ------------------------------------------------------------------ */

const FALLBACK_UNIVERSITIES: UniversityData[] = [
  {
    id: 1,
    name: "Technische Universität München (TUM)",
    slug: "technische-universitat-munchen",
    city: "München",
    bundesland: "bayern",
    type: "tu",
    founded: 1868,
    shortDescription: "Almanya'nın en iyi teknik üniversitelerinden biri.",
    ranking: { qsWorld: 37, theWorld: 30 },
    stats: { totalStudents: 50000, internationalPercent: 37, semesterFee: "~157€/dönem" },
    conditionalAcceptance: "yes",
    conditionalAcceptanceLevel: "b1",
    studienkolleg: true,
    applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
    programs: [
      { name: "Makine Mühendisliği", degree: "bachelor", language: "de" },
      { name: "Bilgisayar Bilimi", degree: "master", language: "en" },
      { name: "Elektrik Mühendisliği", degree: "bachelor", language: "de" },
      { name: "İşletme", degree: "master", language: "en" },
    ],
    isPartner: true,
    blogSlug: "tum-technische-universitat-munchen-rehberi",
  },
  {
    id: 2,
    name: "Ludwig-Maximilians-Universität (LMU)",
    slug: "ludwig-maximilians-universitat",
    city: "München",
    bundesland: "bayern",
    type: "public-uni",
    founded: 1472,
    shortDescription: "Almanya'nın en köklü ve prestijli üniversitelerinden biri.",
    ranking: { qsWorld: 54, theWorld: 38 },
    stats: { totalStudents: 52000, internationalPercent: 18, semesterFee: "~157€/dönem" },
    conditionalAcceptance: "yes",
    conditionalAcceptanceLevel: "b1",
    studienkolleg: true,
    applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
    programs: [
      { name: "Tıp", degree: "bachelor", language: "de" },
      { name: "Hukuk", degree: "bachelor", language: "de" },
      { name: "Fizik", degree: "master", language: "en" },
    ],
    isPartner: true,
    blogSlug: "lmu-ludwig-maximilians-universitat-rehberi",
  },
  {
    id: 3,
    name: "RWTH Aachen",
    slug: "rwth-aachen",
    city: "Aachen",
    bundesland: "nordrhein-westfalen",
    type: "tu",
    founded: 1870,
    shortDescription: "Avrupa'nın önde gelen teknik üniversitelerinden.",
    ranking: { qsWorld: 87, theWorld: 90 },
    stats: { totalStudents: 47000, internationalPercent: 28, semesterFee: "~316€/dönem" },
    conditionalAcceptance: "yes",
    conditionalAcceptanceLevel: "b1",
    studienkolleg: true,
    applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
    programs: [
      { name: "Makine Mühendisliği", degree: "bachelor", language: "de" },
      { name: "Bilgisayar Mühendisliği", degree: "master", language: "en" },
    ],
    isPartner: true,
    blogSlug: "rwth-aachen-rehberi",
  },
  {
    id: 4,
    name: "Universität Heidelberg",
    slug: "universitat-heidelberg",
    city: "Heidelberg",
    bundesland: "baden-wuerttemberg",
    type: "public-uni",
    founded: 1386,
    shortDescription: "Almanya'nın en eski üniversitesi, araştırma odaklı.",
    ranking: { qsWorld: 47, theWorld: 43 },
    stats: { totalStudents: 31000, internationalPercent: 20, semesterFee: "~171€/dönem + 1500€ (AB-dışı)" },
    conditionalAcceptance: "yes",
    conditionalAcceptanceLevel: "b2",
    studienkolleg: true,
    applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
    programs: [
      { name: "Tıp", degree: "bachelor", language: "de" },
      { name: "Moleküler Biyoloji", degree: "master", language: "en" },
    ],
    isPartner: false,
    blogSlug: "heidelberg-universitesi-rehberi",
  },
  {
    id: 5,
    name: "Technische Universität Berlin",
    slug: "technische-universitat-berlin",
    city: "Berlin",
    bundesland: "berlin",
    type: "tu",
    founded: 1879,
    shortDescription: "Berlin'in en büyük teknik üniversitesi.",
    ranking: { qsWorld: 106, theWorld: 140 },
    stats: { totalStudents: 35000, internationalPercent: 25, semesterFee: "~312€/dönem" },
    conditionalAcceptance: "yes",
    conditionalAcceptanceLevel: "b1",
    studienkolleg: true,
    applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
    programs: [
      { name: "Mimarlık", degree: "bachelor", language: "de" },
      { name: "Bilgisayar Bilimi", degree: "master", language: "en" },
    ],
    isPartner: true,
    blogSlug: "tu-berlin-rehberi",
  },
  {
    id: 6,
    name: "Freie Universität Berlin",
    slug: "freie-universitat-berlin",
    city: "Berlin",
    bundesland: "berlin",
    type: "public-uni",
    founded: 1948,
    shortDescription: "Berlin'in önde gelen araştırma üniversitesi.",
    ranking: { qsWorld: 91, theWorld: 83 },
    stats: { totalStudents: 36000, internationalPercent: 22, semesterFee: "~312€/dönem" },
    conditionalAcceptance: "yes",
    conditionalAcceptanceLevel: "b2",
    studienkolleg: false,
    applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
    programs: [
      { name: "Siyaset Bilimi", degree: "bachelor", language: "de" },
      { name: "Biyokimya", degree: "master", language: "en" },
    ],
    isPartner: true,
    blogSlug: "fu-berlin-rehberi",
  },
  {
    id: 7,
    name: "Universität Hamburg",
    slug: "universitat-hamburg",
    city: "Hamburg",
    bundesland: "hamburg",
    type: "public-uni",
    founded: 1919,
    shortDescription: "Kuzey Almanya'nın en büyük araştırma üniversitesi.",
    ranking: { qsWorld: 164, theWorld: 127 },
    stats: { totalStudents: 43000, internationalPercent: 14, semesterFee: "~335€/dönem" },
    conditionalAcceptance: "yes",
    conditionalAcceptanceLevel: "b2",
    studienkolleg: true,
    applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
    programs: [
      { name: "İşletme", degree: "bachelor", language: "de" },
      { name: "Fizik", degree: "master", language: "en" },
    ],
    isPartner: false,
    blogSlug: "hamburg-universitesi-rehberi",
  },
  {
    id: 8,
    name: "Karlsruher Institut für Technologie (KIT)",
    slug: "karlsruher-institut-fur-technologie",
    city: "Karlsruhe",
    bundesland: "baden-wuerttemberg",
    type: "tu",
    founded: 1825,
    shortDescription: "Araştırma ve eğitimde Almanya'nın lider kurumlarından.",
    ranking: { qsWorld: 119, theWorld: 189 },
    stats: { totalStudents: 24000, internationalPercent: 24, semesterFee: "~171€/dönem + 1500€ (AB-dışı)" },
    conditionalAcceptance: "yes",
    conditionalAcceptanceLevel: "b1",
    studienkolleg: true,
    applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
    programs: [
      { name: "Makine Mühendisliği", degree: "bachelor", language: "de" },
      { name: "Bilişim", degree: "master", language: "en" },
    ],
    isPartner: true,
    blogSlug: "kit-karlsruhe-rehberi",
  },
  {
    id: 9,
    name: "Humboldt-Universität zu Berlin",
    slug: "humboldt-universitat-zu-berlin",
    city: "Berlin",
    bundesland: "berlin",
    type: "public-uni",
    founded: 1810,
    shortDescription: "Berlin'in en eski üniversitesi, 29 Nobel ödüllü.",
    ranking: { qsWorld: 120, theWorld: 87 },
    stats: { totalStudents: 33000, internationalPercent: 19, semesterFee: "~315€/dönem" },
    conditionalAcceptance: "yes",
    conditionalAcceptanceLevel: "b2",
    studienkolleg: false,
    applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
    programs: [
      { name: "Felsefe", degree: "bachelor", language: "de" },
      { name: "Veri Bilimi", degree: "master", language: "en" },
    ],
    isPartner: false,
    blogSlug: "humboldt-universitesi-rehberi",
  },
  {
    id: 10,
    name: "Hochschule München (HM)",
    slug: "hochschule-munchen",
    city: "München",
    bundesland: "bayern",
    type: "fh",
    founded: 1971,
    shortDescription: "Almanya'nın en büyük uygulamalı bilimler üniversitelerinden biri.",
    ranking: { qsWorld: null, theWorld: null },
    stats: { totalStudents: 18000, internationalPercent: 22, semesterFee: "~157€/dönem" },
    conditionalAcceptance: "yes",
    conditionalAcceptanceLevel: "b1",
    studienkolleg: false,
    applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
    programs: [
      { name: "Bilgisayar Bilimi", degree: "bachelor", language: "de" },
      { name: "Endüstri Mühendisliği", degree: "bachelor", language: "de" },
      { name: "Yazılım Mühendisliği", degree: "master", language: "en" },
    ],
    isPartner: true,
    blogSlug: "hochschule-munchen-rehberi",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function UniversitiesPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();
  const universities = await getUniversities();

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Üniversiteler" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 pb-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Almanya Üniversiteleri
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl mt-4">
            Üniversite Ara &amp; Keşfet
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Almanya&apos;daki üniversiteleri filtreleyin, karşılaştırın ve size en uygun olanı bulun.
            Her üniversite için detaylı rehber yazılarımıza ulaşın.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{universities.length}</p>
              <p className="text-xs text-muted-foreground">Üniversite</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {universities.reduce((sum, u) => sum + (u.programs?.length ?? 0), 0)}
              </p>
              <p className="text-xs text-muted-foreground">Program</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {universities.filter((u) => u.isPartner).length}
              </p>
              <p className="text-xs text-muted-foreground">Partner</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">16</p>
              <p className="text-xs text-muted-foreground">Eyalet</p>
            </div>
          </div>
        </div>
      </section>

      {/* University Search */}
      <UniversitySearch universities={universities} />

      {/* CTA */}
      <CTA
        title="Doğru Üniversiteyi Birlikte Bulalım"
        description="Akademik profilinize, bütçenize ve kariyer hedeflerinize en uygun üniversiteyi bulmak için uzman danışmanlarımızla ücretsiz görüşme yapın."
        buttonText="Ücretsiz Danışmanlık Al"
      />
    </>
  );
}
