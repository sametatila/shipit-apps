"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button, Input, Textarea, Label } from "@shipit/ui";
import { trackFormSubmit } from "@shipit/analytics";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { useCsrf } from "@/hooks/use-csrf";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";

interface ContactFormProps {
  source?: string;
  onSuccess?: () => void;
}

export function ContactForm({ source, onSuccess }: ContactFormProps) {
  const t = useTranslations("forms");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { fetchWithCsrf } = useCsrf();
  const turnstileTokenRef = useRef<string>("");

  const contactSchema = z.object({
    name: z.string().min(2, t("validationNameMin")),
    email: z.string().email(t("validationEmailInvalid")),
    phone: z.string().optional(),
    message: z.string().min(10, t("validationMessageMin")),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetchWithCsrf("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: source || "contact",
          turnstileToken: turnstileTokenRef.current,
        }),
      });
      if (!response.ok) throw new Error("Failed to send");
      trackFormSubmit("contact");
      setSubmitStatus("success");
      reset();
      onSuccess?.();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("successContact")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            En kısa sürede sizinle iletişime geçeceğiz.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSubmitStatus("idle")}
        >
          Yeni Mesaj Gönder
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")} *</Label>
          <Input id="name" placeholder={t("namePlaceholder")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
          {errors.name && <p id="name-error" className="text-sm text-destructive" role="alert">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")} *</Label>
          <Input id="email" type="email" placeholder={t("emailPlaceholder")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
          {errors.email && <p id="email-error" className="text-sm text-destructive" role="alert">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">{t("phone")}</Label>
        <Input id="phone" type="tel" placeholder={t("phonePlaceholder")} {...register("phone")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t("message")} *</Label>
        <Textarea id="message" placeholder={t("messagePlaceholder")} rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
        {errors.message && <p id="message-error" className="text-sm text-destructive" role="alert">{errors.message.message}</p>}
      </div>
      <TurnstileWidget onVerify={(token) => { turnstileTokenRef.current = token; }} onExpire={() => { turnstileTokenRef.current = ""; }} />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t("sending")}</>) : (<><Send className="mr-2 h-4 w-4" />{t("send")}</>)}
      </Button>
      {submitStatus === "error" && <p className="text-sm text-destructive text-center" role="alert" aria-live="assertive">{t("errorGeneral")}</p>}
    </form>
  );
}
