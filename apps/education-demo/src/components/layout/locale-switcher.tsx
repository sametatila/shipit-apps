"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSiteConfig } from "@/contexts/site-config-context";
import { Button } from "@shipit/ui";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const siteConfig = useSiteConfig();

  const enabledLocales = siteConfig.i18n.enabledLocales;

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Tek dil modunda gösterme
  if (enabledLocales.length <= 1) return null;

  function onSelectLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Dil seçimi"
      >
        <Globe className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 min-w-[160px] rounded-md border bg-background p-1 shadow-lg z-50">
          {enabledLocales.map((loc) => (
            <button
              key={loc}
              onClick={() => onSelectLocale(loc)}
              className={`flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent ${
                locale === loc ? "bg-accent font-medium" : ""
              }`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold uppercase leading-none">
                {siteConfig.i18n.localeCodes[loc]}
              </span>
              <span>{siteConfig.i18n.localeLabels[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
