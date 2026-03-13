import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CTA } from "@/components/sections/cta";
import { Badge } from "@shipit/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@shipit/ui/card";
import { MapPin, Users, Globe, Trophy, Euro } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@shipit/ui";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                      */
/* ------------------------------------------------------------------ */

type UniversityType = "public-uni" | "tu" | "fh";

interface University {
  slug: string;
  name: string;
  city: string;
  state: string;
  type: UniversityType;
  qsRanking: number;
  studentCount: number;
  internationalPercent: number;
  semesterFee: string;
  isPartner: boolean;
}

const TYPE_LABELS: Record<UniversityType, string> = {
  "public-uni": "Universitat",
  tu: "TU",
  fh: "FH",
};

const TYPE_FILTERS: { label: string; value: UniversityType | "all" }[] = [
  { label: "Tumu", value: "all" },
  { label: "Universitat", value: "public-uni" },
  { label: "TU", value: "tu" },
  { label: "FH", value: "fh" },
];

const universities: University[] = [
  {
    slug: "technische-universitat-munchen",
    name: "Technische Universitat Munchen (TUM)",
    city: "Munchen",
    state: "Bayern",
    type: "public-uni",
    qsRanking: 49,
    studentCount: 50000,
    internationalPercent: 37,
    semesterFee: "157\u20AC/yariyil",
    isPartner: true,
  },
  {
    slug: "ludwig-maximilians-universitat",
    name: "Ludwig-Maximilians-Universitat (LMU)",
    city: "Munchen",
    state: "Bayern",
    type: "public-uni",
    qsRanking: 59,
    studentCount: 52000,
    internationalPercent: 18,
    semesterFee: "157\u20AC/yariyil",
    isPartner: true,
  },
  {
    slug: "technische-universitat-berlin",
    name: "Technische Universitat Berlin",
    city: "Berlin",
    state: "Berlin",
    type: "tu",
    qsRanking: 106,
    studentCount: 35000,
    internationalPercent: 25,
    semesterFee: "312\u20AC/yariyil",
    isPartner: true,
  },
  {
    slug: "rwth-aachen",
    name: "RWTH Aachen",
    city: "Aachen",
    state: "Nordrhein-Westfalen",
    type: "tu",
    qsRanking: 87,
    studentCount: 47000,
    internationalPercent: 28,
    semesterFee: "316\u20AC/yariyil",
    isPartner: true,
  },
  {
    slug: "universitat-heidelberg",
    name: "Universitat Heidelberg",
    city: "Heidelberg",
    state: "Baden-Wurttemberg",
    type: "public-uni",
    qsRanking: 47,
    studentCount: 31000,
    internationalPercent: 20,
    semesterFee: "171\u20AC/yariyil + 1500\u20AC (AB-disi)",
    isPartner: false,
  },
  {
    slug: "freie-universitat-berlin",
    name: "Freie Universitat Berlin",
    city: "Berlin",
    state: "Berlin",
    type: "public-uni",
    qsRanking: 91,
    studentCount: 36000,
    internationalPercent: 22,
    semesterFee: "312\u20AC/yariyil",
    isPartner: true,
  },
  {
    slug: "universitat-hamburg",
    name: "Universitat Hamburg",
    city: "Hamburg",
    state: "Hamburg",
    type: "public-uni",
    qsRanking: 164,
    studentCount: 43000,
    internationalPercent: 14,
    semesterFee: "335\u20AC/yariyil",
    isPartner: false,
  },
  {
    slug: "karlsruher-institut-fur-technologie",
    name: "Karlsruher Institut fur Technologie (KIT)",
    city: "Karlsruhe",
    state: "Baden-Wurttemberg",
    type: "tu",
    qsRanking: 119,
    studentCount: 24000,
    internationalPercent: 24,
    semesterFee: "171\u20AC/yariyil + 1500\u20AC (AB-disi)",
    isPartner: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
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
    title: "Anlasmali Universitelerimiz | Almanya Universiteleri",
    description:
      "Almanya'daki partner universitelerimizi kesfedin. TUM, LMU, RWTH Aachen ve daha fazlasi ile is birligimiz sayesinde kolay basvuru sureci.",
    path: "/universities",
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default async function UniversitiesPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Universiteler" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Partner Universiteler
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl mt-4">
            Anlasmali Universitelerimiz
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Almanya&apos;nin en prestijli universiteleriyle anlasmaliyiz.
            Ogrencilerimize kolay basvuru sureci, burs imkanlari ve akademik
            danismanlik hizmeti sunuyoruz.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TYPE_FILTERS.map((filter) => (
              <Badge
                key={filter.value}
                variant={filter.value === "all" ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* University Cards Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((uni) => (
              <Card
                key={uni.slug}
                className="group relative flex flex-col transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {TYPE_LABELS[uni.type]}
                      </Badge>
                      {uni.isPartner && (
                        <Badge variant="default">Partner</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                      <Trophy className="h-4 w-4" />
                      <span>#{uni.qsRanking} QS</span>
                    </div>
                  </div>
                  <CardTitle className="mt-3 text-lg leading-snug">
                    {uni.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {uni.city}, {uni.state}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 shrink-0" />
                    <span>
                      {uni.studentCount.toLocaleString("tr-TR")} ogrenci
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 shrink-0" />
                    <span>%{uni.internationalPercent} uluslararasi ogrenci</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Euro className="h-4 w-4 shrink-0" />
                    <span>{uni.semesterFee}</span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/universities/${uni.slug}`}>
                      Detaylari Gor
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Almanya'da Egitim Hayalinizi Gerceklestirin"
        description="Uzman danismanlarimiz size en uygun universiteyi bulmak ve basvuru surecinde yaninda olmak icin hazir."
        buttonText="Ucretsiz Danismanlik Al"
        buttonHref="/contact"
      />
    </>
  );
}
