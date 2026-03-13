import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { ContactForm } from "@/components/forms/contact-form";
import { GoogleMap } from "@/components/shared/google-map";
import { Card, CardContent, CardHeader, CardTitle } from "@shipit/ui";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
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

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  const t = await getTranslations();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Breadcrumbs baseUrl={siteConfig.url} items={[{ label: t("common.home"), href: "/" }, { label: t("contact.title") }]} />
        <div className="text-center space-y-4 mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("contact.subtitle")}
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.formTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">{t("common.phone")}</p>
                    <a href={`tel:${siteConfig.contact.phone}`} className="text-muted-foreground hover:text-primary">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">{t("common.email")}</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-muted-foreground hover:text-primary">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">{t("common.address")}</p>
                    <p className="text-muted-foreground">{siteConfig.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">{t("common.workingHours")}</p>
                    <p className="text-muted-foreground">{t("contact.weekdays")}</p>
                    <p className="text-muted-foreground">{t("contact.saturday")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <GoogleMap address={siteConfig.contact.address} className="h-[300px] rounded-lg overflow-hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
