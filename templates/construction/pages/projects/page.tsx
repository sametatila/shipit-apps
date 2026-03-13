import type { Metadata } from "next";
import { generatePageMetadata } from "@shipit/seo";
import { JsonLd, constructionJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { ProjectCard } from "@/components/project-card";
import { BeforeAfter } from "@/components/before-after";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Projelerimiz",
    description:
      "Tamamlanan ve devam eden insaat projelerimizi inceleyin. Konut, ticari ve restorasyon projelerimiz.",
    path: "/projects",
  });
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  beforeImage?: string;
  afterImage?: string;
}

// Ornek proje verileri - gercek projede API veya CMS'den cekilecektir
const projects: Project[] = [
  {
    id: "proje-1",
    title: "Modern Konut Projesi",
    description:
      "150 dairelik modern yasam alani. Akilli ev sistemleri ve cevre dostu tasarim.",
    image: "/images/projects/project-1.jpg",
    category: "Konut",
    date: "2024",
    beforeImage: "/images/projects/project-1-before.jpg",
    afterImage: "/images/projects/project-1-after.jpg",
  },
  {
    id: "proje-2",
    title: "Is Merkezi Insaati",
    description:
      "20 katlik A sinifi ofis binasi. LEED sertifikali surdurulebilir yapi.",
    image: "/images/projects/project-2.jpg",
    category: "Ticari",
    date: "2023",
  },
  {
    id: "proje-3",
    title: "Tarihi Bina Restorasyonu",
    description:
      "Osmanli donemi tarihi yapinin ozgun dokusuna sadik kalarak restorasyonu.",
    image: "/images/projects/project-3.jpg",
    category: "Restorasyon",
    date: "2023",
    beforeImage: "/images/projects/project-3-before.jpg",
    afterImage: "/images/projects/project-3-after.jpg",
  },
  {
    id: "proje-4",
    title: "Villa Projesi",
    description:
      "Luks villa projesi. Ozel havuz, peyzaj ve akilli ev sistemleri.",
    image: "/images/projects/project-4.jpg",
    category: "Konut",
    date: "2024",
  },
];

const categories = ["Tumu", ...new Set(projects.map((p) => p.category))];

// Oncesi/Sonrasi olan projeler
const beforeAfterProjects = projects.filter(
  (p) => p.beforeImage && p.afterImage
);

export default async function ProjectsPage() {
  const siteConfig = await getSiteConfig();
  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={constructionJsonLd({
          name: siteConfig.business.name,
          description: siteConfig.description,
          url: siteConfig.url,
          phone: siteConfig.contact.phone,
          email: siteConfig.contact.email,
          address: {
            street: siteConfig.contact.address ?? "",
            city: "İstanbul",
            postalCode: "34000",
            country: "TR",
          },
        })}
      />

      <section className="container mx-auto px-4 py-16">
        {/* Sayfa Basligi */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Projelerimiz
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Yillardir basariyla tamamladigimiz projelerimizi inceleyin.
            Her projemizde kalite ve guvenilirlik on plandadir.
          </p>
        </div>

        {/* Kategori Filtreleme */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={
                category === "Tumu"
                  ? "/projects"
                  : `/projects?category=${encodeURIComponent(category)}`
              }
              className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </a>
          ))}
        </div>

        {/* Proje Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              category={project.category}
              date={project.date}
              href={`/projects/${project.id}`}
            />
          ))}
        </div>
      </section>

      {/* Oncesi / Sonrasi Bolumu */}
      {beforeAfterProjects.length > 0 && (
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">
                Oncesi / Sonrasi
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Projelerimizin donusum surecini yakindan inceleyin.
              </p>
            </div>
            <div className="mx-auto max-w-4xl space-y-12">
              {beforeAfterProjects.map((project) => (
                <BeforeAfter
                  key={project.id}
                  beforeImage={project.beforeImage!}
                  afterImage={project.afterImage!}
                  title={project.title}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
