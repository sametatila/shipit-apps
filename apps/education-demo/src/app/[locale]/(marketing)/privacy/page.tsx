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
    title: "Gizlilik ve KVKK Aydınlatma Metni",
    description: `${siteConfig.name} gizlilik politikası ve KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.`,
    path: "/privacy",
  });
}

export default async function PrivacyPage() {
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
            { label: "Gizlilik Politikası" },
          ]}
        />
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
            <h1>Gizlilik Politikası ve KVKK Aydınlatma Metni</h1>
            <p className="lead">
              Son güncelleme: 17 Mart 2026
            </p>

            <h2>1. Veri Sorumlusu</h2>
            <p>
              Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında
              veri sorumlusu sıfatıyla <strong>{siteConfig.name}</strong> tarafından hazırlanmıştır.
            </p>
            <ul>
              <li><strong>Adres:</strong> {hqOffice?.address}</li>
              <li><strong>E-posta:</strong> {siteConfig.contact.email}</li>
              <li><strong>Telefon:</strong> {siteConfig.contact.phone}</li>
            </ul>

            <h2>2. İşlenen Kişisel Veriler</h2>
            <p>Aşağıdaki kişisel verileriniz, hizmetlerimiz kapsamında işlenmektedir:</p>
            <ul>
              <li><strong>Kimlik bilgileri:</strong> Ad, soyad</li>
              <li><strong>İletişim bilgileri:</strong> E-posta adresi, telefon numarası</li>
              <li><strong>Eğitim bilgileri:</strong> Mevcut eğitim durumu, Almanca seviyesi, hedeflenen program</li>
              <li><strong>Başvuru bilgileri:</strong> Tercih edilen üniversite, bütçe aralığı, tercih edilen dönem</li>
              <li><strong>Teknik veriler:</strong> IP adresi, tarayıcı bilgileri, çerez verileri</li>
            </ul>

            <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul>
              <li>Eğitim danışmanlığı hizmetlerinin sunulması</li>
              <li>Üniversite ve program başvuru süreçlerinin yürütülmesi</li>
              <li>İletişim taleplerinin karşılanması</li>
              <li>Bülten ve bilgilendirme e-postalarının gönderilmesi (onayınız dahilinde)</li>
              <li>Hizmet kalitesinin artırılması ve istatistiksel analizler</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>

            <h2>4. Kişisel Verilerin İşlenme Hukuki Sebepleri</h2>
            <p>KVKK madde 5 ve 6 kapsamında kişisel verileriniz aşağıdaki hukuki sebeplerle işlenmektedir:</p>
            <ul>
              <li>Açık rızanızın bulunması</li>
              <li>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması</li>
              <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi</li>
              <li>Veri sorumlusunun meşru menfaati için zorunlu olması</li>
            </ul>

            <h2>5. Kişisel Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz, hizmetlerimizin sunulması amacıyla aşağıdaki üçüncü taraflarla paylaşılabilir:
            </p>
            <ul>
              <li>Almanya&apos;daki partner üniversiteler ve eğitim kurumları (başvuru süreçleri için)</li>
              <li>E-posta hizmet sağlayıcısı (bilgilendirme e-postaları için)</li>
              <li>Web hosting ve altyapı hizmet sağlayıcıları</li>
              <li>Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşları</li>
            </ul>
            <p>
              Verileriniz yurt dışına aktarılması durumunda KVKK madde 9 kapsamında gerekli önlemler alınmaktadır.
            </p>

            <h2>6. Çerez Politikası</h2>
            <p>Web sitemizde aşağıdaki çerez türleri kullanılmaktadır:</p>
            <ul>
              <li>
                <strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için gerekli çerezler
                (oturum yönetimi, güvenlik)
              </li>
              <li>
                <strong>Analitik çerezler:</strong> Ziyaretçi istatistikleri ve site performansının
                ölçülmesi için kullanılan çerezler (Google Analytics)
              </li>
              <li>
                <strong>Tercih çerezleri:</strong> Tema ve dil tercihlerinizin hatırlanması
              </li>
            </ul>
            <p>
              Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz. Ancak bu durumda
              sitenin bazı özellikleri düzgün çalışmayabilir.
            </p>

            <h2>7. Veri Saklama Süresi</h2>
            <p>
              Kişisel verileriniz, işlenme amaçlarının gerektirdiği süre boyunca saklanmaktadır.
              İlgili mevzuatta öngörülen zamanaşımı süreleri ve yasal yükümlülükler göz önünde
              bulundurularak belirlenen saklama süreleri sonunda verileriniz silinir, yok edilir
              veya anonim hale getirilir.
            </p>

            <h2>8. KVKK Kapsamındaki Haklarınız</h2>
            <p>KVKK madde 11 kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
              <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
              <li>KVKK madde 7 kapsamında kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
              <li>Düzeltme ve silme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
            </ul>
            <p>
              Haklarınızı kullanmak için <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> adresine
              yazılı başvuruda bulunabilirsiniz. Başvurularınız en geç 30 gün içinde yanıtlanacaktır.
            </p>

            <h2>9. Bülten Aboneliği</h2>
            <p>
              Bültenimize abone olduğunuzda e-posta adresiniz, bilgilendirme ve kampanya
              e-postaları göndermek amacıyla işlenir. Her e-postada yer alan &quot;abonelikten çık&quot;
              bağlantısını kullanarak istediğiniz zaman aboneliğinizi sonlandırabilirsiniz.
            </p>

            <h2>10. Değişiklikler</h2>
            <p>
              Bu gizlilik politikası ve aydınlatma metni, yasal düzenlemeler veya hizmet
              değişiklikleri doğrultusunda güncellenebilir. Güncellemeler bu sayfada yayımlanır.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
