import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { randomBytes } from "crypto";

const newsletterSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().max(100).optional(),
  source: z.string().max(50).optional(),
});

export async function POST(request: Request) {
  try {
    const headerStore = await headers();
    const ip =
      headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headerStore.get("x-real-ip") ??
      "unknown";

    const { success } = rateLimit(ip, {
      maxRequests: 5,
      windowMs: 60_000,
    });

    if (!success) {
      return NextResponse.json(
        { error: "Çok fazla istek. Lütfen bir dakika bekleyin." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await request.json();
    const parsed = newsletterSchema.parse(body);

    // Unsubscribe token oluştur
    const unsubscribeToken = randomBytes(32).toString("hex");

    // Payload CMS'e kaydet
    try {
      const { getPayload } = await import("payload");
      const config = await import("@/payload.config");
      const payload = await getPayload({ config: config.default });

      // Mevcut abone kontrolü
      const existing = await payload.find({
        collection: "newsletter-subscribers" as any,
        where: { email: { equals: parsed.email } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        const subscriber = existing.docs[0] as any;
        if (subscriber.status === "unsubscribed") {
          // Tekrar abone ol
          await payload.update({
            collection: "newsletter-subscribers" as any,
            id: subscriber.id,
            data: {
              status: "active",
              subscribedAt: new Date().toISOString(),
              unsubscribedAt: null,
              unsubscribeToken,
            } as any,
          });
        } else {
          // Zaten abone
          return NextResponse.json({ success: true, message: "Zaten abonesiniz." });
        }
      } else {
        // Yeni abone
        await payload.create({
          collection: "newsletter-subscribers" as any,
          data: {
            email: parsed.email,
            name: parsed.name || null,
            status: "active",
            subscribedAt: new Date().toISOString(),
            unsubscribeToken,
            source: parsed.source || "blog",
          } as any,
        });
      }
    } catch (err) {
      console.error("Newsletter subscription DB error:", err);
      return NextResponse.json(
        { error: "Abonelik kaydedilemedi" },
        { status: 500 }
      );
    }

    // Hoş geldin e-postası gönder
    if (process.env.RESEND_API_KEY) {
      try {
        const { sendEmail, NewsletterWelcome } = await import("@shipit/email");
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
        const siteName = process.env.SITE_NAME || "EuroVizyon Danışmanlık";

        await sendEmail({
          to: parsed.email,
          subject: `${siteName} Bültenine Hoş Geldiniz!`,
          react: NewsletterWelcome({
            siteName,
            unsubscribeUrl: `${siteUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}&email=${encodeURIComponent(parsed.email)}`,
          }),
        });
      } catch (emailErr) {
        // E-posta gönderilemese bile abonelik kaydedildi
        console.warn("Welcome email failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz e-posta adresi" },
        { status: 400 }
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Abonelik işlemi başarısız" },
      { status: 500 }
    );
  }
}
