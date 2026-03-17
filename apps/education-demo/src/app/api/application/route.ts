import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeObject } from "@/lib/sanitize";
import { verifyCsrfToken } from "@/lib/csrf";
import { verifyTurnstileToken, checkHoneypot } from "@/lib/turnstile";

const applicationSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20),
  whatsapp: z.string().max(20).optional(),
  currentEducation: z.enum([
    "high-school-regular",
    "high-school-open",
    "university",
    "bachelor-grad",
    "master-grad",
    "working",
  ]),
  programType: z.enum([
    "studienkolleg",
    "bachelor",
    "master",
    "ausbildung",
    "language",
    "undecided",
  ]),
  fieldOfStudy: z.string().max(200).optional(),
  germanLevel: z.enum(["none", "a1", "a2", "b1", "b2", "c1", "c2"]),
  preferredSemester: z.enum(["winter", "summer", "asap"]),
  budget: z.enum(["scholarship", "under-10k", "10k-20k", "over-20k"]),
  message: z.string().max(2000).optional(),
  source: z
    .enum(["google", "instagram", "youtube", "referral", "event", "other"])
    .optional(),
});

export async function POST(request: Request) {
  try {
    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      return NextResponse.json({ error: "Geçersiz istek" }, { status: 403 });
    }

    const headerStore = await headers();
    const ip =
      headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headerStore.get("x-real-ip") ??
      "unknown";
    const { success, remaining } = rateLimit(ip, {
      maxRequests: 3,
      windowMs: 60_000,
    });

    if (!success) {
      return NextResponse.json(
        { error: "Çok fazla istek. Lütfen bir dakika bekleyin." },
        {
          status: 429,
          headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" },
        }
      );
    }

    const body = await request.json();

    if (checkHoneypot(body.website)) {
      return NextResponse.json({ success: true });
    }

    const turnstileValid = await verifyTurnstileToken(
      body.turnstileToken ?? ""
    );
    if (!turnstileValid) {
      return NextResponse.json(
        { error: "Bot doğrulaması başarısız" },
        { status: 403 }
      );
    }

    const parsed = applicationSchema.parse(body);
    const data = sanitizeObject(parsed);

    // Payload CMS'e kaydet (varsa)
    try {
      const { getPayload } = await import("payload");
      const config = await import("@/payload.config");
      const payload = await getPayload({ config: config.default });

      await payload.create({
        collection: "applications",
        data: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          whatsapp: data.whatsapp,
          currentEducation: data.currentEducation as any,
          programType: data.programType,
          fieldOfStudy: data.fieldOfStudy,
          germanLevel: data.germanLevel,
          preferredSemester: data.preferredSemester,
          budget: data.budget,
          message: data.message,
          source: data.source,
          status: "new",
        },
      });
    } catch {
      // Payload yoksa sadece email gönder
      console.warn("Payload CMS unavailable, skipping DB save");
    }

    // Email gönderimi
    if (process.env.RESEND_API_KEY) {
      const { sendEmail, ContactNotification } = await import("@shipit/email");
      const { siteConfig } = await import("@/config/site");

      const programLabels: Record<string, string> = {
        studienkolleg: "Studienkolleg",
        bachelor: "Lisans (Bachelor)",
        master: "Yüksek Lisans (Master)",
        ausbildung: "Ausbildung",
        language: "Almanca Dil Kursu",
      };

      await sendEmail({
        to: process.env.EMAIL_TO ?? siteConfig.contact.email,
        subject: `${siteConfig.name} - Yeni Başvuru: ${data.fullName} (${programLabels[data.programType] ?? data.programType})`,
        react: ContactNotification({
          siteName: siteConfig.name,
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          message: `Program: ${programLabels[data.programType] ?? data.programType}\nAlmanca: ${data.germanLevel.toUpperCase()}\nDönem: ${data.preferredSemester}\nBütçe: ${data.budget}\n\n${data.message ?? ""}`,
          submittedAt: new Date().toLocaleString("tr-TR"),
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

    console.error("Application form error:", error);
    return NextResponse.json(
      { error: "Başvuru gönderilemedi" },
      { status: 500 }
    );
  }
}
