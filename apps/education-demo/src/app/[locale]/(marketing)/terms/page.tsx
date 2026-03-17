import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
            <h1>Kullanım Koşulları</h1>
            <p className="lead">
              Son güncelleme: 17 Mart 2026
            </p>

            <h2>1. Genel Bilgiler</h2>
            <p>
              Bu web sitesi, <strong>{siteConfig.name}</strong> tarafından işletilmektedir.
              Siteyi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.
            </p>
            <ul>
              <li><strong>Ticari Unvan:</strong> {siteConfig.name}</li>
              <li><strong>Adres:</strong> {hqOffice?.address}</li>
              <li><strong>E-posta:</strong> {siteConfig.contact.email}</li>
              <li><strong>Telefon:</strong> {siteConfig.contact.phone}</li>
            </ul>

            <h2>2. Hizmet Tanımı</h2>
            <p>
              {siteConfig.name}, Türkiye&apos;den Almanya&apos;ya eğitim sürecinde danışmanlık hizmeti
              sunmaktadır. Hizmetlerimiz şunları kapsamaktadır:
            </p>
            <ul>
              <li>Üniversite ve program araştırması ve önerisi</li>
              <li>Başvuru dosyası hazırlama ve başvuru yönetimi</li>
              <li>Vize süreç danışmanlığı</li>
              <li>Dil kursu yönlendirmesi</li>
              <li>Konaklama ve yerleşim desteği</li>
              <li>Almanya&apos;da ilk dönem uyum desteği</li>
            </ul>

            <h2>3. Sorumluluk Sınırları</h2>
            <p>
              {siteConfig.name}, danışmanlık hizmetlerini en yüksek özen ve profesyonellikle
              sunmayı taahhüt eder. Ancak:
            </p>
            <ul>
              <li>
                Üniversite kabul kararları tamamen ilgili eğitim kurumlarının yetkisindedir.
                {siteConfig.name}, üniversitelerin kabul kararlarından sorumlu tutulamaz.
              </li>
              <li>
                Vize kararları ilgili konsolosluk veya büyükelçilik tarafından verilmektedir.
                Vize başvurusunun reddedilmesinden {siteConfig.name} sorumlu tutulamaz.
              </li>
              <li>
                Web sitesinde yer alan bilgiler genel bilgilendirme amaçlıdır ve herhangi bir
                hukuki tavsiye niteliği taşımaz.
              </li>
              <li>
                Fiyatlar, programlar ve koşullar ilgili kurumlar tarafından değiştirilebilir.
                Güncel bilgi için danışmanlarımızla iletişime geçmeniz önerilir.
              </li>
            </ul>

            <h2>4. Ücretlendirme ve Ödeme</h2>
            <ul>
              <li>
                Hizmet paketleri ve ücretleri web sitesinde belirtilmektedir.
                Fiyatlar önceden haber verilmeksizin değiştirilebilir.
              </li>
              <li>
                Ödeme koşulları, hizmet sözleşmesinde ayrıca belirtilir.
              </li>
              <li>
                İptal ve iade koşulları hizmet sözleşmesi hükümlerine tabidir.
              </li>
            </ul>

            <h2>5. Fikri Mülkiyet Hakları</h2>
            <p>
              Bu web sitesinde yer alan tüm içerikler (metinler, görseller, tasarımlar, logolar,
              blog yazıları, rehberler) {siteConfig.name}&apos;ın fikri mülkiyetindedir.
              Yazılı izin alınmadan kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
            </p>

            <h2>6. Kullanıcı Yükümlülükleri</h2>
            <p>Web sitemizi kullanırken:</p>
            <ul>
              <li>Doğru ve güncel bilgi sağlamayı kabul edersiniz</li>
              <li>Başvuru formlarında gerçeğe aykırı bilgi vermemeyi taahhüt edersiniz</li>
              <li>Siteyi kötüye kullanmamayı (spam, bot, zararlı yazılım vb.) kabul edersiniz</li>
              <li>Diğer kullanıcıların haklarına saygı göstermeyi taahhüt edersiniz</li>
            </ul>

            <h2>7. Üçüncü Taraf Bağlantıları</h2>
            <p>
              Web sitemiz, üniversiteler, dil okulları ve diğer üçüncü taraf web sitelerine
              bağlantılar içerebilir. Bu sitelerin içerik ve gizlilik politikalarından
              {siteConfig.name} sorumlu değildir.
            </p>

            <h2>8. İletişim Formları ve Başvurular</h2>
            <p>
              İletişim formları ve başvuru formları aracılığıyla gönderdiğiniz bilgiler,
              yalnızca belirtilen amaçlar doğrultusunda kullanılacaktır. Detaylı bilgi için
              {" "}<a href="/privacy">Gizlilik Politikası</a> sayfamızı inceleyiniz.
            </p>

            <h2>9. Garanti Koşulları</h2>
            <p>
              Hizmet paketlerimizde belirtilen garantiler (örneğin &quot;%100 kabul garantisi&quot;),
              hizmet sözleşmesinde tanımlanan koşullar dahilinde geçerlidir.
              Garanti kapsamı ve detayları hizmet sözleşmesinde açıkça belirtilir.
            </p>

            <h2>10. Uyuşmazlık Çözümü</h2>
            <p>
              Bu kullanım koşullarından doğan uyuşmazlıklarda Türkiye Cumhuriyeti kanunları
              uygulanır. Uyuşmazlıkların çözümünde {hqOffice?.city ?? "Bursa"} Mahkemeleri
              ve İcra Daireleri yetkilidir.
            </p>

            <h2>11. 6502 Sayılı Tüketicinin Korunması Hakkında Kanun</h2>
            <p>
              Tüketici haklarınız 6502 sayılı Kanun kapsamında korunmaktadır. Hizmetlerimize
              ilişkin şikayetlerinizi doğrudan bize veya Tüketici Hakem Heyetine
              iletebilirsiniz.
            </p>

            <h2>12. Değişiklikler</h2>
            <p>
              Bu kullanım koşulları önceden bildirim yapılmaksızın güncellenebilir.
              Güncellemeler bu sayfada yayımlanır ve yayımlandığı tarihte yürürlüğe girer.
              Siteyi kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz
              anlamına gelir.
            </p>

            <hr />

            <p>
              Sorularınız için <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> adresinden
              veya <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a> numarasından
              bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
