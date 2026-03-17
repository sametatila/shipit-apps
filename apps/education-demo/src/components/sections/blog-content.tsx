"use client";

import { useState } from "react";
import { Badge } from "@shipit/ui/badge";
import { Button } from "@shipit/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@shipit/ui/card";
import {
  Calendar,
  ArrowRight,
  MapPin,
  Trophy,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@shipit/ui";

interface BlogContentProps {
  regularPosts: any[];
  universityPosts: any[];
  categories: string[];
}

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    Rehber: "\u{1F4D8}",
    "Vize & Finans": "\u{1F4B0}",
    Ausbildung: "\u{1F6E0}\uFE0F",
    Studienkolleg: "\u{1F393}",
    "Ya\u015Fam": "\u{1F3E0}",
    "\u00DCniversite Rehberi": "\u{1F3EB}",
  };
  return emojiMap[category] || "\u{1F4DD}";
}

function formatTurkishDate(dateStr: string): string {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const date = new Date(dateStr);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getKeywords(post: any): string[] {
  if (!post.tags || !Array.isArray(post.tags)) return [];
  return post.tags.map((t: any) => t.tag).filter(Boolean);
}

export function BlogContent({
  regularPosts,
  universityPosts,
  categories,
}: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [uniShowCount, setUniShowCount] = useState(12);

  // Filter logic
  const showUniversitySection =
    activeCategory === "Tümü" || activeCategory === "Üniversite Rehberi";
  const showRegularSection =
    activeCategory === "Tümü" || activeCategory !== "Üniversite Rehberi";

  const filteredRegularPosts =
    activeCategory === "Tümü"
      ? regularPosts
      : regularPosts.filter((p) => p.category === activeCategory);

  const visibleUniversityPosts = universityPosts.slice(0, uniShowCount);
  const hasMoreUni = universityPosts.length > uniShowCount;

  // Category counts
  const getCategoryCount = (cat: string) => {
    if (cat === "Tümü") return regularPosts.length + universityPosts.length;
    if (cat === "Üniversite Rehberi") return universityPosts.length;
    return regularPosts.filter((p) => p.category === cat).length;
  };

  return (
    <>
      {/* Category Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setUniShowCount(12);
                }}
                className="focus:outline-none"
              >
                <Badge
                  variant={activeCategory === category ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer px-4 py-2 text-sm transition-colors",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary/10"
                  )}
                >
                  {category} ({getCategoryCount(category)})
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* University Guides Featured Section */}
      {showUniversitySection && universityPosts.length > 0 && (
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
              {visibleUniversityPosts.map((post) => {
                const tags = getKeywords(post);
                const qsTag = tags.find((t) => t.startsWith("QS:"));
                const qsRanking = qsTag ? qsTag.replace("QS:", "") : null;
                const cityTag = tags.find((t) => t.startsWith("Şehir:"));
                const city = cityTag ? cityTag.replace("Şehir:", "") : null;
                const bundeslandTag = tags.find((t) =>
                  t.startsWith("Eyalet:")
                );
                const bundesland = bundeslandTag
                  ? bundeslandTag.replace("Eyalet:", "")
                  : null;
                const typeTag = tags.find((t) => t.startsWith("Tür:"));
                const uniType = typeTag ? typeTag.replace("Tür:", "") : null;

                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50 overflow-hidden">
                      {/* Image placeholder */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/25">
                          <GraduationCap className="h-10 w-10 text-primary/40" />
                        </div>
                        {uniType && (
                          <Badge
                            variant="secondary"
                            className="absolute left-2 top-2 text-[10px]"
                          >
                            {uniType}
                          </Badge>
                        )}
                        {qsRanking && (
                          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-xs font-semibold text-primary">
                            <Trophy className="h-3 w-3" />#{qsRanking}
                          </span>
                        )}
                      </div>
                      <CardHeader className="space-y-2 p-4">
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
                      <CardFooter className="pt-0 p-4">
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
            {hasMoreUni && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  onClick={() => setUniShowCount((prev) => prev + 12)}
                >
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Daha Fazla Göster ({universityPosts.length - uniShowCount}{" "}
                  kalan)
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Blog Post Grid */}
      {showRegularSection && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredRegularPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  Bu kategoride henüz yazı bulunmuyor.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredRegularPosts.map((post) => (
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
                        <Badge
                          className="absolute left-3 top-3"
                          variant="secondary"
                        >
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
            )}
          </div>
        </section>
      )}
    </>
  );
}
