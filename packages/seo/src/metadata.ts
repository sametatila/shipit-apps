import type { Metadata } from "next";

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
  locale?: string;
  seo?: {
    titleTemplate?: string;
    defaultDescription?: string;
  };
  i18n?: {
    defaultLocale: string;
    enabledLocales: string[];
  };
}

export function generateSiteMetadata(
  config: SiteConfig,
  pageOverrides?: Partial<Metadata>
): Metadata {
  const titleTemplate = config.seo?.titleTemplate ?? `%s | ${config.name}`;

  return {
    metadataBase: new URL(config.url),
    title: {
      default: config.name,
      template: titleTemplate,
    },
    description: pageOverrides?.description ?? config.description,
    openGraph: {
      type: "website",
      locale: config.locale ?? "tr_TR",
      url: config.url,
      siteName: config.name,
      title: config.name,
      description: config.description,
      images: config.ogImage
        ? [{ url: config.ogImage, width: 1200, height: 630, alt: config.name }]
        : undefined,
      ...pageOverrides?.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: config.name,
      description: config.description,
      images: config.ogImage ? [config.ogImage] : undefined,
      ...pageOverrides?.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...pageOverrides,
  };
}

export function generatePageMetadata(
  config: SiteConfig,
  page: {
    title: string;
    description: string;
    path?: string;
    image?: string;
    locale?: string;
  }
): Metadata {
  const url = page.path ? `${config.url}${page.path}` : config.url;
  const alternates = buildAlternates(config, page.path, page.locale);

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      images: page.image
        ? [{ url: page.image, width: 1200, height: 630, alt: page.title }]
        : config.ogImage
          ? [{ url: config.ogImage, width: 1200, height: 630, alt: page.title }]
          : undefined,
    },
    ...alternates,
  };
}

function buildAlternates(
  config: SiteConfig,
  path?: string,
  locale?: string
): Pick<Metadata, "alternates"> {
  const enabledLocales = config.i18n?.enabledLocales;
  if (!enabledLocales || enabledLocales.length <= 1) {
    const canonical = path ? `${config.url}${path}` : config.url;
    return { alternates: { canonical } };
  }

  const defaultLocale = config.i18n?.defaultLocale ?? "tr";
  const currentLocale = locale ?? defaultLocale;
  const basePath = path ?? "";

  const canonical = `${config.url}/${currentLocale}${basePath}`;
  const languages: Record<string, string> = {};
  for (const loc of enabledLocales) {
    languages[loc] = `${config.url}/${loc}${basePath}`;
  }
  languages["x-default"] = `${config.url}/${defaultLocale}${basePath}`;

  return {
    alternates: {
      canonical,
      languages,
    },
  };
}
