import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Pricing } from "@/components/sections/pricing";
import { JsonLd, educationalOrganizationJsonLd, faqJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Link } from "@/i18n/navigation";
import { Badge } from "@shipit/ui/badge";
import {
  GraduationCap,
  BookOpen,
  Award,
  Wrench,
  Languages,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  MapPin,
  Trophy,
} from "lucide-react";

export default async function HomePage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  return (
    <>
      <JsonLd
        data={educationalOrganizationJsonLd({
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          phone: siteConfig.contact.phone,
          email: siteConfig.contact.email,
          address: {
            street: siteConfig.contact.address,
            city: "İstanbul",
            postalCode: "34340",
            country: "TR",
          },
          coordinates: siteConfig.business.coordinates,
          openingHours: siteConfig.business.openingHours,
        })}
      />

      {/* Hero */}
      <Hero
        title={t("home.hero.title")}
        subtitle={t("home.hero.subtitle")}
        description={t("home.hero.description")}
        ctaText={t("home.hero.cta")}
        ctaHref="/apply"
        secondaryCtaText={t("home.hero.secondaryCta")}
        secondaryCtaHref={`tel:${siteConfig.contact.phone}`}
        image="/images/hero/almanya-egitim.svg"
      />

      {/* Uygunluk Testi Banner */}
      <section className="bg-primary/5 border-y">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">
                  Hangi program size uygun? 2 dakikada öğrenin!
                </p>
                <p className="text-sm text-muted-foreground">
                  Ücretsiz uygunluk testimizle profilinize en uygun programı
                  belirleyin.
                </p>
              </div>
            </div>
            <Link
              href="/eligibility-check"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Uygunluk Testi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Programlar Önizleme */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Eğitim Programları
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Almanya&apos;da Size Uygun Program
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Studienkolleg",
                desc: "1 yıllık üniversite hazırlık programı",
                badge: "B1 Almanca",
              },
              {
                icon: BookOpen,
                title: "Lisans (Bachelor)",
                desc: "Devlet üniversitelerinde ücretsiz eğitim",
                badge: "3-4 Yıl",
              },
              {
                icon: Award,
                title: "Yüksek Lisans (Master)",
                desc: "İngilizce ve Almanca program seçenekleri",
                badge: "2 Yıl",
              },
              {
                icon: Wrench,
                title: "Ausbildung",
                desc: "Maaşlı mesleki eğitim (800-1.200€/ay)",
                badge: "2-3 Yıl",
              },
              {
                icon: Languages,
                title: "Almanca Kursları",
                desc: "A1'den C2'ye, TestDaF & DSH hazırlık",
                badge: "3-12 Ay",
              },
              {
                icon: Lightbulb,
                title: "Doktora (PhD)",
                desc: "Araştırma pozisyonuyla finanse edilen programlar",
                badge: "3-5 Yıl",
              },
            ].map((program) => (
              <Link
                key={program.title}
                href="/programs"
                className="group flex items-start gap-4 rounded-xl border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <program.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {program.title}
                    </h3>
                    <Badge variant="secondary" className="text-[10px]">
                      {program.badge}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {program.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Tüm Programları İncele
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hizmetlerimiz */}
      <Features
        title={t("home.features.title")}
        subtitle={t("home.features.subtitle")}
        features={[
          {
            title: t("home.features.professional.title"),
            description: t("home.features.professional.description"),
            icon: "GraduationCap",
          },
          {
            title: t("home.features.support247.title"),
            description: t("home.features.support247.description"),
            icon: "BookOpen",
          },
          {
            title: t("home.features.reliable.title"),
            description: t("home.features.reliable.description"),
            icon: "Wrench",
          },
          {
            title: t("home.features.customerFocused.title"),
            description: t("home.features.customerFocused.description"),
            icon: "Languages",
          },
          {
            title: t("home.features.experiencedTeam.title"),
            description: t("home.features.experiencedTeam.description"),
            icon: "Shield",
          },
          {
            title: t("home.features.qualityGuarantee.title"),
            description: t("home.features.qualityGuarantee.description"),
            icon: "Globe",
          },
        ]}
      />

      {/* İstatistikler */}
      <Stats
        stats={[
          {
            value: "2000",
            suffix: "+",
            label: t("home.stats.happyCustomers"),
          },
          {
            value: "8",
            suffix: "+",
            label: t("home.stats.yearsExperience"),
          },
          {
            value: "40",
            suffix: "+",
            label: t("home.stats.completedProjects"),
          },
          { value: "%98", label: t("home.stats.support") },
        ]}
      />

      {/* Partner Üniversiteler */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Anlaşmalı Üniversiteler
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Almanya&apos;nın En İyi Üniversiteleri
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "TU München",
                city: "München",
                qs: 49,
                type: "Teknik Üniversite",
              },
              {
                name: "LMU München",
                city: "München",
                qs: 59,
                type: "Üniversite",
              },
              {
                name: "RWTH Aachen",
                city: "Aachen",
                qs: 87,
                type: "Teknik Üniversite",
              },
              {
                name: "Universität Heidelberg",
                city: "Heidelberg",
                qs: 47,
                type: "Üniversite",
              },
              {
                name: "TU Berlin",
                city: "Berlin",
                qs: 106,
                type: "Teknik Üniversite",
              },
              {
                name: "FU Berlin",
                city: "Berlin",
                qs: 91,
                type: "Üniversite",
              },
              {
                name: "KIT Karlsruhe",
                city: "Karlsruhe",
                qs: 119,
                type: "Teknik Üniversite",
              },
              {
                name: "Universität Hamburg",
                city: "Hamburg",
                qs: 164,
                type: "Üniversite",
              },
            ].map((uni) => (
              <div
                key={uni.name}
                className="rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">{uni.name}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {uni.city}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Trophy className="h-3 w-3" />
                    QS #{uni.qs}
                  </span>
                </div>
                <Badge variant="outline" className="mt-2 text-[10px]">
                  {uni.type}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/universities"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Tüm Üniversiteleri İncele
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hizmet Paketleri Önizleme */}
      <Pricing
        title="Hizmet Paketlerimiz"
        subtitle="Fiyatlandırma"
        plans={[
          {
            name: "Başlangıç",
            price: "₺24.900",
            description: "Temel danışmanlık ve 3 üniversiteye başvuru",
            features: [
              "Program araştırması ve eşleştirme",
              "3 üniversiteye başvuru",
              "Motivasyon mektubu düzenleme",
              "E-posta ve telefon desteği",
            ],
            ctaText: "Başvuru Yap",
            ctaHref: "/apply",
          },
          {
            name: "Premium",
            price: "₺39.900",
            description: "Kapsamlı destek: başvuru + vize + varış",
            features: [
              "5 üniversiteye başvuru",
              "Sperrkonto danışmanlığı",
              "Vize başvuru desteği",
              "7/24 WhatsApp desteği",
              "Varış sonrası oryantasyon",
            ],
            ctaText: "Başvuru Yap",
            ctaHref: "/apply",
            popular: true,
          },
          {
            name: "VIP",
            price: "₺59.900",
            description: "Uçtan uca tam destek ve 6 ay mentörlük",
            features: [
              "Sınırsız üniversite başvurusu",
              "Konaklama bulma desteği",
              "Havaalanı karşılama",
              "6 ay birebir mentörlük",
              "7/24 acil durum hattı",
            ],
            ctaText: "Başvuru Yap",
            ctaHref: "/apply",
          },
        ]}
      />

      {/* Başarı Hikayeleri */}
      <Testimonials
        title={t("home.testimonials.title")}
        subtitle={t("home.testimonials.subtitle")}
        testimonials={[
          {
            name: "Elif Yıldırım",
            role: "TU München - Makine Mühendisliği",
            content:
              "Studienkolleg sürecinden üniversite başvurusuna kadar her adımda yanımdaydılar. Şimdi TU München'de hayallerimin bölümünde okuyorum. Vize sürecindeki destekleri olmasaydı bu kadar kolay olmazdı.",
            rating: 5,
          },
          {
            name: "Burak Arslan",
            role: "Ausbildung - Berlin, IT-Systemelektroniker",
            content:
              "Lisans yerine Ausbildung tercih ettim ve çok doğru bir karardı. Firma eşleştirmesinden Almanca kursuna kadar her şeyi organize ettiler. Şimdi Berlin'de hem eğitim alıyor hem maaş kazanıyorum.",
            rating: 5,
          },
          {
            name: "Zeynep Koç",
            role: "Veli - Kızı Heidelberg Üniversitesi'nde",
            content:
              "Kızımızın Almanya'da üniversite okuması için danışmanlık aldık. Sperrkonto'dan vize randevusuna, Anmeldung'dan sağlık sigortasına kadar tüm süreçte bize rehberlik ettiler. Çok teşekkür ederiz.",
            rating: 5,
          },
        ]}
      />

      {/* SSS */}
      <JsonLd
        data={faqJsonLd([
          { question: t("home.faq.q1"), answer: t("home.faq.a1") },
          { question: t("home.faq.q2"), answer: t("home.faq.a2") },
          { question: t("home.faq.q3"), answer: t("home.faq.a3") },
          { question: t("home.faq.q4"), answer: t("home.faq.a4") },
          { question: t("home.faq.q5"), answer: t("home.faq.a5") },
          { question: t("home.faq.q6"), answer: t("home.faq.a6") },
        ])}
      />
      <Faq
        title={t("home.faq.title")}
        subtitle={t("home.faq.subtitle")}
        faqs={[
          { question: t("home.faq.q1"), answer: t("home.faq.a1") },
          { question: t("home.faq.q2"), answer: t("home.faq.a2") },
          { question: t("home.faq.q3"), answer: t("home.faq.a3") },
          { question: t("home.faq.q4"), answer: t("home.faq.a4") },
          { question: t("home.faq.q5"), answer: t("home.faq.a5") },
          { question: t("home.faq.q6"), answer: t("home.faq.a6") },
        ]}
      />

      {/* CTA */}
      <CTA
        title={t("home.cta.title")}
        description={t("home.cta.description")}
        buttonText={t("home.hero.cta")}
        buttonHref="/apply"
      />
    </>
  );
}
