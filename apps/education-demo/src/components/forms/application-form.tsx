"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Input,
  Textarea,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@shipit/ui";
import { trackFormSubmit } from "@shipit/analytics";
import { Send, Loader2 } from "lucide-react";
import { useCsrf } from "@/hooks/use-csrf";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz."),
  whatsapp: z.string().optional(),
  currentEducation: z.enum(
    ["high-school", "high-school-grad", "university", "bachelor-grad", "master-grad", "working"],
    { required_error: "Mevcut eğitim durumunuzu seçiniz." }
  ),
  programType: z.enum(
    ["studienkolleg", "bachelor", "master", "phd", "ausbildung", "language", "undecided"],
    { required_error: "İlgilendiğiniz program türünü seçiniz." }
  ),
  fieldOfStudy: z.string().optional(),
  germanLevel: z.enum(
    ["none", "a1", "a2", "b1", "b2", "c1", "c2"],
    { required_error: "Almanca seviyenizi seçiniz." }
  ),
  preferredSemester: z.enum(
    ["winter", "summer", "asap"],
    { required_error: "Tercih ettiğiniz dönemi seçiniz." }
  ),
  budget: z.enum(
    ["scholarship", "under-10k", "10k-20k", "over-20k"],
    { required_error: "Bütçe aralığınızı seçiniz." }
  ),
  message: z.string().optional(),
  source: z.enum(
    ["google", "instagram", "youtube", "referral", "event", "other"],
    { required_error: "Bizi nereden duydunuz?" }
  ),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const educationOptions = [
  { value: "high-school", label: "Lise Öğrencisi" },
  { value: "high-school-grad", label: "Lise Mezunu" },
  { value: "university", label: "Üniversite Öğrencisi" },
  { value: "bachelor-grad", label: "Lisans Mezunu" },
  { value: "master-grad", label: "Yüksek Lisans Mezunu" },
  { value: "working", label: "Diğer / Çalışıyor" },
];

const programOptions = [
  { value: "studienkolleg", label: "Studienkolleg" },
  { value: "bachelor", label: "Lisans" },
  { value: "master", label: "Yüksek Lisans" },
  { value: "phd", label: "Doktora" },
  { value: "ausbildung", label: "Ausbildung" },
  { value: "language", label: "Almanca Dil Kursu" },
  { value: "undecided", label: "Henüz Karar Vermedim" },
];

const germanLevelOptions = [
  { value: "none", label: "Almancam yok" },
  { value: "a1", label: "A1" },
  { value: "a2", label: "A2" },
  { value: "b1", label: "B1" },
  { value: "b2", label: "B2" },
  { value: "c1", label: "C1" },
  { value: "c2", label: "C2" },
];

const semesterOptions = [
  { value: "winter", label: "Kış Dönemi 2026/27" },
  { value: "summer", label: "Yaz Dönemi 2027" },
  { value: "asap", label: "En Kısa Sürede" },
];

const budgetOptions = [
  { value: "scholarship", label: "Burs ile (masrafsız)" },
  { value: "under-10k", label: "10.000€'dan az" },
  { value: "10k-20k", label: "10.000-20.000€" },
  { value: "over-20k", label: "20.000€'dan fazla" },
];

