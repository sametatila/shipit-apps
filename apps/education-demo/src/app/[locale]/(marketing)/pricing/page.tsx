import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PackageComparison, type PackageData } from "@/components/sections/package-comparison";
import { Faq } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Card, CardContent } from "@shipit/ui/card";
import { CreditCard, Route, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";

/* ------------------------------------------------------------------ */
/*  Fallback data                                                      */
/* ------------------------------------------------------------------ */

const FALLBACK_PACKAGES: PackageData[] = [
  {
    name: "Basic Paket",
    slug: "basic",
    description: "Üniversite başvuru sürecinizi profesyonel destekle başlatın.",
    price: 1000,
    currency: "EUR",
    popular: false,
    ctaText: "Başvuru Yap",
    highlights: [
      "Üniversite başvuru dosyası hazırlama",
      "1 üniversiteye başvuru",
      "%100 kabul garantisi",
    ],
    features: [
      { featureName: "Üniversite başvuru dosyasının hazırlanması", value: "Dahil" },
      { featureName: "Üniversite başvurusu, masraflar, çeviriler", value: "Dahil" },
      { featureName: "%100 Alman devlet üniversitesi kabul garantisi", value: "Dahil" },
      { featureName: "Danışmanla bire-bir toplantı", value: "1" },
      { featureName: "Üniversite başvuru imkanı", value: "1" },
      { featureName: "Whatsapp grubu - haftalık Zoom toplantısı", value: "Dahil değil" },
      { featureName: "Almanya'da dil kursu kayıt desteği", value: "Anlaşmalı dil kursu" },
      { featureName: "Vize dosyasının hazırlanması ve kontrolü", value: "Dahil değil" },
      { featureName: "Vize randevusunun erken planlanması ve başvurusu", value: "Dahil değil" },
      { featureName: "Vize kabul ve iade garantisi", value: "Dahil değil" },
      { featureName: "Almanya'da adres kaydı / oturum başvurusu desteği", value: "Dahil değil" },
      { featureName: "Almanya'daki ilk 6 ay iletişim desteği", value: "Dahil değil" },
    ],
  },
  {
    name: "Standart Paket",
    slug: "standart",
    description: "Başvurudan vize sürecine kadar uçtan uca danışmanlık.",
    price: 1500,
    currency: "EUR",
    popular: false,
    ctaText: "Başvuru Yap",
    highlights: [
      "Vize dosyası hazırlama ve randevu",
      "WhatsApp grubu & Zoom toplantısı",
      "Vize kabul ve iade garantisi",
    ],
    features: [
      { featureName: "Üniversite başvuru dosyasının hazırlanması", value: "Dahil" },
      { featureName: "Üniversite başvurusu, masraflar, çeviriler", value: "Dahil" },
      { featureName: "%100 Alman devlet üniversitesi kabul garantisi", value: "Dahil" },
      { featureName: "Danışmanla bire-bir toplantı", value: "Dahil" },
      { featureName: "Üniversite başvuru imkanı", value: "1" },
      { featureName: "Whatsapp grubu - haftalık Zoom toplantısı", value: "Dahil" },
      { featureName: "Almanya'da dil kursu kayıt desteği", value: "En uygun 3 dil kursu" },
      { featureName: "Vize dosyasının hazırlanması ve kontrolü", value: "Dahil" },
      { featureName: "Vize randevusunun erken planlanması ve başvurusu", value: "Dahil" },
      { featureName: "Vize kabul ve iade garantisi", value: "Dahil" },
      { featureName: "Almanya'da adres kaydı / oturum başvurusu desteği", value: "Dahil değil" },
      { featureName: "Almanya'daki ilk 6 ay iletişim desteği", value: "Dahil değil" },
    ],
  },
  {
    name: "Premium Paket",
    slug: "premium",
    description: "Türkiye'den Almanya'ya tam kapsamlı premium hizmet.",
    price: 2000,
    currency: "EUR",
    popular: true,
    ctaText: "Başvuru Yap",
    highlights: [
      "3 üniversiteye başvuru",
      "%100 vize kabul ve iade garantisi",
      "Almanya'daki ilk 6 ay iletişim desteği",
    ],
    features: [
      { featureName: "Üniversite başvuru dosyasının hazırlanması", value: "Dahil" },
      { featureName: "Üniversite başvurusu, masraflar, çeviriler", value: "Dahil" },
      { featureName: "%100 Alman devlet üniversitesi kabul garantisi", value: "Dahil" },
      { featureName: "Danışmanla bire-bir toplantı", value: "Dahil" },
      { featureName: "Üniversite başvuru imkanı", value: "3" },
      { featureName: "Whatsapp grubu - haftalık Zoom toplantısı", value: "Dahil" },
      { featureName: "Almanya'da dil kursu kayıt desteği", value: "Üniversite bünyesinde" },
      { featureName: "Vize dosyasının hazırlanması ve kontrolü", value: "Dahil" },
      { featureName: "Vize randevusunun erken planlanması ve başvurusu", value: "Dahil" },
      { featureName: "Vize kabul ve iade garantisi", value: "%100" },
      { featureName: "Almanya'da adres kaydı / oturum başvurusu desteği", value: "Dahil" },
      { featureName: "Almanya'daki ilk 6 ay iletişim desteği", value: "Dahil" },
    ],
  },
];

const GLOBAL_NOTE = "Yeminli tercüme ve başvuru masrafları pakete dahildir.";

/* ------------------------------------------------------------------ */
/*  Data Fetching                                                      */
/* ------------------------------------------------------------------ */

async function getPackages(): Promise<PackageData[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "service-packages" as any,
      where: {
        status: { equals: "active" },
      },
      sort: "sortOrder",
      limit: 10,
    });

    if (docs.length === 0) return FALLBACK_PACKAGES;

    return (docs as any[]).map((doc) => ({
      name: doc.name as string,
      slug: doc.slug as string,
      description: (doc.description as string) || "",
      price: doc.price as number,
      currency: (doc.currency as string) || "EUR",
      popular: (doc.popular as boolean) || false,
      ctaText: (doc.ctaText as string) || "Başvuru Yap",
      note: (doc.note as string) || undefined,
      highlights:
        (doc.highlights as { text: string }[] | null)?.map((h) => h.text) || [],
      features:
        (doc.features as { featureName: string; value: string }[] | null)?.map(
          (f) => ({
            featureName: f.featureName,
            value: f.value,
          })
        ) || [],
    }));
  } catch {
    return FALLBACK_PACKAGES;
  }
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Hizmet Paketleri",
    description: "Almanya eğitim danışmanlığı hizmet paketleri. Üniversite başvurusu, vize desteği ve %100 kabul garantili danışmanlık hizmetleri.",
    path: "/pricing",
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function PricingPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();
  const packages = await getPackages();

  return (
    <>
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Hizmet Paketleri" },
          ]}
        />
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Danışmanlık Hizmetleri
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl mt-4">
            Hizmet Paketleri
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Almanya eğitim hayalinize giden yolda size en uygun paketi seçin.
            Her paket, uzman danışmanlarımızın birebir desteğiyle sunulmaktadır.
          </p>
        </div>
      </section>

      {/* Karşılaştırma Tablosu */}
      <PackageComparison packages={packages} globalNote={GLOBAL_NOTE} />

      {/* Bilgilendirme */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col md:flex-row items-center gap-6 p-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-heading text-xl font-bold mb-2">
                  Detaylı Bilgi ve Fiyatlandırma
                </h3>
                <p className="text-muted-foreground">
                  Paket detayları ve fiyatlandırma hakkında bilgi almak için
                  ücretsiz danışmanlık görüşmesi talep edebilirsiniz.
                  Uzman danışmanlarımız size en uygun paketi önersin.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Yol Haritası Yönlendirme */}
      <section className="bg-primary/5 border-y">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Route className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">
                  Sürecin nasıl işlediğini merak mı ediyorsunuz?
                </p>
                <p className="text-sm text-muted-foreground">
                  Belgelerden Almanya&apos;ya yerleşime kadar tüm adımları inceleyin.
                </p>
              </div>
            </div>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Yol Haritası
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Faq
        title="Sıkça Sorulan Sorular"
        subtitle="Fiyatlandırma Hakkında"
        faqs={[
          {
            question: "Paketler neleri kapsıyor?",
            answer:
              "Her paket farklı seviyede destek sunar. Temel üniversite başvurusundan vize sürecine, Almanya'ya yerleşme desteğine kadar ihtiyacınıza göre paket seçebilirsiniz. Detaylı bilgi için ücretsiz danışmanlık görüşmesi talep edin.",
          },
          {
            question: "Paket satın aldıktan sonra ek ücret ödenir mi?",
            answer:
              "Paket kapsamında belirtilen tüm hizmetler dahildir. Yeminli tercüme ve başvuru masrafları pakete dahildir. Ancak noter onayı, vize harcı gibi resmi masraflar tarafınıza aittir.",
          },
          {
            question: "Başvurum kabul edilmezse ne olur?",
            answer:
              "Tüm paketlerimizde %100 Alman devlet üniversitesi kabul garantisi sunuyoruz. Standart ve Premium paketlerde vize kabul ve iade garantisi de mevcuttur.",
          },
          {
            question: "Hangi paketi seçeceğime karar veremiyorum, yardımcı olabilir misiniz?",
            answer:
              "Elbette! Ücretsiz ön görüşmemizde durumunuzu değerlendirip size en uygun paketi öneriyoruz. WhatsApp veya iletişim formu üzerinden bize ulaşabilirsiniz.",
          },
        ]}
      />

      <CTA
        title="Almanya Eğitim Hayalinizi Gerçeğe Dönüştürün"
        description="Ücretsiz ön görüşme ile başlayın. Uzman danışmanlarımız sizin için en uygun planı belirlesin."
        buttonText="Ücretsiz Görüşme Ayarlayın"
      />
    </>
  );
}
