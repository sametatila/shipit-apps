import { describe, it, expect, vi, beforeEach } from "vitest";
import { trackEvent, trackFormSubmit, trackCtaClick, trackPhoneClick, trackWhatsAppClick, trackPageView } from "../events";

describe("analytics events", () => {
  let mockGtag: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGtag = vi.fn();
    (globalThis as Record<string, unknown>).window = {
      gtag: mockGtag,
    };
  });

  it("trackEvent should call gtag with correct parameters", () => {
    trackEvent({
      action: "test_action",
      category: "test_category",
      label: "test_label",
      value: 1,
    });
    expect(mockGtag).toHaveBeenCalledWith("event", "test_action", {
      event_category: "test_category",
      event_label: "test_label",
      value: 1,
    });
  });

  it("trackFormSubmit should track form_submit event", () => {
    trackFormSubmit("contact");
    expect(mockGtag).toHaveBeenCalledWith("event", "form_submit", {
      event_category: "engagement",
      event_label: "contact",
      value: undefined,
    });
  });

  it("trackCtaClick should track cta_click event", () => {
    trackCtaClick("hero-button");
    expect(mockGtag).toHaveBeenCalledWith("event", "cta_click", {
      event_category: "engagement",
      event_label: "hero-button",
      value: undefined,
    });
  });

  it("trackPhoneClick should track phone_click event", () => {
    trackPhoneClick();
    expect(mockGtag).toHaveBeenCalledWith("event", "phone_click", {
      event_category: "contact",
      event_label: "phone",
      value: undefined,
    });
  });

  it("trackWhatsAppClick should track whatsapp_click event", () => {
    trackWhatsAppClick();
    expect(mockGtag).toHaveBeenCalledWith("event", "whatsapp_click", {
      event_category: "contact",
      event_label: "whatsapp",
      value: undefined,
    });
  });

  it("trackPageView should track page_view event", () => {
    trackPageView("/about");
    expect(mockGtag).toHaveBeenCalledWith("event", "page_view", {
      event_category: "navigation",
      event_label: "/about",
      value: undefined,
    });
  });
});
