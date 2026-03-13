import { unstable_cache } from "next/cache";
import { siteConfig, type SiteConfig } from "@/config/site";

async function fetchSiteSettings() {
  try {
    const { getPayload } = await import("payload");
    const config = await import("@/payload.config");
    const payload = await getPayload({ config: config.default });
    const settings = await payload.findGlobal({ slug: "site-settings" });
    return settings;
  } catch {
    return null;
  }
}

function mergeSiteConfig(
  base: SiteConfig,
  cms: Record<string, unknown> | null
): SiteConfig {
  if (!cms) return base;

  const contact = cms.contact as Record<string, string> | undefined;
  const social = cms.social as Record<string, string> | undefined;
  const seo = cms.seo as Record<string, string> | undefined;
  const analytics = cms.analytics as Record<string, string> | undefined;

  return {
    ...base,
    name: (cms.siteName as string) || base.name,
    description: (cms.siteDescription as string) || base.description,
    contact: {
      ...base.contact,
      ...(contact?.phone && { phone: contact.phone }),
      ...(contact?.email && { email: contact.email }),
      ...(contact?.address && { address: contact.address }),
      ...(contact?.whatsapp && { whatsapp: contact.whatsapp }),
    },
    social: {
      ...base.social,
      ...(social?.instagram && { instagram: social.instagram }),
      ...(social?.facebook && { facebook: social.facebook }),
      ...(social?.twitter && { twitter: social.twitter }),
      ...(social?.linkedin && { linkedin: social.linkedin }),
      ...(social?.youtube && { youtube: social.youtube }),
    },
    seo: {
      ...base.seo,
      ...(seo?.titleTemplate && { titleTemplate: seo.titleTemplate }),
      ...(seo?.defaultDescription && {
        defaultDescription: seo.defaultDescription,
      }),
    },
    analytics: {
      ...base.analytics,
      ...(analytics?.gaId && { gaId: analytics.gaId }),
      ...(analytics?.gtmId && { gtmId: analytics.gtmId }),
      ...(analytics?.searchConsoleId && {
        searchConsoleId: analytics.searchConsoleId,
      }),
    },
  };
}

const getCachedSiteConfig = unstable_cache(
  async (): Promise<SiteConfig> => {
    const cms = await fetchSiteSettings();
    return mergeSiteConfig(siteConfig, cms as Record<string, unknown> | null);
  },
  ["site-settings"],
  { revalidate: 60, tags: ["site-settings"] }
);

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    return await getCachedSiteConfig();
  } catch {
    return siteConfig;
  }
}
