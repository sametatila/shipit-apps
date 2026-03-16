import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { JsonLd, blogPostingJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@shipit/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@shipit/ui/card";
import { Calendar, Clock, ArrowRight, MapPin, Trophy } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { universityBlogPosts } from "@/data/university-blog-posts";

const blogPosts = [
  {
    slug: "almanya-universite-egitimi-2026-basvuru-rehberi",
    title: "Almanya'da Üniversite Eğitimi: 2026 Başvuru Rehberi",
    category: "Rehber",
    date: "2026-02-15",
    readTime: "12 dk",
    excerpt:
      "Türk öğrenciler için Almanya'da üniversite başvuru sürecinin A'dan Z'ye rehberi. uni-assist, ön başvuru tarihleri, gerekli belgeler, dil sınavları ve kabul mektubu alma adımlarını detaylı öğrenin.",
    image: "/images/blog/universite-basvuru.svg",
    keywords: [
      "Almanya üniversite başvuru",
      "uni-assist",
      "Almanya'da okumak",
      "2026 başvuru rehberi",
    ],
  },
  {
    slug: "sperrkonto-nedir-2026-guncel-tutar",
    title: "Sperrkonto Nedir? 2026 Güncel Tutarı ve Açılış Rehberi",
    category: "Vize & Finans",
    date: "2026-02-01",
    readTime: "8 dk",
    excerpt:
      "Almanya öğrenci vizesi için zorunlu olan Sperrkonto (bloke hesap) hakkında bilmeniz gereken her şey. 2026 yılı güncel tutarı, Expatrio ve Coracle karşılaştırması, adım adım açılış rehberi.",
    image: "/images/blog/sperrkonto.svg",
    keywords: [
      "Sperrkonto",
      "bloke hesap Almanya",
      "Expatrio",
      "Almanya öğrenci vizesi finans",
    ],
  },
  {
    slug: "almanya-ausbildung-maasli-mesleki-egitim",
    title: "Almanya'da Ausbildung: Maaşlı Mesleki Eğitimin Tüm Detayları",
    category: "Ausbildung",
    date: "2026-01-20",
    readTime: "15 dk",
    excerpt:
      "Almanya'nın dünyaca ünlü ikili mesleki eğitim sistemi Ausbildung hakkında kapsamlı rehber. Başvuru şartları, maaş aralıkları, en popüler meslekler, B1 Almanca seviyesi gerekliliği ve firma bulma yöntemleri.",
    image: "/images/blog/ausbildung.svg",
    keywords: [
      "Ausbildung",
      "Almanya mesleki eğitim",
      "Ausbildung maaş",
      "Almanya'da çalışarak öğrenmek",
    ],
  },
  {
    slug: "studienkolleg-rehberi-basvuru-hazirlik-fsp",
    title: "Studienkolleg Rehberi: Başvuru, Hazırlık ve FSP Sınavı",
    category: "Studienkolleg",
    date: "2026-01-10",
    readTime: "10 dk",
    excerpt:
      "Türk lise diplomasıyla Almanya'da üniversiteye giriş için Studienkolleg süreci. T-Kurs ve M-Kurs farkları, Aufnahmetest hazırlığı, FSP sınavı detayları ve başarı stratejileri.",
    image: "/images/blog/studienkolleg.svg",
    keywords: [
      "Studienkolleg",
      "FSP sınavı",
      "Aufnahmetest",
      "Almanya üniversite hazırlık",
    ],
  },
  {
    slug: "almanya-yasam-maliyeti-2026-sehir-karsilastirma",
    title: "Almanya'da Yaşam Maliyeti 2026: Şehir Şehir Karşılaştırma",
    category: "Yaşam",
    date: "2025-12-28",
    readTime: "11 dk",
    excerpt:
      "Münih, Berlin, Hamburg, Frankfurt ve daha fazlası: Almanya'nın büyük şehirlerinde öğrenci yaşam maliyeti karşılaştırması. Kira, yemek, ulaşım, sağlık sigortası ve Semesterticket detayları.",
    image: "/images/blog/yasam-maliyeti.svg",
    keywords: [
      "Almanya yaşam maliyeti",
      "Almanya kira fiyatları",
      "öğrenci bütçesi Almanya",
      "Semesterticket",
    ],
  },
  {
    slug: "almanya-ogrenci-vizesi-gerekli-belgeler",
    title: "Almanya Öğrenci Vizesi: Gerekli Belgeler ve Başvuru Süreci",
    category: "Vize & Finans",
    date: "2025-12-15",
    readTime: "9 dk",
    excerpt:
      "Almanya öğrenci vizesi başvurusu için gerekli belgeler, randevu alma süreci, Türkiye'deki Alman konsoloslukları iletişim bilgileri ve vize mülakatına hazırlık ipuçları.",
    image: "/images/blog/ogrenci-vizesi.svg",
    keywords: [
      "Almanya öğrenci vizesi",
      "vize başvurusu",
      "Alman konsolosluğu",
      "öğrenci vizesi belgeleri",
    ],
  },
];

const categories = [
  "Tümü",
  "Üniversite Rehberi",
  "Rehber",
  "Vize & Finans",
  "Ausbildung",
  "Studienkolleg",
  "Yaşam",
];

function formatTurkishDate(dateStr: string): string {
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  const date = new Date(dateStr);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Blog - Almanya Eğitim Rehberleri ve Güncel Bilgiler",
    description:
      "Almanya'da eğitim, üniversite başvurusu, Ausbildung, Studienkolleg, vize süreçleri ve yaşam maliyeti hakkında güncel rehberler ve makaleler.",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  return (
    <>
      {/* JSON-LD for each blog post */}
      {blogPosts.map((post) => (
        <JsonLd
          key={post.slug}
          data={blogPostingJsonLd({
            title: post.title,
            description: post.excerpt,
            url: `${siteConfig.url}/blog/${post.slug}`,
            image: `${siteConfig.url}${post.image}`,
            datePublished: post.date,
            author: { name: siteConfig.name },
            publisher: {
              name: siteConfig.name,
              logo: `${siteConfig.url}/logo.svg`,
            },
            keywords: post.keywords,
          })}
        />
      ))}

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Blog" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Almanya Eğitim Rehberleri
            </p>
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Almanya&apos;da eğitim hayatınıza dair en güncel rehberler,
              başvuru süreçleri ve pratik bilgiler. Uzman danışmanlarımızın
              kaleminden detaylı makaleler.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "Tümü" ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Post Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card
                key={post.slug}
                className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
              >
                {/* Featured Image Placeholder */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/15">
                    <span className="text-4xl text-primary/30">
                      {post.category === "Rehber" && "📘"}
                      {post.category === "Vize & Finans" && "💰"}
                      {post.category === "Ausbildung" && "🛠️"}
                      {post.category === "Studienkolleg" && "🎓"}
                      {post.category === "Yaşam" && "🏠"}
                    </span>
                  </div>
                  <Badge className="absolute left-3 top-3" variant="secondary">
                    {post.category}
                  </Badge>
                </div>

                <CardHeader className="flex-1 space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatTurkishDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="pt-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    Devamını Oku
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* University Guides Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Üniversite Rehberleri
            </p>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Almanya&apos;nın En İyi 20 Üniversitesi
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Her üniversite hakkında detaylı bilgi: programlar, başvuru
              süreçleri, yaşam maliyetleri ve kariyer imkanları.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {universityBlogPosts.map((uni) => (
              <Link key={uni.slug} href={`/blog/${uni.slug}`}>
                <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px]">
                        {uni.type}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                        <Trophy className="h-3 w-3" />
                        QS #{uni.qsRanking}
                      </span>
                    </div>
                    <CardTitle className="text-sm leading-snug group-hover:text-primary transition-colors">
                      {uni.universityName}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {uni.city}, {uni.bundesland}
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      Rehberi Oku
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-3xl font-bold">
              Almanya Eğitim Bültenimize Abone Olun
            </h2>
            <p className="text-muted-foreground">
              Yeni rehberler, burs fırsatları ve başvuru tarihleri hakkında
              güncel bilgileri e-posta adresinize gönderelim.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
