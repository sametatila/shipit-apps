import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CTA } from "@/components/sections/cta";
import { Badge } from "@shipit/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@shipit/ui/card";
import { Star, GraduationCap, MapPin, Quote } from "lucide-react";

const successStories = [
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

const programTypeColors: Record<string, string> = {
  Master: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Lisans: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Ausbildung:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Veli: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Başarı Hikayeleri",
    description:
      "Almanya'da eğitim alan öğrencilerimizin başarı hikayeleri. Öğrencilerimizin deneyimlerini keşfedin.",
    path: "/success-stories",
  });
}

export default async function SuccessStoriesPage() {
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
              <p className="text-4xl font-bold text-primary">100+</p>
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

      {/* Filter Section */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Badge
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Tümü
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm hover:bg-blue-100 hover:text-blue-800 transition-colors"
            >
              <GraduationCap className="mr-1 h-3.5 w-3.5" />
              Master
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm hover:bg-green-100 hover:text-green-800 transition-colors"
            >
              <GraduationCap className="mr-1 h-3.5 w-3.5" />
              Lisans
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm hover:bg-orange-100 hover:text-orange-800 transition-colors"
            >
              <GraduationCap className="mr-1 h-3.5 w-3.5" />
              Ausbildung
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm hover:bg-purple-100 hover:text-purple-800 transition-colors"
            >
              Veli
            </Badge>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.name} className="flex flex-col h-full">
                <CardHeader className="space-y-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar with initials */}
                    <div className="flex-shrink-0 h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold">
                      {story.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg leading-tight">
                        {story.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {story.university} &middot; {story.program}
                      </p>
                      {/* Rating */}
                      <div className="flex items-center gap-0.5 mt-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < story.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          {story.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="relative">
                    <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary/20" />
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                      {story.quote}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className={programTypeColors[story.programType]}
                  >
                    <GraduationCap className="mr-1 h-3 w-3" />
                    {story.programType}
                  </Badge>
                  <Badge variant="secondary">
                    <MapPin className="mr-1 h-3 w-3" />
                    {story.city}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonial Placeholder */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            {[
              { name: "Elif Yıldırım", label: "TU München'de Master" },
              { name: "Burak Arslan", label: "Siemens'te Ausbildung" },
              { name: "Zeynep Demir", label: "Heidelberg'de Tıp" },
            ].map((video) => (
              <div
                key={video.name}
                className="group relative aspect-video rounded-xl bg-muted border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-3 hover:border-primary/40 transition-colors cursor-pointer"
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{video.name}</p>
                  <p className="text-xs text-muted-foreground">{video.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Siz de Başarı Hikayenizi Yazın"
        description="Almanya'da eğitim hayalinizi gerçeğe dönüştürmek için ilk adımı atın. Ücretsiz danışmanlık görüşmesi için hemen iletişime geçin."
      />
    </>
  );
}
