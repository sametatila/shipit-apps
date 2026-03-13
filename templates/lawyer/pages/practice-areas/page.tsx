import type { Metadata } from "next";
import { generatePageMetadata } from "@shipit/seo";
import { JsonLd, legalServiceJsonLd } from "@shipit/seo";
import {
  Scale,
  Briefcase,
  Users,
  Heart,
  Building2,
  FileText,
} from "lucide-react";
import { getSiteConfig } from "@/lib/get-site-config";
import { PracticeAreas } from "@/components/practice-areas";
import { CaseResults } from "@/components/case-results";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Uzmanlık Alanları",
    description:
      "Hukuk buromuzun uzmanlık alanları. Ceza hukuku, ticaret hukuku, iş hukuku, aile hukuku ve daha fazlası.",
    path: "/practice-areas",
  });
}

// Uzmanlık alanları verisi
const practiceAreas = [
  {
    title: "Ceza Hukuku",
    description:
      "Ceza davalarında savunma ve mağdur hakları konusunda uzman kadromuzla yanınızdayız.",
    icon: Scale,
    href: "/practice-areas/ceza-hukuku",
  },
  {
    title: "Ticaret Hukuku",
    description:
      "Şirketlerin kuruluşu, birleşmesi, ticari sözleşmeler ve ticari uyuşmazlıklarda danışmanlık.",
    icon: Briefcase,
    href: "/practice-areas/ticaret-hukuku",
  },
  {
    title: "İş Hukuku",
    description:
      "İşçi-işveren ilişkileri, işten çıkarma, kıdem tazminatı ve iş kazası davaları.",
    icon: Users,
    href: "/practice-areas/is-hukuku",
  },
  {
    title: "Aile Hukuku",
    description:
      "Boşanma, velayet, nafaka ve mal paylaşımı davalarında profesyonel destek.",
    icon: Heart,
    href: "/practice-areas/aile-hukuku",
  },
  {
    title: "Gayrimenkul Hukuku",
    description:
      "Taşınmaz alım-satım, kira sözleşmeleri, imar hukuku ve tapu işlemleri.",
    icon: Building2,
    href: "/practice-areas/gayrimenkul-hukuku",
  },
  {
    title: "İcra ve İflas Hukuku",
    description:
      "Alacak tahsili, icra takibi, iflas ve konkordato süreçleri.",
    icon: FileText,
    href: "/practice-areas/icra-iflas-hukuku",
  },
];

// Örnek dava sonuçları
const caseResults = [
  {
    title: "Ticari Uyuşmazlık Davası",
    description:
      "Büyük ölçekli bir ticari uyuşmazlıkta müvekkilimizin haklarını başarıyla savunduk.",
    outcome: "Kazanıldı",
    category: "Ticaret Hukuku",
  },
  {
    title: "İş Kazası Tazminatı",
    description:
      "İş kazası sonucu mağdur olan müvekkilimiz için tam tazminat elde edildi.",
    outcome: "Başarılı Sonuç",
    category: "İş Hukuku",
  },
  {
    title: "Gayrimenkul Anlaşmazlığı",
    description:
      "Tapu iptali ve tescil davasında müvekkilimizin mülkiyet hakları tescil edildi.",
    outcome: "Kazanıldı",
    category: "Gayrimenkul Hukuku",
  },
  {
    title: "Boşanma ve Velayet",
    description:
      "Velayet hakkı konusunda müvekkilimizin lehine karar alınması sağlandı.",
    outcome: "Kabul Edildi",
    category: "Aile Hukuku",
  },
  {
    title: "Alacak Tahsili",
    description:
      "Uzun süredir tahsil edilemeyen büyük miktardaki alacak icra yoluyla tahsil edildi.",
    outcome: "Başarılı Sonuç",
    category: "İcra ve İflas Hukuku",
  },
  {
    title: "Ceza Davası Savunması",
    description:
      "Müvekkilimizin beraati için etkili bir savunma stratejisi ile uzlaşma sağlandı.",
    outcome: "Uzlaşma",
    category: "Ceza Hukuku",
  },
];

export default async function PracticeAreasPage() {
  const siteConfig = await getSiteConfig();
  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={legalServiceJsonLd({
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
          practiceAreas: siteConfig.business.practiceAreas,
        })}
      />

      {/* Uzmanlık Alanları Bölümü */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Uzmanlık Alanlarımız
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Geniş uzmanlık alanlarımızla hukuki süreçlerde size en iyi
            hizmeti sunmak için buradayız.
          </p>
        </div>

        <PracticeAreas areas={practiceAreas} />
      </section>

      {/* Dava Sonuçları Bölümü */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Dava Sonuçları
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Başarı hikayelerimiz ve dava sonuçlarımız ile güvenilirliğimizi
              kanıtlıyoruz.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <CaseResults results={caseResults} />
          </div>
        </div>
      </section>
    </>
  );
}
