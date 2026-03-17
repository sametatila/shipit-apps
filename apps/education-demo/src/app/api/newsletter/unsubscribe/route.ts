import { NextResponse } from "next/server";
import { z } from "zod";

const unsubscribeSchema = z.object({
  token: z.string().min(1),
  email: z.string().email(),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token") || "";
    const email = url.searchParams.get("email") || "";

    const parsed = unsubscribeSchema.parse({ token, email });

    const { getPayload } = await import("payload");
    const config = await import("@/payload.config");
    const payload = await getPayload({ config: config.default });

    const existing = await payload.find({
      collection: "newsletter-subscribers" as any,
      where: {
        and: [
          { email: { equals: parsed.email } },
          { unsubscribeToken: { equals: parsed.token } },
        ],
      },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      return new NextResponse(
        htmlResponse("Hata", "Geçersiz abonelik çıkma bağlantısı."),
        { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    const subscriber = existing.docs[0];

    await payload.update({
      collection: "newsletter-subscribers" as any,
      id: subscriber.id,
      data: {
        status: "unsubscribed",
        unsubscribedAt: new Date().toISOString(),
      } as any,
    });

    return new NextResponse(
      htmlResponse(
        "Abonelikten Çıkıldı",
        "Bülten aboneliğiniz başarıyla iptal edildi. Artık e-posta almayacaksınız."
      ),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    return new NextResponse(
      htmlResponse("Hata", "Abonelikten çıkma işlemi sırasında bir hata oluştu."),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}

function htmlResponse(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #f6f9fc;
      color: #333;
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 48px;
      max-width: 480px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    h1 { font-size: 24px; margin-bottom: 16px; }
    p { font-size: 16px; color: #666; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}
