"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@shipit/ui";
import { useSiteConfig } from "@/contexts/site-config-context";
import { useContactModal } from "@/contexts/contact-modal-context";
import { Link } from "@/i18n/navigation";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();
  const siteConfig = useSiteConfig();
  const { open: openContactModal } = useContactModal();

  return (
    <footer className="border-t bg-muted/50 relative">
      {/* Accent top line */}
      <div className="h-1 w-full bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))]" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4">
            <img
              src="/logo.png"
              alt={siteConfig.name}
              className="h-10 w-auto"
            />
            <p className="text-sm text-muted-foreground">{t("common.siteDescription")}</p>
            {/* Sosyal Medya */}
            <div className="flex items-center gap-3 pt-2">
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                  <FacebookIcon className="h-5 w-5" />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                  <LinkedInIcon className="h-5 w-5" />
                </a>
              )}
              {siteConfig.social.youtube && (
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                  <YouTubeIcon className="h-5 w-5" />
                </a>
              )}
            </div>
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
                Hizmet Paketleri
              </Link>
              <button onClick={openContactModal} className="text-sm text-muted-foreground transition-colors hover:text-primary text-left">
                Başvuru Yap
              </button>
              <Link href="/gallery" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Galeri
              </Link>
            </nav>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-sm font-semibold">{t("nav.contact")}</h4>
            <div className="flex flex-col space-y-3">
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>

            {/* Ofisler */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {siteConfig.offices.map((office) => (
                <div key={office.name} className="space-y-1">
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {office.city}{office.isHQ ? " (Merkez)" : ""}
                  </p>
                  {office.address && (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(office.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-muted-foreground hover:text-primary transition-colors pl-5 leading-relaxed"
                    >
                      {office.address}
                    </a>
                  )}
                  {office.phone && (
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="block text-xs text-muted-foreground hover:text-primary transition-colors pl-5"
                    >
                      {office.phone}
                    </a>
                  )}
                </div>
              ))}
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
