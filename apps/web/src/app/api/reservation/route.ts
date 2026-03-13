import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeObject } from "@/lib/sanitize";
import { verifyCsrfToken } from "@/lib/csrf";
import { verifyTurnstileToken, checkHoneypot } from "@/lib/turnstile";

const reservationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20),
  date: z.string().min(1),
  time: z.string().min(1),
  guests: z.coerce.number().min(1).max(50),
  notes: z.string().max(1000).optional(),
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
    const { success, remaining } = rateLimit(ip, { maxRequests: 3, windowMs: 60_000 });

    if (!success) {
      return NextResponse.json(
        { error: "Çok fazla istek. Lütfen bir dakika bekleyin." },
        { status: 429, headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" } }
      );
    }

    const body = await request.json();

    // Honeypot kontrolü
    if (checkHoneypot(body.website)) {
      return NextResponse.json({ success: true });
    }

    // Turnstile doğrulama
    const turnstileValid = await verifyTurnstileToken(body.turnstileToken ?? "");
    if (!turnstileValid) {
      return NextResponse.json(
        { error: "Bot doğrulaması başarısız" },
        { status: 403 }
      );
    }

    const parsed = reservationSchema.parse(body);
    const data = sanitizeObject(parsed);

    // Email gönderimi
    if (process.env.RESEND_API_KEY) {
      const { sendEmail, ReservationConfirmation } = await import("@shipit/email");
      const { siteConfig } = await import("@/config/site");

      await sendEmail({
        to: process.env.EMAIL_TO ?? siteConfig.contact.email,
        subject: `${siteConfig.name} - Yeni Rezervasyon: ${data.name} - ${data.date}`,
        react: ReservationConfirmation({
          siteName: siteConfig.name,
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          guests: data.guests,
          notes: data.notes,
        }),
        replyTo: data.email,
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

    console.error("Reservation form error:", error);
    return NextResponse.json(
      { error: "Rezervasyon gönderilemedi" },
      { status: 500 }
    );
  }
}
