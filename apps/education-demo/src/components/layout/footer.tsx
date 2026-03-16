"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@shipit/ui";
import { useSiteConfig } from "@/contexts/site-config-context";
import { useContactModal } from "@/contexts/contact-modal-context";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();
  const siteConfig = useSiteConfig();
  const { open: openContactModal } = useContactModal();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4">
            <img
              src="/logo.png"
              alt={siteConfig.name}
              className="h-10 w-auto"
            />
            <p className="text-sm text-muted-foreground">{t("common.siteDescription")}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t("common.quickLinks")}</h4>
            <nav className="flex flex-col space-y-2">
              {siteConfig.navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t(item.label)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Araçlar</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/eligibility-check" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Uygunluk Testi
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Fiyatlandırma
              </Link>
              <button onClick={openContactModal} className="text-sm text-muted-foreground transition-colors hover:text-primary text-left">
                Başvuru Yap
              </button>
              <Link href="/gallery" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Galeri
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t("nav.contact")}</h4>
            <div className="flex flex-col space-y-3">
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary">
                <Phone className="h-4 w-4" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary">
                <Mail className="h-4 w-4" />
                <span>{siteConfig.contact.email}</span>
              </a>
              {siteConfig.offices.map((office) => (
                <div key={office.name} className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{office.city}{office.isHQ ? " (Merkez)" : ""}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t("common.socialMedia")}</h4>
            <div className="flex space-x-3">
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Instagram</a>
              )}
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Facebook</a>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {currentYear} {siteConfig.name}. {t("common.allRightsReserved")}</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-primary">{t("common.privacy")}</Link>
            <Link href="/terms" className="hover:text-primary">{t("common.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
