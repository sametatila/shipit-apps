import { describe, it, expect } from "vitest";
import { generateSiteMetadata, generatePageMetadata } from "../metadata";
import type { SiteConfig } from "../metadata";

const mockConfig: SiteConfig = {
  name: "Test Site",
  description: "A test site description",
  url: "https://test.com",
  ogImage: "https://test.com/og.jpg",
  locale: "tr_TR",
};

describe("generateSiteMetadata", () => {
  it("should generate metadata with correct title", () => {
    const metadata = generateSiteMetadata(mockConfig);
    expect(metadata.title).toEqual({
      default: "Test Site",
      template: "%s | Test Site",
    });
  });

  it("should set metadataBase", () => {
    const metadata = generateSiteMetadata(mockConfig);
    expect(metadata.metadataBase?.toString()).toBe("https://test.com/");
  });

  it("should include OpenGraph data", () => {
    const metadata = generateSiteMetadata(mockConfig);
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.siteName).toBe("Test Site");
    expect(og.locale).toBe("tr_TR");
  });

  it("should include Twitter card data", () => {
    const metadata = generateSiteMetadata(mockConfig);
    const twitter = metadata.twitter as Record<string, unknown>;
    expect(twitter.card).toBe("summary_large_image");
  });

  it("should use custom titleTemplate if provided", () => {
    const config = { ...mockConfig, seo: { titleTemplate: "%s - Custom" } };
    const metadata = generateSiteMetadata(config);
    expect((metadata.title as { template: string }).template).toBe("%s - Custom");
  });

  it("should allow page overrides", () => {
    const metadata = generateSiteMetadata(mockConfig, {
      description: "Override description",
    });
    expect(metadata.description).toBe("Override description");
  });
});

describe("generatePageMetadata", () => {
  it("should generate page-specific metadata", () => {
    const metadata = generatePageMetadata(mockConfig, {
      title: "About Us",
      description: "About page description",
      path: "/about",
    });
    expect(metadata.title).toBe("About Us");
    expect(metadata.description).toBe("About page description");
  });

  it("should use page image if provided", () => {
    const metadata = generatePageMetadata(mockConfig, {
      title: "Gallery",
      description: "Gallery page",
      image: "https://test.com/gallery.jpg",
    });
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.images).toBeDefined();
  });

  it("should fall back to site ogImage if no page image", () => {
    const metadata = generatePageMetadata(mockConfig, {
      title: "Contact",
      description: "Contact page",
    });
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.images).toBeDefined();
  });
});
