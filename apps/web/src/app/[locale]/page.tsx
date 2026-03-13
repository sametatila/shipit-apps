import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { JsonLd, localBusinessJsonLd, faqJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";

export default async function HomePage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  return (
    <>
      <JsonLd
        data={localBusinessJsonLd({
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          phone: siteConfig.contact.phone,
          email: siteConfig.contact.email,
          address: {
            street: siteConfig.contact.address,
            city: "İstanbul",
            postalCode: "34000",
            country: "TR",
          },
          coordinates: siteConfig.business.coordinates,
          openingHours: siteConfig.business.openingHours,
        })}
      />

      <Hero
        title={t("home.hero.title")}
        subtitle={t("home.hero.subtitle")}
        description={t("home.hero.description")}
        ctaText={t("home.hero.cta")}
        ctaHref="/contact"
        secondaryCtaText={t("home.hero.secondaryCta")}
        secondaryCtaHref={`tel:${siteConfig.contact.phone}`}
      />

      <Features
        title={t("home.features.title")}
        subtitle={t("home.features.subtitle")}
        features={[
          {
            title: t("home.features.professional.title"),
            description: t("home.features.professional.description"),
            icon: "Award",
          },
          {
            title: t("home.features.support247.title"),
            description: t("home.features.support247.description"),
            icon: "Clock",
          },
          {
            title: t("home.features.reliable.title"),
            description: t("home.features.reliable.description"),
            icon: "Shield",
          },
          {
            title: t("home.features.customerFocused.title"),
            description: t("home.features.customerFocused.description"),
            icon: "HeartHandshake",
          },
          {
            title: t("home.features.experiencedTeam.title"),
            description: t("home.features.experiencedTeam.description"),
            icon: "Users",
          },
          {
            title: t("home.features.qualityGuarantee.title"),
            description: t("home.features.qualityGuarantee.description"),
            icon: "Star",
          },
        ]}
      />

      <Stats
        stats={[
          { value: "500", suffix: "+", label: t("home.stats.happyCustomers") },
          { value: "10", suffix: "+", label: t("home.stats.yearsExperience") },
          { value: "50", suffix: "+", label: t("home.stats.completedProjects") },
          { value: "7/24", label: t("home.stats.support") },
        ]}
      />

      <Testimonials
        title={t("home.testimonials.title")}
        subtitle={t("home.testimonials.subtitle")}
        testimonials={[
          {
            name: "Ahmet Yılmaz",
            role: "İşletme Sahibi",
            content: "Mükemmel hizmet! Beklentilerimin çok ötesinde bir sonuç aldım. Kesinlikle tavsiye ediyorum.",
            rating: 5,
          },
          {
            name: "Fatma Demir",
            role: "Müşteri",
            content: "Profesyonel yaklaşım ve hızlı dönüşleriyle çok memnun kaldım. Tekrar tercih edeceğim.",
            rating: 5,
          },
          {
            name: "Mehmet Kaya",
            role: "Şirket Yöneticisi",
            content: "Kaliteli hizmet ve uygun fiyat. Her zaman güler yüzlü ve çözüm odaklı yaklaşıyorlar.",
            rating: 5,
          },
        ]}
      />

      <JsonLd
        data={faqJsonLd([
          { question: t("home.faq.q1"), answer: t("home.faq.a1") },
          { question: t("home.faq.q2"), answer: t("home.faq.a2") },
          { question: t("home.faq.q3"), answer: t("home.faq.a3") },
          { question: t("home.faq.q4"), answer: t("home.faq.a4") },
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
        ]}
      />

      <CTA
        title={t("home.cta.title")}
        description={t("home.cta.description")}
        buttonText={t("common.contactUs")}
        buttonHref="/contact"
      />
    </>
  );
}
