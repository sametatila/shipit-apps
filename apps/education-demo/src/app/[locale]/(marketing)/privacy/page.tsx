import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Shield, Eye, Database, Share2, Cookie, Clock, UserCheck, Mail, Bell, RefreshCw } from "lucide-react";

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

      {/* Hero */}
      <section className="py-16 pb-10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            Gizlilik Politikası
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            KVKK Aydınlatma Metni
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
            <Section icon={<Shield className="h-5 w-5" />} number={1} title="Veri Sorumlusu">
              <p>
                Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında
                veri sorumlusu sıfatıyla <strong className="text-foreground">{siteConfig.name}</strong> tarafından hazırlanmıştır.
              </p>
              <div className="rounded-xl border bg-card p-4 space-y-1.5 not-prose">
                <p className="text-sm"><span className="font-medium text-foreground">Adres:</span> {hqOffice?.address}</p>
                <p className="text-sm"><span className="font-medium text-foreground">E-posta:</span>{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">{siteConfig.contact.email}</a>
                </p>
                <p className="text-sm"><span className="font-medium text-foreground">Telefon:</span>{" "}
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">{siteConfig.contact.phone}</a>
                </p>
              </div>
            </Section>

            <Section icon={<Eye className="h-5 w-5" />} number={2} title="İşlenen Kişisel Veriler">
              <p>Aşağıdaki kişisel verileriniz, hizmetlerimiz kapsamında işlenmektedir:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong className="text-foreground">Kimlik bilgileri:</strong> Ad, soyad</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong className="text-foreground">İletişim bilgileri:</strong> E-posta adresi, telefon numarası</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong className="text-foreground">Eğitim bilgileri:</strong> Mevcut eğitim durumu, Almanca seviyesi, hedeflenen program</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong className="text-foreground">Başvuru bilgileri:</strong> Tercih edilen üniversite, bütçe aralığı, tercih edilen dönem</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span><strong className="text-foreground">Teknik veriler:</strong> IP adresi, tarayıcı bilgileri, çerez verileri</span></li>
              </ul>
            </Section>

            <Section icon={<Database className="h-5 w-5" />} number={3} title="Kişisel Verilerin İşlenme Amaçları">
              <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Eğitim danışmanlığı hizmetlerinin sunulması</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Üniversite ve program başvuru süreçlerinin yürütülmesi</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>İletişim taleplerinin karşılanması</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Bülten ve bilgilendirme e-postalarının gönderilmesi (onayınız dahilinde)</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Hizmet kalitesinin artırılması ve istatistiksel analizler</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Yasal yükümlülüklerin yerine getirilmesi</span></li>
              </ul>
            </Section>

            <Section icon={<UserCheck className="h-5 w-5" />} number={4} title="Kişisel Verilerin İşlenme Hukuki Sebepleri">
              <p>KVKK madde 5 ve 6 kapsamında kişisel verileriniz aşağıdaki hukuki sebeplerle işlenmektedir:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Açık rızanızın bulunması</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Veri sorumlusunun meşru menfaati için zorunlu olması</span></li>
              </ul>
            </Section>

            <Section icon={<Share2 className="h-5 w-5" />} number={5} title="Kişisel Verilerin Aktarılması">
              <p>Kişisel verileriniz, hizmetlerimizin sunulması amacıyla aşağıdaki üçüncü taraflarla paylaşılabilir:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Almanya&apos;daki partner üniversiteler ve eğitim kurumları (başvuru süreçleri için)</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>E-posta hizmet sağlayıcısı (bilgilendirme e-postaları için)</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Web hosting ve altyapı hizmet sağlayıcıları</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşları</span></li>
              </ul>
              <p>Verileriniz yurt dışına aktarılması durumunda KVKK madde 9 kapsamında gerekli önlemler alınmaktadır.</p>
            </Section>

            <Section icon={<Cookie className="h-5 w-5" />} number={6} title="Çerez Politikası">
              <p>Web sitemizde aşağıdaki çerez türleri kullanılmaktadır:</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border bg-card p-4">
                  <p className="font-medium text-foreground text-sm mb-1">Zorunlu Çerezler</p>
                  <p className="text-xs">Sitenin temel işlevleri için gerekli çerezler (oturum yönetimi, güvenlik)</p>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <p className="font-medium text-foreground text-sm mb-1">Analitik Çerezler</p>
                  <p className="text-xs">Ziyaretçi istatistikleri ve site performansının ölçülmesi (Google Analytics)</p>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <p className="font-medium text-foreground text-sm mb-1">Tercih Çerezleri</p>
                  <p className="text-xs">Tema ve dil tercihlerinizin hatırlanması</p>
                </div>
              </div>
              <p>Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz. Ancak bu durumda sitenin bazı özellikleri düzgün çalışmayabilir.</p>
            </Section>

            <Section icon={<Clock className="h-5 w-5" />} number={7} title="Veri Saklama Süresi">
              <p>
                Kişisel verileriniz, işlenme amaçlarının gerektirdiği süre boyunca saklanmaktadır.
                İlgili mevzuatta öngörülen zamanaşımı süreleri ve yasal yükümlülükler göz önünde
                bulundurularak belirlenen saklama süreleri sonunda verileriniz silinir, yok edilir
                veya anonim hale getirilir.
              </p>
            </Section>

            <Section icon={<UserCheck className="h-5 w-5" />} number={8} title="KVKK Kapsamındaki Haklarınız">
              <p>KVKK madde 11 kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>KVKK madde 7 kapsamında kişisel verilerinizin silinmesini veya yok edilmesini isteme</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Düzeltme ve silme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold">·</span><span>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</span></li>
              </ul>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm">
                  Haklarınızı kullanmak için{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-primary font-medium hover:underline">{siteConfig.contact.email}</a>{" "}
                  adresine yazılı başvuruda bulunabilirsiniz. Başvurularınız en geç <strong className="text-foreground">30 gün</strong> içinde yanıtlanacaktır.
                </p>
              </div>
            </Section>

            <Section icon={<Bell className="h-5 w-5" />} number={9} title="Bülten Aboneliği">
              <p>
                Bültenimize abone olduğunuzda e-posta adresiniz, bilgilendirme ve kampanya
                e-postaları göndermek amacıyla işlenir. Her e-postada yer alan &quot;abonelikten çık&quot;
                bağlantısını kullanarak istediğiniz zaman aboneliğinizi sonlandırabilirsiniz.
              </p>
            </Section>

            <Section icon={<RefreshCw className="h-5 w-5" />} number={10} title="Değişiklikler">
              <p>
                Bu gizlilik politikası ve aydınlatma metni, yasal düzenlemeler veya hizmet
                değişiklikleri doğrultusunda güncellenebilir. Güncellemeler bu sayfada yayımlanır.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </>
  );
}
