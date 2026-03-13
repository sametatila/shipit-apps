"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input } from "@shipit/ui";
import { Mail, Loader2, CheckCircle } from "lucide-react";

export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-lg bg-primary/10 p-2">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-heading text-lg font-semibold">{t("title")}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{t("description")}</p>

      {status === "success" ? (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <p className="text-sm">{t("success")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder={t("placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={status === "loading"} size="sm">
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              t("subscribe")
            )}
          </Button>
        </form>
      )}
      {status === "error" && (
        <p className="text-sm text-destructive mt-2">{t("error")}</p>
      )}
    </div>
  );
}
