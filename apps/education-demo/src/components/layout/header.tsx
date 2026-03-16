"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Moon, Sun, Phone } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@shipit/ui";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@shipit/ui";
import { useSiteConfig } from "@/contexts/site-config-context";
import { trackPhoneClick } from "@shipit/analytics";
import { Link } from "@/i18n/navigation";


export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const t = useTranslations();
  const siteConfig = useSiteConfig();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt={siteConfig.name}
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{t("common.toggleTheme")}</span>
          </Button>
          <Button asChild size="sm">
            <a href={`tel:${siteConfig.contact.phone}`} onClick={() => trackPhoneClick()}>
              <Phone className="mr-2 h-4 w-4" />
              {t("common.call")}
            </a>
          </Button>
        </div>

        <div className="flex md:hidden items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetTitle>
                <img
                  src="/logo.png"
                  alt={siteConfig.name}
                  className="h-8 w-auto"
                />
              </SheetTitle>
              <nav className="mt-8 flex flex-col space-y-4">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.label)}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {siteConfig.contact.phone}
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
