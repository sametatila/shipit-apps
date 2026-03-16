import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { JsonLd, blogPostingJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@shipit/ui/badge";
import { Link } from "@/i18n/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  MapPin,
  Trophy,
  Users,
  Globe,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { universityBlogPosts } from "@/data/university-blog-posts";

// Also include the static blog posts from the listing page
const staticBlogPosts = [
  {
    slug: "almanya-universite-egitimi-2026-basvuru-rehberi",
    title: "Almanya'da Üniversite Eğitimi: 2026 Başvuru Rehberi",
    category: "Rehber",
    date: "2026-02-15",
    readTime: "12 dk",
    content: "Bu rehber yakında eklenecektir.",
    keywords: ["Almanya üniversite başvuru"],
  },
  {
    slug: "sperrkonto-nedir-2026-guncel-tutar",
    title: "Sperrkonto Nedir? 2026 Güncel Tutarı ve Açılış Rehberi",
    category: "Vize & Finans",
    date: "2026-02-01",
    readTime: "8 dk",
    content: "Bu rehber yakında eklenecektir.",
    keywords: ["Sperrkonto"],
  },
  {
    slug: "almanya-ausbildung-maasli-mesleki-egitim",
    title: "Almanya'da Ausbildung: Maaşlı Mesleki Eğitimin Tüm Detayları",
    category: "Ausbildung",
    date: "2026-01-20",
    readTime: "15 dk",
    content: "Bu rehber yakında eklenecektir.",
    keywords: ["Ausbildung"],
  },
  {
    slug: "studienkolleg-rehberi-basvuru-hazirlik-fsp",
    title: "Studienkolleg Rehberi: Başvuru, Hazırlık ve FSP Sınavı",
    category: "Studienkolleg",
    date: "2026-01-10",
    readTime: "10 dk",
    content: "Bu rehber yakında eklenecektir.",
    keywords: ["Studienkolleg"],
  },
  {
    slug: "almanya-yasam-maliyeti-2026-sehir-karsilastirma",
    title: "Almanya'da Yaşam Maliyeti 2026: Şehir Şehir Karşılaştırma",
    category: "Yaşam",
    date: "2025-12-28",
    readTime: "11 dk",
    content: "Bu rehber yakında eklenecektir.",
    keywords: ["Almanya yaşam maliyeti"],
  },
  {
    slug: "almanya-ogrenci-vizesi-gerekli-belgeler",
    title: "Almanya Öğrenci Vizesi: Gerekli Belgeler ve Başvuru Süreci",
    category: "Vize & Finans",
    date: "2025-12-15",
    readTime: "9 dk",
    content: "Bu rehber yakında eklenecektir.",
    keywords: ["Almanya öğrenci vizesi"],
  },
];

function findPost(slug: string) {
  const uniPost = universityBlogPosts.find((p) => p.slug === slug);
  if (uniPost) return { type: "university" as const, post: uniPost };

  const staticPost = staticBlogPosts.find((p) => p.slug === slug);
  if (staticPost) return { type: "static" as const, post: staticPost };

  return null;
}

export async function generateStaticParams() {
  const allSlugs = [
    ...universityBlogPosts.map((p) => ({ slug: p.slug })),
    ...staticBlogPosts.map((p) => ({ slug: p.slug })),
  ];
  return allSlugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = findPost(slug);
  if (!result) return {};

  const siteConfig = await getSiteConfig();
  const title =
    result.type === "university"
      ? result.post.title
      : result.post.title;
  const description =
    result.type === "university"
      ? (result.post as any).excerpt
      : result.post.title;

  return generatePageMetadata(siteConfig, {
    title,
    description,
    path: `/blog/${slug}`,
  });
}

function formatTurkishDate(dateStr: string): string {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const date = new Date(dateStr);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function renderMarkdownContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  function flushList() {
    if (currentList.length > 0) {
      const isOrdered = /^\d+\./.test(currentList[0]);
      const items = currentList.map((item, i) => {
        const text = item.replace(/^[\d]+\.\s*/, "").replace(/^\-\s*/, "");
        const parts = text.split("**");
        return (
          <li key={i} className="mb-1">
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <strong key={j}>{part}</strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </li>
        );
      });
      if (isOrdered) {
        elements.push(
          <ol key={elements.length} className="list-decimal pl-6 mb-6 space-y-1">
            {items}
          </ol>
        );
      } else {
        elements.push(
          <ul key={elements.length} className="list-disc pl-6 mb-6 space-y-1">
            {items}
          </ul>
        );
      }
      currentList = [];
    }
  }

  function flushTable() {
    if (tableRows.length > 0) {
      const header = tableRows[0];
      const body = tableRows.slice(1);
      elements.push(
        <div key={elements.length} className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                {header.map((cell, i) => (
                  <th key={i} className="text-left p-3 font-semibold text-sm">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, i) => (
                <tr key={i} className="border-b border-muted">
                  {row.map((cell, j) => (
                    <td key={j} className="p-3 text-sm">
                      {cell.trim().startsWith("**") ? (
                        <strong>{cell.trim().replace(/\*\*/g, "")}</strong>
                      ) : (
                        cell.trim()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.startsWith("|") && line.endsWith("|")) {
      if (line.includes("---")) continue; // separator row
      flushList();
      inTable = true;
      const cells = line
        .split("|")
        .filter((c) => c.trim() !== "");
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="text-xl font-bold mt-8 mb-4">
          {line.replace("### ", "")}
        </h3>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold mt-10 mb-4">
          {line.replace("## ", "")}
        </h2>
      );
      continue;
    }

    // List items
    if (/^[\d]+\.\s/.test(line) || /^- \*\*/.test(line) || /^- /.test(line)) {
      currentList.push(line);
      continue;
    }

    // Flush pending list
    flushList();

    // Empty line
    if (line.trim() === "") continue;

    // Regular paragraph with bold support
    const parts = line.split("**");
    elements.push(
      <p key={elements.length} className="mb-4 leading-relaxed text-muted-foreground">
        {parts.map((part, j) =>
          j % 2 === 1 ? (
            <strong key={j} className="text-foreground">
              {part}
            </strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </p>
    );
  }

  flushList();
  flushTable();

  return elements;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();
  const result = findPost(slug);

  if (!result) notFound();

  const { type, post } = result;

  if (type === "university") {
    const uni = post as (typeof universityBlogPosts)[number];
    return (
      <>
        <JsonLd
          data={blogPostingJsonLd({
            title: uni.title,
            description: uni.excerpt,
            url: `${siteConfig.url}/blog/${uni.slug}`,
            datePublished: uni.date,
            author: { name: siteConfig.name },
            publisher: {
              name: siteConfig.name,
              logo: `${siteConfig.url}/logo.svg`,
            },
            keywords: uni.keywords,
          })}
        />

        <div className="container mx-auto px-4">
          <Breadcrumbs
            baseUrl={siteConfig.url}
            items={[
              { label: t("common.home"), href: "/" },
              { label: "Blog", href: "/blog" },
              { label: uni.universityName },
            ]}
          />
        </div>

        {/* Hero Banner */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Blog&apos;a Dön
              </Link>

              <Badge className="mb-4">{uni.category}</Badge>
              <h1 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl mb-6 leading-tight">
                {uni.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatTurkishDate(uni.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {uni.readTime}
                </span>
              </div>

              {/* University Info Card */}
              <div className="rounded-xl border bg-card p-6 mb-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Konum</p>
                      <p className="text-sm font-semibold">
                        {uni.city}, {uni.bundesland}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        QS Sıralama
                      </p>
                      <p className="text-sm font-semibold">#{uni.qsRanking}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Öğrenci</p>
                      <p className="text-sm font-semibold">{uni.students}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Uluslararası
                      </p>
                      <p className="text-sm font-semibold">
                        %{uni.internationalPercent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
                {/* Main Content */}
                <article className="prose-custom">
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                    {uni.excerpt}
                  </p>
                  {renderMarkdownContent(uni.content)}
                </article>

                {/* Sidebar */}
                <aside className="space-y-6">
                  {/* Programs */}
                  <div className="rounded-xl border bg-card p-5 sticky top-24">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Popüler Programlar
                    </h3>
                    <ul className="space-y-2">
                      {uni.programs.map((program) => (
                        <li
                          key={program}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {program}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 pt-5 border-t">
                      <h4 className="text-sm font-semibold mb-2">
                        Üniversite Bilgileri
                      </h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Kuruluş</dt>
                          <dd className="font-medium">{uni.founded}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Tür</dt>
                          <dd className="font-medium">{uni.type}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Eyalet</dt>
                          <dd className="font-medium">{uni.bundesland}</dd>
                        </div>
                      </dl>
                    </div>

                    <a
                      href={`https://${uni.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Resmi Web Sitesi
                      <ExternalLink className="h-4 w-4" />
                    </a>

                    <Link
                      href="/apply"
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                    >
                      Başvuru Yap
                    </Link>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Static blog posts (placeholder)
  return (
    <>
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
      </div>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Blog&apos;a Dön
            </Link>

            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatTurkishDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            <div className="rounded-xl border bg-muted/50 p-8 text-center">
              <p className="text-muted-foreground">
                Bu makale yakında yayınlanacaktır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
