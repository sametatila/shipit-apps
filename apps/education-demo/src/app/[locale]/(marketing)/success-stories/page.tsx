import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CTA } from "@/components/sections/cta";
import { Badge } from "@shipit/ui/badge";
import { Play } from "lucide-react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { SuccessStoriesGrid } from "@/components/sections/success-stories-grid";

/* ------------------------------------------------------------------ */
/*  Types & Mappings                                                   */
/* ------------------------------------------------------------------ */

interface StoryData {
  name: string;
  initials: string;
  university: string;
  program: string;
  programType: string;
  city: string;
  year: number;
  rating: number;
  quote: string;
  videoUrl?: string;
}

function getYouTubeThumbnail(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
}

function getVideoEmbedUrl(url: string): string | null {
  // YouTube
  const ytPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of ytPatterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://vimeo.com/${vimeoMatch[1]}`;
  return url;
}

const programTypeLabels: Record<string, string> = {
  studienkolleg: "Studienkolleg",
  bachelor: "Lisans",
  master: "Master",
  ausbildung: "Ausbildung",
  language: "Dil Kursu",
};

const programTypeColors: Record<string, string> = {
  Master: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Lisans: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Ausbildung: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Veli: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Studienkolleg: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  "Dil Kursu": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Fallback data                                                      */
/* ------------------------------------------------------------------ */

const FALLBACK_STORIES: StoryData[] = [
  {
    name: "Elif Yıldırım",
    initials: "EY",
    university: "TU München",
    program: "Makine Mühendisliği",
    programType: "Master",
    city: "Münih",
    year: 2024,
    rating: 5,
    quote:
      "Studienkolleg sürecinden TU München'e kabul almak hayallerimin ötesindeydi. Danışmanlarım her adımda yanımdaydı. DAAD bursu kazandım ve şu anda BMW'de staj yapıyorum. Almanya'daki kariyerimin temellerini bu ekiple attım.",
  },
  {
    name: "Burak Arslan",
    initials: "BA",
    university: "Siemens AG",
    program: "IT-Systemelektroniker",
    programType: "Ausbildung",
    city: "Berlin",
    year: 2024,
    rating: 5,
    quote:
      "Lisans yerine Ausbildung tercih ettim ve bu hayatımın en doğru kararıydı. Siemens'te maaşlı eğitim alıyorum, aylık 1.100€ kazanıyorum. Hem pratik deneyim hem de Almanca öğreniyorum. Danışmanlarım Ausbildung sistemini en ince detayına kadar anlattılar.",
  },
  {
    name: "Zeynep Demir",
    initials: "ZD",
    university: "Heidelberg Üniversitesi",
    program: "Tıp",
    programType: "Lisans",
    city: "Heidelberg",
    year: 2023,
    rating: 5,
    quote:
      "Studienkolleg M-Kurs'tan 1.0 notla mezun oldum ve Almanya'nın en prestijli tıp programına kabul aldım. Başvuru sürecinde motivasyon mektubu desteğinden vize işlemlerine kadar her konuda profesyonel yardım aldım.",
  },
  {
    name: "Ahmet Çelik",
    initials: "AÇ",
    university: "RWTH Aachen",
    program: "Bilgisayar Mühendisliği",
    programType: "Master",
    city: "Aachen",
    year: 2024,
    rating: 5,
    quote:
      "İstanbul'dan direkt master başvurusu yaptım. İngilizce programda eğitim aldım. Tez dönemimde SAP'ta çalışmaya başladım ve mezuniyetimden sonra tam zamanlı pozisyona geçtim. Danışmanların üniversite seçimindeki yönlendirmesi çok değerliydi.",
  },
  {
    name: "Merve Özkan",
    initials: "MÖ",
    university: "UKE Hamburg",
    program: "Kauffrau im Gesundheitswesen",
    programType: "Ausbildung",
    city: "Hamburg",
    year: 2023,
    rating: 5,
    quote:
      "Sağlık sektöründe Ausbildung yapmak istiyordum. B2 Almanca seviyesiyle başladım, şimdi C1 seviyedeyim. Hamburg'daki hastanede hem eğitim alıyorum hem de Alman sağlık sistemini içeriden öğreniyorum. Kariyer planlamam konusunda harika destek aldım.",
  },
  {
    name: "Can Yılmaz",
    initials: "CY",
    university: "FU Berlin",
    program: "Siyaset Bilimi",
    programType: "Lisans",
    city: "Berlin",
    year: 2024,
    rating: 4,
    quote:
      "İlk vize başvurum reddedildi ve çok umutsuzdum. Danışmanlık ekibi eksikleri analiz etti, dosyamı güçlendirdi ve ikinci başvuruda kabul aldım. Süreç yönetimindeki profesyonellikleri olmasaydı Almanya hayalimden vazgeçmiş olabilirdim.",
  },
  {
    name: "Ayşe Kara",
    initials: "AK",
    university: "TU Darmstadt",
    program: "Elektrik Mühendisliği",
    programType: "Master",
    city: "Darmstadt",
    year: 2023,
    rating: 5,
    quote:
      "Tam burslu master programına kabul aldım ve araştırma asistanı olarak çalışıyorum. Burs başvuru sürecinde danışmanlarımın desteği inanılmazdı. Motivasyon mektubumu birlikte hazırladık ve sonuç mükemmel oldu.",
  },
  {
    name: "Fatma & Kemal Yılmaz",
    initials: "FY",
    university: "Heidelberg",
    program: "Veli Danışmanlığı",
    programType: "Veli",
    city: "Heidelberg",
    year: 2024,
    rating: 5,
    quote:
      "İki çocuğumuzu Almanya'ya göndermek büyük bir karardı. Sperrkonto açılışı, vize başvurusu, konaklama ve şehir rehberliği konularında eksiksiz destek aldık. Çocuklarımızın güvende olduğunu bilmek en büyük huzurumuz. Aileler için de danışmanlık vermeleri çok değerli.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data Fetching                                                      */
/* ------------------------------------------------------------------ */

async function getSuccessStories(): Promise<StoryData[]> {
  try {
    const payload = await getPayload({ config });
    const { docs: stories } = await payload.find({
      collection: "success-stories",
      where: {
        isActive: { equals: true },
      },
      sort: "-year",
      limit: 100,
      depth: 1,
    });

    if (stories.length === 0) return FALLBACK_STORIES;

    return stories.map((story) => {
      const uniRelation = story.university as { name?: string } | null;
      const universityName =
        (uniRelation && typeof uniRelation === "object" && uniRelation.name) ||
        (story.universityName as string) ||
        "";

      const programTypeValue = story.programType as string;
      const displayType = story.isParentTestimonial
        ? "Veli"
        : programTypeLabels[programTypeValue] || programTypeValue || "";

      return {
        name: story.studentName as string,
        initials: getInitials(story.studentName as string),
        university: universityName,
        program: story.program as string,
        programType: displayType,
        city: (story.city as string) || "",
        year: story.year as number,
        rating: (story.rating as number) || 5,
        quote: story.testimonial as string,
        videoUrl: (story.videoUrl as string) || undefined,
      };
    });
  } catch {
    return FALLBACK_STORIES;
  }
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const _t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Başarı Hikayeleri",
    description:
      "Almanya'da eğitim alan öğrencilerimizin başarı hikayeleri. Öğrencilerimizin deneyimlerini keşfedin.",
    path: "/success-stories",
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function SuccessStoriesPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();
  const successStories = await getSuccessStories();

  const videoStories = successStories.filter((s) => s.videoUrl);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Başarı Hikayeleri" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Öğrencilerimizin Deneyimleri
            </p>
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Başarı Hikayeleri
            </h1>
            <p className="text-lg text-muted-foreground">
              Almanya&apos;da hayallerini gerçekleştiren öğrencilerimizin
              hikayeleri. Her biri farklı bir yol, her biri ortak bir başarı.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <p className="text-4xl font-bold text-primary">{successStories.length}+</p>
              <p className="text-muted-foreground">Mutlu Öğrenci</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-4xl font-bold text-primary">%98</p>
              <p className="text-muted-foreground">Memnuniyet Oranı</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-4xl font-bold text-primary">10+</p>
              <p className="text-muted-foreground">Partner Üniversite</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials — CMS'den videoUrl'i olan hikayeler */}
      {videoStories.length > 0 && (
        <section className="py-16 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Video Hikayeler
              </p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Öğrencilerimizi Dinleyin
              </h2>
              <p className="text-lg text-muted-foreground">
                Almanya&apos;daki öğrencilerimiz deneyimlerini kendi
                ağızlarından anlatıyor.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {videoStories.map((story) => {
                const thumbnail = getYouTubeThumbnail(story.videoUrl!);
                const videoLink = getVideoEmbedUrl(story.videoUrl!);

                return (
                  <a
                    key={`video-${story.name}`}
                    href={videoLink || story.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50">
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-muted">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={`${story.name} video`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
                        )}
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                            <Play className="h-7 w-7 ml-1" fill="currentColor" />
                          </div>
                        </div>
                        {/* Program type badge */}
                        <div className="absolute top-3 left-3">
                          <Badge
                            variant="secondary"
                            className={`${programTypeColors[story.programType] || ""} backdrop-blur-sm`}
                          >
                            {story.programType}
                          </Badge>
                        </div>
                      </div>
                      {/* Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                            {story.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm truncate">
                              {story.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {story.university} &middot; {story.program}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filterable Stories Grid — client component */}
      <SuccessStoriesGrid stories={successStories} />

      {/* CTA */}
      <CTA
        title="Siz de Başarı Hikayenizi Yazın"
        description="Almanya'da eğitim hayalinizi gerçeğe dönüştürmek için ilk adımı atın. Ücretsiz danışmanlık görüşmesi için hemen iletişime geçin."
      />
    </>
  );
}
