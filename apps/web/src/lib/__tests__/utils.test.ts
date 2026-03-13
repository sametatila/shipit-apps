import { describe, it, expect } from "vitest";
import { formatPhone, getWhatsAppUrl } from "../utils";

describe("formatPhone", () => {
  it("should remove spaces from phone number", () => {
    expect(formatPhone("+90 555 123 4567")).toBe("905551234567");
  });

  it("should remove parentheses and dashes", () => {
    expect(formatPhone("(555) 123-4567")).toBe("5551234567");
  });

  it("should remove plus sign", () => {
    expect(formatPhone("+905551234567")).toBe("905551234567");
  });

  it("should handle already clean numbers", () => {
    expect(formatPhone("905551234567")).toBe("905551234567");
  });
});

describe("getWhatsAppUrl", () => {
  it("should generate basic WhatsApp URL", () => {
    const url = getWhatsAppUrl("+90 555 123 4567");
    expect(url).toBe("https://wa.me/905551234567");
  });

  it("should include encoded message when provided", () => {
    const url = getWhatsAppUrl("+905551234567", "Hello World");
    expect(url).toBe("https://wa.me/905551234567?text=Hello%20World");
  });

  it("should handle message with special characters", () => {
    const url = getWhatsAppUrl("905551234567", "Merhaba! Nasılsınız?");
    expect(url).toContain("?text=");
    expect(url).toContain("Merhaba");
  });
});