const sourceOptions = [
  { value: "google", label: "Google" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "referral", label: "Arkadaş Tavsiyesi" },
  { value: "event", label: "Fuar/Etkinlik" },
  { value: "other", label: "Diğer" },
];

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const { fetchWithCsrf } = useCsrf();
  const turnstileTokenRef = useRef<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      whatsapp: "",
      fieldOfStudy: "",
      message: "",
    },
  });

  async function onSubmit(data: ApplicationFormData) {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetchWithCsrf("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          turnstileToken: turnstileTokenRef.current,
        }),
      });
      if (!response.ok) throw new Error("Failed to send");
      trackFormSubmit("application");
      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Kişisel Bilgiler */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Kişisel Bilgiler
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Ad Soyad *</Label>
            <Input
              id="fullName"
              placeholder="Adınız ve soyadınız"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p
                id="fullName-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-posta *</Label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+90 5XX XXX XX XX"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone")}
            />
            {errors.phone && (
              <p
                id="phone-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="WhatsApp numaranız farklıysa"
              {...register("whatsapp")}
            />
          </div>
        </div>
      </div>

      {/* Eğitim Bilgileri */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Eğitim Bilgileri
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="currentEducation">Mevcut Eğitim Durumu *</Label>
            <Select
              onValueChange={(value: string) => {
                setValue("currentEducation", value as ApplicationFormData["currentEducation"]);
                trigger("currentEducation");
              }}
            >
              <SelectTrigger
                id="currentEducation"
                aria-invalid={!!errors.currentEducation}
                aria-describedby={
                  errors.currentEducation
                    ? "currentEducation-error"
                    : undefined
                }
              >
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                {educationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.currentEducation && (
              <p
                id="currentEducation-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.currentEducation.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="programType">İlgilendiğiniz Program *</Label>
            <Select
              onValueChange={(value: string) => {
                setValue("programType", value as ApplicationFormData["programType"]);
                trigger("programType");
              }}
            >
              <SelectTrigger
                id="programType"
                aria-invalid={!!errors.programType}
                aria-describedby={
                  errors.programType ? "programType-error" : undefined
                }
              >
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                {programOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.programType && (
              <p
                id="programType-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.programType.message}
              </p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="fieldOfStudy">İlgilendiğiniz Bölüm/Alan</Label>
            <Input
              id="fieldOfStudy"
              placeholder="Örn: Makine Mühendisliği, İşletme, Tıp..."
              {...register("fieldOfStudy")}
            />
          </div>
        </div>
      </div>

      {/* Almanca Bilgisi */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Almanca Bilgisi
        </h3>
        <div className="space-y-2">
          <Label htmlFor="germanLevel">Almanca Seviyeniz *</Label>
          <Select
            onValueChange={(value: string) => {
              setValue("germanLevel", value as ApplicationFormData["germanLevel"]);
              trigger("germanLevel");
            }}
          >
            <SelectTrigger
              id="germanLevel"
              aria-invalid={!!errors.germanLevel}
              aria-describedby={
                errors.germanLevel ? "germanLevel-error" : undefined
              }
            >
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {germanLevelOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.germanLevel && (
            <p
              id="germanLevel-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.germanLevel.message}
            </p>
          )}
        </div>
      </div>

      {/* Tercihler */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Tercihler</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="preferredSemester">Tercih Edilen Dönem *</Label>
            <Select
              onValueChange={(value: string) => {
                setValue("preferredSemester", value as ApplicationFormData["preferredSemester"]);
                trigger("preferredSemester");
              }}
            >
              <SelectTrigger
                id="preferredSemester"
                aria-invalid={!!errors.preferredSemester}
                aria-describedby={
                  errors.preferredSemester
                    ? "preferredSemester-error"
                    : undefined
                }
              >
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                {semesterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.preferredSemester && (
              <p
                id="preferredSemester-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.preferredSemester.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Bütçe Aralığı *</Label>
            <Select
              onValueChange={(value: string) => {
                setValue("budget", value as ApplicationFormData["budget"]);
                trigger("budget");
              }}
            >
              <SelectTrigger
                id="budget"
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? "budget-error" : undefined}
              >
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.budget && (
              <p
                id="budget-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.budget.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Ek Bilgiler */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Ek Bilgiler</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Mesajınız</Label>
            <Textarea
              id="message"
              placeholder="Hedeflerinizi ve beklentilerinizi paylaşın..."
              rows={4}
              {...register("message")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Bizi Nereden Duydunuz? *</Label>
            <Select
              onValueChange={(value: string) => {
                setValue("source", value as ApplicationFormData["source"]);
                trigger("source");
              }}
            >
              <SelectTrigger
                id="source"
                aria-invalid={!!errors.source}
                aria-describedby={errors.source ? "source-error" : undefined}
              >
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                {sourceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.source && (
              <p
                id="source-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.source.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Turnstile CAPTCHA */}
      <TurnstileWidget
        onVerify={(token) => {
          turnstileTokenRef.current = token;
        }}
        onExpire={() => {
          turnstileTokenRef.current = "";
        }}
      />

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Başvuruyu Gönder
          </>
        )}
      </Button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <p
          className="text-sm text-green-600 text-center"
          role="status"
          aria-live="polite"
        >
          Başvurunuz başarıyla alındı! Danışmanlarımız en kısa sürede sizinle
          iletişime geçecektir.
        </p>
      )}
      {submitStatus === "error" && (
        <p
          className="text-sm text-destructive text-center"
          role="alert"
          aria-live="assertive"
        >
          Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.
        </p>
      )}
    </form>
  );
}
