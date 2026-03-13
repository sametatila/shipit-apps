import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ApplicationForm } from "@/components/forms/application-form";
import { Card, CardContent, CardHeader, CardTitle } from "@shipit/ui";
import { FileText, UserCheck, Phone } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Başvuru Formu | Ücretsiz Danışmanlık",
    description: "Almanya'da eğitim hayalinize ilk adımı atın. Ücretsiz danışmanlık görüşmesi için başvuru formunu doldurun.",
    path: "/apply",
  });
}

const steps = [
  {
    icon: FileText,
    title: "Form Doldur",
    description: "Başvuru formunu eksiksiz doldurun. Bilgileriniz gizli tutulur.",
  },
  {
    icon: UserCheck,
    title: "Danışman Ataması",
    description: "Size özel bir eğitim danışmanı atanır ve dosyanız incelenir.",
  },
  {
    icon: Phone,
    title: "Ücretsiz Görüşme",
    description: "Danışmanınız sizi arayarak kişiye özel yol haritanızı oluşturur.",
  },
];

export default async function ApplyPage() {
  const siteConfig = await getSiteConfig();
  const t = await getTranslations();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Başvuru Formu" },
          ]}
        />

        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Ücretsiz Danışmanlık
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Başvuru Formu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Almanya&apos;da eğitim hayalinize ilk adımı atın. Formu doldurun,
            uzman danışmanlarımız sizinle iletişime geçsin. İlk görüşme tamamen
            ücretsizdir.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* Application Form Section */}
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Bilgilerinizi Doldurun
              </CardTitle>
              <p className="text-sm text-muted-foreground text-center">
                * ile işaretli alanlar zorunludur. Bilgileriniz gizlilik
                politikamız kapsamında korunmaktadır.
              </p>
            </CardHeader>
            <CardContent>
              <ApplicationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
