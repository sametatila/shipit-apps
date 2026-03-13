"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSiteConfig } from "@/contexts/site-config-context";
import { getWhatsAppUrl } from "@/lib/utils";
import { trackWhatsAppClick } from "@shipit/analytics";

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const siteConfig = useSiteConfig();

  if (!siteConfig.contact.whatsapp) return null;

  const url = getWhatsAppUrl(
    siteConfig.contact.whatsapp,
    t("greeting", { siteName: siteConfig.name })
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick()}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label={t("ariaLabel")}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
