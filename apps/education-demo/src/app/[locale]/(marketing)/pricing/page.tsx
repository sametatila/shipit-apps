import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Badge } from "@shipit/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@shipit/ui/card";
import { Check, CreditCard } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Hizmet Paketleri & Fiyatlandırma",
    description: "Almanya eğitim danışmanlığı hizmet paketleri. Üniversite başvurusu, vize desteği, konaklama ve mentörlük dahil kapsamlı danışmanlık hizmetleri.",
    path: "/pricing",
  });
}

export default async function PricingPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  const additionalServices = [
    { name: "Ausbildung firma eşleştirme", price: "₺9.900" },
    { name: "Almanca özel ders paketi", price: "₺4.900/ay" },
    { name: "Studienkolleg hazırlık programı", price: "₺7.900" },
  ];

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
            Fiyatlandırma
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

      <Pricing
        title="Size Uygun Paketi Seçin"
        subtitle="Paketlerimiz"
        plans={[
          {
            name: "Başlangıç Paketi",
            price: "₺24.900",
            period: "tek seferlik",
            description:
              "Almanya'da üniversite başvuru sürecinizi profesyonel destekle başlatın.",
            features: [
              "Üniversite/program araştırması ve eşleştirme",
              "3 üniversiteye başvuru dosyası hazırlama",
              "Motivasyon mektubu düzenleme",
              "Belge kontrolü ve çeviri yönlendirme",
              "E-posta ve telefon desteği",
            ],
            ctaText: "Başvuru Yap",
            ctaHref: "/contact",
          },
          {
            name: "Premium Paket",
            price: "₺39.900",
            period: "tek seferlik",
            description:
              "Başvurudan vize sürecine kadar uçtan uca danışmanlık hizmeti.",
            features: [
              "Başlangıç Paketi'ndeki tüm hizmetler",
              "5 üniversiteye başvuru",
              "Sperrkonto açılış danışmanlığı",
              "Vize başvurusu hazırlık ve randevu desteği",
              "Sağlık sigortası danışmanlığı",
              "Uçuş planlaması",
              "7/24 WhatsApp destek hattı",
              "Almanya'ya varış sonrası oryantasyon (online)",
            ],
            ctaText: "Başvuru Yap",
            ctaHref: "/contact",
            popular: true,
          },
          {
            name: "VIP Tam Destek",
            price: "₺59.900",
            period: "tek seferlik",
            description:
              "Türkiye'den Almanya'ya tam kapsamlı, kişiye özel premium hizmet.",
            features: [
              "Premium Paket'teki tüm hizmetler",
              "Sınırsız üniversite başvurusu",
              "Kişiye özel Almanca öğrenme planı",
              "Konaklama bulma desteği",
              "Havaalanı karşılama (Almanya)",
              "Anmeldung, banka hesabı, telefon hattı desteği",
              "İlk 6 ay Almanya'da birebir mentörlük",
              "Acil durum 7/24 telefon hattı",
            ],
            ctaText: "Başvuru Yap",
            ctaHref: "/contact",
          },
        ]}
      />

      {/* Ek Hizmetler */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Ek Hizmetler
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              İhtiyacınıza Göre Ekleyin
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-heading text-3xl font-bold text-primary">
                    {service.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Taksit İmkanı */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col md:flex-row items-center gap-6 p-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-heading text-xl font-bold mb-2">
                  Taksit İmkanı
                </h3>
                <p className="text-muted-foreground">
                  Tüm paketlerimizde kredi kartına 6 veya 9 taksit imkanı
                  sunuyoruz. Ayrıca havale/EFT ile ödemelerde %5 indirim
                  fırsatından yararlanabilirsiniz. Detaylı bilgi için bizimle
                  iletişime geçin.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Faq
        title="Sıkça Sorulan Sorular"
        subtitle="Fiyatlandırma Hakkında"
        faqs={[
          {
            question: "Ödeme nasıl yapılır, taksit seçenekleri nelerdir?",
            answer:
              "Kredi kartı, havale/EFT ve Papara ile ödeme kabul ediyoruz. Kredi kartına 6 veya 9 taksit imkanı sunuyoruz. Havale/EFT ile yapılan ödemelerde %5 indirim uygulanmaktadır.",
          },
          {
            question: "Paket satın aldıktan sonra ek ücret ödenir mi?",
            answer:
              "Hayır, paket kapsamında belirtilen tüm hizmetler dahildir. Ancak noter onayı, çeviri ücreti, vize harcı gibi resmi masraflar tarafınıza aittir. Bu ücretler hakkında süreç başında detaylı bilgi verilmektedir.",
          },
          {
            question: "Başvurum kabul edilmezse ücret iadesi yapılır mı?",
            answer:
              "Danışmanlık hizmetimiz başvuru sürecinizin profesyonelce yönetilmesini kapsar; kabul garantisi verilmemektedir. Ancak hiçbir üniversiteden kabul alınamaması durumunda, bir sonraki dönem için ücretsiz yeniden başvuru desteği sağlıyoruz.",
          },
          {
            question:
              "Hangi paketi seçeceğime karar veremiyorum, yardımcı olabilir misiniz?",
            answer:
              "Elbette! Ücretsiz ön görüşmemizde durumunuzu değerlendirip size en uygun paketi öneriyoruz. WhatsApp veya iletişim formu üzerinden bize ulaşabilirsiniz.",
          },
        ]}
      />

      <CTA
        title="Almanya Eğitim Hayalinizi Gerçeğe Dönüştürün"
        description="Ücretsiz ön görüşme ile başlayın. Uzman danışmanlarımız sizin için en uygun planı belirlesin."
        buttonText="Ücretsiz Görüşme Ayarlayın"
        buttonHref="/contact"
      />
    </>
  );
}
