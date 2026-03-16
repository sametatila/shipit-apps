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
import { getPayload } from "payload";
import config from "@payload-config";

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

// Helper to extract structured tag data
function getTagValue(tags: any[] | undefined | null, prefix: string): string | null {
  if (!tags || !Array.isArray(tags)) return null;
  const found = tags.find((t: any) => t.tag?.startsWith(`${prefix}:`));
  return found ? found.tag.replace(`${prefix}:`, "") : null;
}

function getKeywords(post: any): string[] {
  if (!post.tags || !Array.isArray(post.tags)) return [];
  return post.tags
    .map((t: any) => t.tag)
    .filter((t: string) => t && !t.includes(":"));
}

async function getPost(slug: string) {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "blog-posts",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      limit: 1,
    });
    return docs[0] || null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "blog-posts",
      where: {
        status: { equals: "published" },
      },
      limit: 200,
    });
    return docs.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const siteConfig = await getSiteConfig();

  return generatePageMetadata(siteConfig, {
    title: post.title,
    description: post.excerpt || post.title,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();
  const post = await getPost(slug);

  if (!post) notFound();

  const isUniversity = post.category === "Üniversite Rehberi";
  const keywords = getKeywords(post);

  // Extract university metadata from tags
  const city = getTagValue(post.tags, "Şehir");
  const bundesland = getTagValue(post.tags, "Eyalet");
  const qsRanking = getTagValue(post.tags, "QS");
  const students = getTagValue(post.tags, "Öğrenci");
  const internationalPercent = getTagValue(post.tags, "Uluslararası");
  const uniType = getTagValue(post.tags, "Tür");
  const founded = getTagValue(post.tags, "Kuruluş");
  const website = getTagValue(post.tags, "Web");

  // Extract programs from tags (format: "Program:Makine Muhendisligi")
  const programs = (post.tags || [])
    .filter((t: any) => t.tag?.startsWith("Program:"))
    .map((t: any) => t.tag.replace("Program:", ""));

  if (isUniversity) {
    return (
      <>
        <JsonLd
          data={blogPostingJsonLd({
            title: post.title,
            description: post.excerpt || "",
            url: `${siteConfig.url}/blog/${post.slug}`,
            datePublished: post.publishedAt || "",
            author: { name: siteConfig.name },
            publisher: {
              name: siteConfig.name,
              logo: `${siteConfig.url}/logo.svg`,
            },
            keywords,
          })}
        />

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

              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                {post.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatTurkishDate(post.publishedAt)}
                  </span>
                )}
              </div>

              {/* University Info Card */}
              {(city || qsRanking || students || internationalPercent) && (
                <div className="rounded-xl border bg-card p-6 mb-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {city && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Konum</p>
                          <p className="text-sm font-semibold">
                            {city}{bundesland ? `, ${bundesland}` : ""}
                          </p>
                        </div>
                      </div>
                    )}
                    {qsRanking && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Trophy className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            QS Sıralama
                          </p>
                          <p className="text-sm font-semibold">#{qsRanking}</p>
                        </div>
                      </div>
                    )}
                    {students && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Öğrenci</p>
                          <p className="text-sm font-semibold">{students}</p>
                        </div>
                      </div>
                    )}
                    {internationalPercent && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Uluslararası
                          </p>
                          <p className="text-sm font-semibold">
                            %{internationalPercent}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Info Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
                {/* Main Content */}
                <article className="prose-custom">
                  {post.excerpt && (
                    <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                      {post.excerpt}
                    </p>
                  )}
                  {post.markdownBody ? (
                    renderMarkdownContent(post.markdownBody)
                  ) : (
                    <div className="rounded-xl border bg-muted/50 p-8 text-center">
                      <p className="text-muted-foreground">
                        İçerik yakında eklenecektir.
                      </p>
                    </div>
                  )}
                </article>

                {/* Sidebar */}
                <aside className="space-y-6">
                  <div className="rounded-xl border bg-card p-5 sticky top-24">
                    {programs.length > 0 && (
                      <>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          Popüler Programlar
                        </h3>
                        <ul className="space-y-2">
                          {programs.map((program: string) => (
                            <li
                              key={program}
                              className="text-sm text-muted-foreground flex items-center gap-2"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {program}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {(founded || uniType || bundesland) && (
                      <div className={programs.length > 0 ? "mt-5 pt-5 border-t" : ""}>
                        <h4 className="text-sm font-semibold mb-2">
                          Üniversite Bilgileri
                        </h4>
                        <dl className="space-y-2 text-sm">
                          {founded && (
                            <div className="flex justify-between">
                              <dt className="text-muted-foreground">Kuruluş</dt>
                              <dd className="font-medium">{founded}</dd>
                            </div>
                          )}
                          {uniType && (
                            <div className="flex justify-between">
                              <dt className="text-muted-foreground">Tür</dt>
                              <dd className="font-medium">{uniType}</dd>
                            </div>
                          )}
                          {bundesland && (
                            <div className="flex justify-between">
                              <dt className="text-muted-foreground">Eyalet</dt>
                              <dd className="font-medium">{bundesland}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    )}

                    {website && (
                      <a
                        href={`https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Resmi Web Sitesi
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}

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

  // Regular blog post layout
  return (
    <>
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          description: post.excerpt || "",
          url: `${siteConfig.url}/blog/${post.slug}`,
          datePublished: post.publishedAt || "",
          author: { name: siteConfig.name },
          publisher: {
            name: siteConfig.name,
            logo: `${siteConfig.url}/logo.svg`,
          },
          keywords,
        })}
      />

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

            {post.category && <Badge className="mb-4">{post.category}</Badge>}
            <h1 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatTurkishDate(post.publishedAt)}
                </span>
              )}
            </div>

            <article className="prose-custom">
              {post.excerpt && (
                <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                  {post.excerpt}
                </p>
              )}
              {post.markdownBody ? (
                renderMarkdownContent(post.markdownBody)
              ) : (
                <div className="rounded-xl border bg-muted/50 p-8 text-center">
                  <p className="text-muted-foreground">
                    İçerik yakında eklenecektir.
                  </p>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
