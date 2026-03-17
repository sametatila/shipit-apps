import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { JsonLd, blogPostingJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { BlogContent } from "@/components/sections/blog-content";
import { getPayload } from "payload";
import config from "@payload-config";

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

  // Extract tags as keywords (server-side only for JSON-LD)
  function getKeywords(post: any): string[] {
    if (!post.tags || !Array.isArray(post.tags)) return [];
    return post.tags.map((t: any) => t.tag).filter(Boolean);
  }

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

      {/* Interactive Blog Content */}
      <BlogContent
        regularPosts={regularPosts}
        universityPosts={universityPosts}
        categories={categories}
      />

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
