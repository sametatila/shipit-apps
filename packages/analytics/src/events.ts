type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export function trackEvent({ action, category, label, value }: GTagEvent) {
  if (typeof window === "undefined") return;

  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };

  w.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export function trackFormSubmit(formName: string) {
  trackEvent({
    action: "form_submit",
    category: "engagement",
    label: formName,
  });
}

export function trackCtaClick(ctaName: string) {
  trackEvent({
    action: "cta_click",
    category: "engagement",
    label: ctaName,
  });
}

export function trackPhoneClick() {
  trackEvent({
    action: "phone_click",
    category: "contact",
    label: "phone",
  });
}

export function trackWhatsAppClick() {
  trackEvent({
    action: "whatsapp_click",
    category: "contact",
    label: "whatsapp",
  });
}

export function trackPageView(path: string) {
  trackEvent({
    action: "page_view",
    category: "navigation",
    label: path,
  });
}

export function trackConversion(label: string, value?: number) {
  trackEvent({
    action: "conversion",
    category: "conversion",
    label,
    value,
  });
}

export function trackError(errorMessage: string, errorSource?: string) {
  trackEvent({
    action: "exception",
    category: "error",
    label: errorSource ? `${errorSource}: ${errorMessage}` : errorMessage,
  });
}

export function trackSearch(searchTerm: string) {
  trackEvent({
    action: "search",
    category: "engagement",
    label: searchTerm,
  });
}

export function trackSocialClick(platform: string) {
  trackEvent({
    action: "social_click",
    category: "engagement",
    label: platform,
  });
}

export function trackFileDownload(fileName: string) {
  trackEvent({
    action: "file_download",
    category: "engagement",
    label: fileName,
  });
}

export function trackOutboundLink(url: string) {
  trackEvent({
    action: "outbound_click",
    category: "navigation",
    label: url,
  });
}
