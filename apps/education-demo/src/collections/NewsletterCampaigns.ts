import type { CollectionConfig } from "payload";

export const NewsletterCampaigns: CollectionConfig = {
  slug: "newsletter-campaigns",
  admin: {
    useAsTitle: "subject",
    defaultColumns: ["subject", "status", "sentAt", "recipientCount"],
    group: "Bülten",
    description: "Newsletter kampanyaları oluşturun ve gönderin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Kampanya Adı",
      required: true,
      admin: {
        description: "İç kullanım için kampanya adı (abone görmez)",
      },
    },
    {
      name: "subject",
      type: "text",
      label: "E-posta Konusu",
      required: true,
      admin: {
        description: "Abonelerin göreceği e-posta başlığı",
      },
    },
    {
      name: "previewText",
      type: "text",
      label: "Önizleme Metni",
      admin: {
        description: "E-posta istemcisinde konu satırının yanında görünen kısa metin",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "İçerik",
      required: true,
    },
    {
      name: "plainTextContent",
      type: "textarea",
      label: "Düz Metin İçerik",
      admin: {
        description: "HTML desteklemeyen e-posta istemcileri için düz metin versiyonu",
      },
    },
    {
      name: "status",
      type: "select",
      label: "Durum",
      defaultValue: "draft",
      options: [
        { label: "Taslak", value: "draft" },
        { label: "Gönderime Hazır", value: "ready" },
        { label: "Gönderiliyor", value: "sending" },
        { label: "Gönderildi", value: "sent" },
        { label: "Başarısız", value: "failed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "targetAudience",
      type: "select",
      label: "Hedef Kitle",
      defaultValue: "all",
      options: [
        { label: "Tüm Aboneler", value: "all" },
        { label: "Etiketlere Göre", value: "by-tags" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "targetTags",
      type: "array",
      label: "Hedef Etiketler",
      admin: {
        description: "Bu etiketlere sahip abonelere gönderilecek",
        condition: (data) => data?.targetAudience === "by-tags",
      },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "scheduledAt",
      type: "date",
      label: "Planlanan Gönderim Zamanı",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        description: "Boş bırakılırsa, durumu 'Gönderime Hazır' yapıldığında anında gönderilir",
        position: "sidebar",
      },
    },
    {
      name: "sentAt",
      type: "date",
      label: "Gönderim Zamanı",
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
    {
      name: "recipientCount",
      type: "number",
      label: "Alıcı Sayısı",
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "successCount",
      type: "number",
      label: "Başarılı Gönderim",
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "failCount",
      type: "number",
      label: "Başarısız Gönderim",
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "errorLog",
      type: "textarea",
      label: "Hata Günlüğü",
      admin: {
        readOnly: true,
        condition: (data) => data?.status === "failed" || (data?.failCount && data.failCount > 0),
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        // Status "ready" olduğunda kampanyayı gönder
        if (doc.status === "ready" && previousDoc?.status !== "ready") {
          // Async olarak kampanyayı gönder
          sendCampaign(doc, req.payload).catch((err: Error) => {
            console.error("Campaign send failed:", err);
          });
        }
      },
    ],
  },
};

async function sendCampaign(campaign: any, payload: any) {
  try {
    // Durumu "sending" yap
    await payload.update({
      collection: "newsletter-campaigns",
      id: campaign.id,
      data: { status: "sending" },
    });

    // Aktif aboneleri çek
    let where: any = { status: { equals: "active" } };

    // Etiket filtrelemesi
    if (campaign.targetAudience === "by-tags" && campaign.targetTags?.length > 0) {
      const tags = campaign.targetTags.map((t: any) => t.tag);
      where = {
        and: [
          { status: { equals: "active" } },
          { "tags.tag": { in: tags } },
        ],
      };
    }

    const subscribers = await payload.find({
      collection: "newsletter-subscribers",
      where,
      limit: 10000,
      depth: 0,
    });

    if (subscribers.docs.length === 0) {
      await payload.update({
        collection: "newsletter-campaigns",
        id: campaign.id,
        data: {
          status: "sent",
          sentAt: new Date().toISOString(),
          recipientCount: 0,
        },
      });
      return;
    }

    // Resend ile gönder
    const { sendEmail } = await import("@shipit/email");
    const { NewsletterEmail } = await import("@shipit/email");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
    const siteName = process.env.SITE_NAME || "EuroVizyon Danışmanlık";

    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    // Batch halinde gönder (her batch 10 e-posta)
    const batchSize = 10;
    const docs = subscribers.docs;

    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = docs.slice(i, i + batchSize);

      const results = await Promise.allSettled(
        batch.map((subscriber: any) =>
          sendEmail({
            to: subscriber.email,
            subject: campaign.subject,
            react: NewsletterEmail({
              siteName,
              previewText: campaign.previewText || campaign.subject,
              content: campaign.plainTextContent || "Newsletter içeriği",
              unsubscribeUrl: `${siteUrl}/api/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}&email=${encodeURIComponent(subscriber.email)}`,
            }),
          })
        )
      );

      for (const result of results) {
        if (result.status === "fulfilled") {
          successCount++;
        } else {
          failCount++;
          errors.push(result.reason?.message || "Unknown error");
        }
      }

      // Rate limit: 100ms bekleme
      if (i + batchSize < docs.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    // Sonuçları kaydet
    await payload.update({
      collection: "newsletter-campaigns",
      id: campaign.id,
      data: {
        status: failCount > 0 && successCount === 0 ? "failed" : "sent",
        sentAt: new Date().toISOString(),
        recipientCount: docs.length,
        successCount,
        failCount,
        errorLog: errors.length > 0 ? errors.slice(0, 20).join("\n") : undefined,
      },
    });
  } catch (err: any) {
    console.error("Campaign send error:", err);
    await payload.update({
      collection: "newsletter-campaigns",
      id: campaign.id,
      data: {
        status: "failed",
        errorLog: err?.message || "Bilinmeyen hata",
      },
    });
  }
}
