import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { ContactForm } from "@/components/forms/contact-form";
import { GoogleMap } from "@/components/shared/google-map";
import { Card, CardContent, CardHeader, CardTitle } from "@shipit/ui";
import { Badge } from "@shipit/ui/badge";
import { Phone, Mail, MapPin, Clock, Building2, Globe } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: t("contactTitle"),
    description: t("contactDescription", { siteName: siteConfig.name }),
    path: "/contact",
  });
}

const countryLabels: Record<string, string> = {
  TR: "Türkiye",
  DE: "Almanya",
};

const countryColors: Record<string, string> = {
  TR: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  DE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  const t = await getTranslations();

  const hqOffice = siteConfig.offices.find((o) => o.isHQ) ?? siteConfig.offices[0];

  return (
    <>
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[{ label: t("common.home"), href: "/" }, { label: t("contact.title") }]}
        />
      </div>

      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t("contact.subtitle")}
            </p>
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("contact.description")}
            </p>
          </div>

          {/* Genel İletişim Bilgileri */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">{siteConfig.contact.email}</span>
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">{t("contact.weekdays")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Harita */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.formTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm source="contact" />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <GoogleMap
                address={hqOffice.address}
                className="h-[400px] rounded-lg overflow-hidden"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ofislerimiz */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Ofislerimiz
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Türkiye ve Almanya&apos;da Yanınızdayız
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              4 ofisimiz ile Türkiye ve Almanya&apos;da size en yakın noktadan hizmet veriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {siteConfig.offices.map((office) => (
              <Card
                key={office.name}
                className={`relative overflow-hidden transition-shadow hover:shadow-lg ${
                  office.isHQ ? "ring-2 ring-primary/20" : ""
                }`}
              >
                {office.isHQ && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      <Building2 className="mr-1 h-3 w-3" />
                      Genel Merkez
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{office.name}</CardTitle>
                      <Badge
                        variant="secondary"
                        className={`mt-1 text-xs ${countryColors[office.country] ?? ""}`}
                      >
                        {countryLabels[office.country] ?? office.country}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <a
                      href={`tel:${office.phone.replace(/[\s()]/g, "")}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
