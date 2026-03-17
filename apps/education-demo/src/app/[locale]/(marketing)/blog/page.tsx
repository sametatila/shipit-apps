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
  CardFooter,
} from "@shipit/ui/card";
import { Calendar, ArrowRight, MapPin, Trophy } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { getPayload } from "payload";
import config from "@payload-config";

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

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    "Rehber": "\u{1F4D8}",
    "Vize & Finans": "\u{1F4B0}",
    "Ausbildung": "\u{1F6E0}\uFE0F",
    "Studienkolleg": "\u{1F393}",
    "Yaşam": "\u{1F3E0}",
    "Üniversite Rehberi": "\u{1F3EB}",
  };
  return emojiMap[category] || "\u{1F4DD}";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const _t = await getTranslations({ locale, namespace: "metadata" });
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

  let blogPosts: any[] = [];
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "blog-posts",
      where: {
        status: { equals: "published" },
      },
      sort: "-publishedAt",
      limit: 50,
    });
    blogPosts = result.docs;
  } catch {
    // DB unavailable - render empty state
  }

  // Extract unique categories dynamically
  const postCategories = Array.from(
    new Set(blogPosts.map((post) => post.category).filter(Boolean))
  );
  const categories = ["Tümü", ...postCategories];

  // Separate university guide posts
  const universityPosts = blogPosts.filter(
    (post) => post.category === "Üniversite Rehberi"
  );
  const regularPosts = blogPosts.filter(
    (post) => post.category !== "Üniversite Rehberi"
  );

  // Extract tags as keywords
  const getKeywords = (post: (typeof blogPosts)[number]): string[] => {
    if (!post.tags || !Array.isArray(post.tags)) return [];
    return post.tags.map((t: any) => t.tag).filter(Boolean);
  };

  return (
    <>
      {/* JSON-LD for each blog post */}
      {blogPosts.map((post) => (
        <JsonLd
          key={post.slug}
          data={blogPostingJsonLd({
            title: post.title,
            description: post.excerpt || "",
            url: `${siteConfig.url}/blog/${post.slug}`,
            image: `${siteConfig.url}/logo.png`,
            datePublished: post.publishedAt || "",
            author: { name: siteConfig.name },
            publisher: {
              name: siteConfig.name,
              logo: `${siteConfig.url}/logo.png`,
            },
            keywords: getKeywords(post),
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

      {/* University Guides Featured Section */}
      {universityPosts.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                Üniversite Rehberleri
              </p>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Almanya&apos;nın En İyi Üniversiteleri
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Her üniversite hakkında detaylı bilgi: programlar, başvuru
                süreçleri, yaşam maliyetleri ve kariyer imkanları.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {universityPosts.map((post) => {
                const tags = getKeywords(post);
                // Try to extract QS ranking from tags (format: "QS:37")
                const qsTag = tags.find((t) => t.startsWith("QS:"));
                const qsRanking = qsTag ? qsTag.replace("QS:", "") : null;
                // Try to extract city from tags (format: "Şehir:München")
                const cityTag = tags.find((t) => t.startsWith("Şehir:"));
                const city = cityTag ? cityTag.replace("Şehir:", "") : null;
                // Try to extract bundesland from tags (format: "Eyalet:Bayern")
                const bundeslandTag = tags.find((t) => t.startsWith("Eyalet:"));
                const bundesland = bundeslandTag
                  ? bundeslandTag.replace("Eyalet:", "")
                  : null;
                // Try to extract type from tags (format: "Tür:Teknik Üniversite")
                const typeTag = tags.find((t) => t.startsWith("Tür:"));
                const uniType = typeTag ? typeTag.replace("Tür:", "") : null;

                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50">
                      <CardHeader className="space-y-3">
                        <div className="flex items-center justify-between">
                          {uniType && (
                            <Badge variant="secondary" className="text-[10px]">
                              {uniType}
                            </Badge>
                          )}
                          {qsRanking && (
                            <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                              <Trophy className="h-3 w-3" />
                              QS #{qsRanking}
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-sm leading-snug group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        {city && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {city}
                            {bundesland ? `, ${bundesland}` : ""}
                          </div>
                        )}
                      </CardHeader>
                      <CardFooter className="pt-0">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                          Rehberi Oku
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Blog Post Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <Card
                key={post.slug}
                className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
              >
                {/* Featured Image Placeholder */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/15">
                    <span className="text-4xl text-primary/30">
                      {getCategoryEmoji(post.category || "")}
                    </span>
                  </div>
                  {post.category && (
                    <Badge className="absolute left-3 top-3" variant="secondary">
                      {post.category}
                    </Badge>
                  )}
                </div>

                <CardHeader className="flex-1 space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {post.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatTurkishDate(post.publishedAt)}
                      </span>
                    )}
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
