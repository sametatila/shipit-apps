import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FileText, Building2, Briefcase, ShieldAlert, CreditCard, Copyright, Users, ExternalLink, ClipboardList, Award, Scale, RefreshCw } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Kullanım Koşulları",
    description: `${siteConfig.name} web sitesi kullanım koşulları, hizmet şartları ve yasal bilgilendirmeler.`,
    path: "/terms",
  });
}

interface SectionProps {
  icon: React.ReactNode;
  number: number;
  title: string;
  children: React.ReactNode;
}

function Section({ icon, number, title, children }: SectionProps) {
  return (
    <div className="group relative pl-12 md:pl-16">
      <div className="absolute left-0 top-0 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <div>
        <h2 className="font-heading text-lg font-bold md:text-xl mb-3">
          <span className="text-primary mr-2">{number}.</span>{title}
        </h2>
        <div className="text-muted-foreground space-y-3 text-[15px] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default async function TermsPage() {
  const t = await getTranslations();
  const siteConfig = await getSiteConfig();

  const hqOffice = siteConfig.offices?.find((o: any) => o.isHQ) ?? siteConfig.offices?.[0];

  return (
    <>
      <div className="container mx-auto px-4">
        <Breadcrumbs
          baseUrl={siteConfig.url}
          items={[
            { label: t("common.home"), href: "/" },
            { label: "Kullanım Koşulları" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 pb-10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            Kullanım Koşulları
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Hizmet Şartları ve Yasal Bilgilendirmeler
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Son güncelleme: 17 Mart 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-10">
            <Section icon={<Building2 className="h-5 w-5" />} number={1} title="Genel Bilgiler">
              <p>
                Bu web sitesi, <strong className="text-foreground">{siteConfig.name}</strong> tarafından işletilmektedir.
                Siteyi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.
              </p>
              <div className="rounded-xl border bg-card p-4 space-y-1.5">
                <p className="text-sm"><span className="font-medium text-foreground">Ticari Unvan:</span> {siteConfig.name}</p>
                <p className="text-sm"><span className="font-medium text-foreground">Adres:</span> {hqOffice?.address}</p>
                <p className="text-sm"><span className="font-medium text-foreground">E-posta:</span>{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">{siteConfig.contact.email}</a>
                </p>
                <p className="text-sm"><span className="font-medium text-foreground">Telefon:</span>{" "}
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">{siteConfig.contact.phone}</a>
                </p>
              </div>
            </Section>

            <Section icon={<Briefcase className="h-5 w-5" />} number={2} title="Hizmet Tanımı">
              <p>
                {siteConfig.name}, Türkiye&apos;den Almanya&apos;ya eğitim sürecinde danışmanlık hizmeti sunmaktadır.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  "Üniversite ve program araştırması ve önerisi",
                  "Başvuru dosyası hazırlama ve başvuru yönetimi",
                  "Vize süreç danışmanlığı",
                  "Dil kursu yönlendirmesi",
                  "Konaklama ve yerleşim desteği",
                  "Almanya'da ilk dönem uyum desteği",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-lg border bg-card p-3">
                    <span className="text-primary mt-0.5 font-bold text-xs">✓</span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section icon={<ShieldAlert className="h-5 w-5" />} number={3} title="Sorumluluk Sınırları">
              <p>
                {siteConfig.name}, danışmanlık hizmetlerini en yüksek özen ve profesyonellikle sunmayı taahhüt eder. Ancak:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Üniversite kabul kararları tamamen ilgili eğitim kurumlarının yetkisindedir. {siteConfig.name}, üniversitelerin kabul kararlarından sorumlu tutulamaz.</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Vize kararları ilgili konsolosluk veya büyükelçilik tarafından verilmektedir. Vize başvurusunun reddedilmesinden {siteConfig.name} sorumlu tutulamaz.</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Web sitesinde yer alan bilgiler genel bilgilendirme amaçlıdır ve herhangi bir hukuki tavsiye niteliği taşımaz.</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Fiyatlar, programlar ve koşullar ilgili kurumlar tarafından değiştirilebilir. Güncel bilgi için danışmanlarımızla iletişime geçmeniz önerilir.</span></li>
              </ul>
            </Section>

            <Section icon={<CreditCard className="h-5 w-5" />} number={4} title="Ücretlendirme ve Ödeme">
              <ul className="space-y-2 ml-1">
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Hizmet paketleri ve ücretleri web sitesinde belirtilmektedir. Fiyatlar önceden haber verilmeksizin değiştirilebilir.</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Ödeme koşulları, hizmet sözleşmesinde ayrıca belirtilir.</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>İptal ve iade koşulları hizmet sözleşmesi hükümlerine tabidir.</span></li>
              </ul>
            </Section>

            <Section icon={<Copyright className="h-5 w-5" />} number={5} title="Fikri Mülkiyet Hakları">
              <p>
                Bu web sitesinde yer alan tüm içerikler (metinler, görseller, tasarımlar, logolar,
                blog yazıları, rehberler) {siteConfig.name}&apos;ın fikri mülkiyetindedir.
                Yazılı izin alınmadan kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
              </p>
            </Section>

            <Section icon={<Users className="h-5 w-5" />} number={6} title="Kullanıcı Yükümlülükleri">
              <p>Web sitemizi kullanırken:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Doğru ve güncel bilgi sağlamayı kabul edersiniz</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Başvuru formlarında gerçeğe aykırı bilgi vermemeyi taahhüt edersiniz</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Siteyi kötüye kullanmamayı (spam, bot, zararlı yazılım vb.) kabul edersiniz</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Diğer kullanıcıların haklarına saygı göstermeyi taahhüt edersiniz</span></li>
              </ul>
            </Section>

            <Section icon={<ExternalLink className="h-5 w-5" />} number={7} title="Üçüncü Taraf Bağlantıları">
              <p>
                Web sitemiz, üniversiteler, dil okulları ve diğer üçüncü taraf web sitelerine
                bağlantılar içerebilir. Bu sitelerin içerik ve gizlilik politikalarından
                {" "}{siteConfig.name} sorumlu değildir.
              </p>
            </Section>

            <Section icon={<ClipboardList className="h-5 w-5" />} number={8} title="İletişim Formları ve Başvurular">
              <p>
                İletişim formları ve başvuru formları aracılığıyla gönderdiğiniz bilgiler,
                yalnızca belirtilen amaçlar doğrultusunda kullanılacaktır. Detaylı bilgi için{" "}
                <a href="/privacy" className="text-primary font-medium hover:underline">Gizlilik Politikası</a> sayfamızı inceleyiniz.
              </p>
            </Section>

            <Section icon={<Award className="h-5 w-5" />} number={9} title="Garanti Koşulları">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm">
                  Hizmet paketlerimizde belirtilen garantiler (örneğin &quot;%100 kabul garantisi&quot;),
                  hizmet sözleşmesinde tanımlanan koşullar dahilinde geçerlidir.
                  Garanti kapsamı ve detayları hizmet sözleşmesinde açıkça belirtilir.
                </p>
              </div>
            </Section>

            <Section icon={<Scale className="h-5 w-5" />} number={10} title="Uyuşmazlık Çözümü">
              <p>
                Bu kullanım koşullarından doğan uyuşmazlıklarda Türkiye Cumhuriyeti kanunları
                uygulanır. Uyuşmazlıkların çözümünde <strong className="text-foreground">{hqOffice?.city ?? "Bursa"} Mahkemeleri
                ve İcra Daireleri</strong> yetkilidir.
              </p>
            </Section>

            <Section icon={<ShieldAlert className="h-5 w-5" />} number={11} title="6502 Sayılı Tüketicinin Korunması Hakkında Kanun">
              <p>
                Tüketici haklarınız 6502 sayılı Kanun kapsamında korunmaktadır. Hizmetlerimize
                ilişkin şikayetlerinizi doğrudan bize veya Tüketici Hakem Heyetine iletebilirsiniz.
              </p>
            </Section>

            <Section icon={<RefreshCw className="h-5 w-5" />} number={12} title="Değişiklikler">
              <p>
                Bu kullanım koşulları önceden bildirim yapılmaksızın güncellenebilir.
                Güncellemeler bu sayfada yayımlanır ve yayımlandığı tarihte yürürlüğe girer.
                Siteyi kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.
              </p>
            </Section>

            {/* İletişim */}
            <div className="rounded-2xl border bg-card p-6 md:p-8 text-center">
              <p className="font-heading text-lg font-bold mb-2">Sorularınız mı var?</p>
              <p className="text-sm text-muted-foreground mb-4">
                Kullanım koşulları hakkında sorularınız için bize ulaşabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {siteConfig.contact.email}
                </a>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
