"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button, Input, Textarea, Label } from "@shipit/ui";
import { trackFormSubmit } from "@shipit/analytics";
import { CalendarDays, Loader2 } from "lucide-react";
import { useCsrf } from "@/hooks/use-csrf";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";

export function ReservationForm() {
  const t = useTranslations("forms");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { fetchWithCsrf } = useCsrf();
  const turnstileTokenRef = useRef<string>("");

  const reservationSchema = z.object({
    name: z.string().min(2, t("validationNameMin")),
    email: z.string().email(t("validationEmailInvalid")),
    phone: z.string().min(10, t("validationPhoneMin")),
    date: z.string().min(1, t("validationDateRequired")),
    time: z.string().min(1, t("validationTimeRequired")),
    guests: z.coerce.number().min(1, t("validationGuestsMin")).max(50),
    notes: z.string().optional(),
  });

  type ReservationFormData = z.infer<typeof reservationSchema>;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  async function onSubmit(data: ReservationFormData) {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetchWithCsrf("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: turnstileTokenRef.current }),
      });
      if (!response.ok) throw new Error("Failed to send");
      trackFormSubmit("reservation");
      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="res-website">Website</label>
        <input type="text" id="res-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="res-name">{t("name")} *</Label>
          <Input id="res-name" placeholder={t("namePlaceholder")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "res-name-error" : undefined} {...register("name")} />
          {errors.name && <p id="res-name-error" className="text-sm text-destructive" role="alert">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="res-phone">{t("phone")} *</Label>
          <Input id="res-phone" type="tel" placeholder={t("phonePlaceholder")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "res-phone-error" : undefined} {...register("phone")} />
          {errors.phone && <p id="res-phone-error" className="text-sm text-destructive" role="alert">{errors.phone.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="res-email">{t("email")} *</Label>
        <Input id="res-email" type="email" placeholder={t("emailPlaceholder")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "res-email-error" : undefined} {...register("email")} />
        {errors.email && <p id="res-email-error" className="text-sm text-destructive" role="alert">{errors.email.message}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="res-date">{t("date")} *</Label>
          <Input id="res-date" type="date" aria-invalid={!!errors.date} aria-describedby={errors.date ? "res-date-error" : undefined} {...register("date")} />
          {errors.date && <p id="res-date-error" className="text-sm text-destructive" role="alert">{errors.date.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="res-time">{t("time")} *</Label>
          <Input id="res-time" type="time" aria-invalid={!!errors.time} aria-describedby={errors.time ? "res-time-error" : undefined} {...register("time")} />
          {errors.time && <p id="res-time-error" className="text-sm text-destructive" role="alert">{errors.time.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="res-guests">{t("guests")} *</Label>
          <Input id="res-guests" type="number" min={1} max={50} defaultValue={2} aria-invalid={!!errors.guests} aria-describedby={errors.guests ? "res-guests-error" : undefined} {...register("guests")} />
          {errors.guests && <p id="res-guests-error" className="text-sm text-destructive" role="alert">{errors.guests.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="res-notes">{t("notes")}</Label>
        <Textarea id="res-notes" placeholder={t("notesPlaceholder")} rows={3} {...register("notes")} />
      </div>
      <TurnstileWidget onVerify={(token) => { turnstileTokenRef.current = token; }} onExpire={() => { turnstileTokenRef.current = ""; }} />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t("sending")}</>) : (<><CalendarDays className="mr-2 h-4 w-4" />{t("makeReservation")}</>)}
      </Button>
      {submitStatus === "success" && <p className="text-sm text-green-600 text-center" role="status" aria-live="polite">{t("successReservation")}</p>}
      {submitStatus === "error" && <p className="text-sm text-destructive text-center" role="alert" aria-live="assertive">{t("errorGeneral")}</p>}
    </form>
  );
}
