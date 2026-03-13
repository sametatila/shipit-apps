import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeObject } from "@/lib/sanitize";
import { verifyCsrfToken } from "@/lib/csrf";
import { verifyTurnstileToken, checkHoneypot } from "@/lib/turnstile";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
  try {
    // CSRF doğrulama
    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      return NextResponse.json(
        { error: "Geçersiz istek" },
        { status: 403 }
      );
    }

    // Rate limiting
    const headerStore = await headers();
    const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? headerStore.get("x-real-ip")
      ?? "unknown";
    const { success, remaining } = rateLimit(ip, { maxRequests: 5, windowMs: 60_000 });

    if (!success) {
      return NextResponse.json(
        { error: "Çok fazla istek. Lütfen bir dakika bekleyin." },
        { status: 429, headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" } }
      );
    }

    const body = await request.json();

    if (checkHoneypot(body.website)) {
      return NextResponse.json({ success: true });
    }

    const turnstileValid = await verifyTurnstileToken(body.turnstileToken ?? "");
    if (!turnstileValid) {
      return NextResponse.json({ error: "Bot doğrulaması başarısız" }, { status: 403 });
    }

    const parsed = contactSchema.parse(body);
    const data = sanitizeObject(parsed);

    // Email gönderimi
    if (process.env.RESEND_API_KEY) {
      const { sendEmail, ContactNotification, ContactConfirmation } = await import("@shipit/email");
      const { siteConfig } = await import("@/config/site");

      // Admin'e bildirim
      await sendEmail({
        to: process.env.EMAIL_TO ?? siteConfig.contact.email,
        subject: `${siteConfig.name} - Yeni İletişim: ${data.name}`,
        react: ContactNotification({
          siteName: siteConfig.name,
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          submittedAt: new Date().toLocaleString("tr-TR"),
        }),
        replyTo: data.email,
      });

      // Kullanıcıya onay maili
      await sendEmail({
        to: data.email,
        subject: `${siteConfig.name} - Mesajınız alındı`,
        react: ContactConfirmation({
          siteName: siteConfig.name,
          name: data.name,
        }),
      });
    }

    return NextResponse.json(
      { success: true },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz form verisi", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Mesaj gönderilemedi" },
      { status: 500 }
    );
  }
}
