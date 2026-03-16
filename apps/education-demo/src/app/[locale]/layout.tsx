import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { generateSiteMetadata } from "@shipit/seo";
import { AnalyticsProvider } from "@shipit/analytics";
import { getSiteConfig } from "@/lib/get-site-config";
import { SiteConfigProvider } from "@/contexts/site-config-context";
import { fontSans, fontHeading } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { ContactModalProvider } from "@/contexts/contact-modal-context";
import { ContactModal } from "@/components/shared/contact-modal";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const metadata = generateSiteMetadata(config);

  if (config.analytics.searchConsoleId) {
    metadata.verification = {
      google: config.analytics.searchConsoleId,
    };
  }

  return metadata;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const [messages, config] = await Promise.all([
    getMessages(),
    getSiteConfig(),
  ]);

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AnalyticsProvider
              gaId={config.analytics.gaId}
              gtmId={config.analytics.gtmId}
              vercelAnalytics={config.analytics.vercelAnalytics}
            >
              <SiteConfigProvider value={config}>
                <ContactModalProvider>
                  <div className="relative flex min-h-screen flex-col">
                    <a
                      href="#main-content"
                      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
                    >
                      Skip to main content
                    </a>
                    <Header />
                    <main id="main-content" className="flex-1">{children}</main>
                    <Footer />
                  </div>
                  <WhatsAppButton />
                  <CookieConsent />
                  <ContactModal />
                </ContactModalProvider>
              </SiteConfigProvider>
            </AnalyticsProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
