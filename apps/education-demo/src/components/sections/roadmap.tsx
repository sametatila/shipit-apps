"use client";

import { cn } from "@shipit/ui";
import { Button } from "@shipit/ui";
import { useContactModal } from "@/contexts/contact-modal-context";
import {
  FileText,
  Languages,
  GraduationCap,
  Stamp,
  Plane,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  duration?: string;
  accent: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: FileText,
    title: "Belgelerin Gönderilmesi",
    description: "Üniversite başvurusu için gerekli tüm evraklar danışmanlık ekibimize iletilir.",
    details: [
      "Diploma ve transkript",
      "Kimlik/pasaport fotokopisi",
      "Almanca seviye belgesi",
      "Özgeçmiş (CV)",
    ],
    accent: "from-blue-500 to-blue-600",
  },
  {
    number: 2,
    icon: Languages,
    title: "Tercüme ve Teslim",
    description: "Belgeler yeminli tercümanlar tarafından Almancaya çevrilir ve size ulaştırılır.",
    details: [
      "Yeminli tercüme işlemleri",
      "Apostil ve noter onayları",
      "Belgelerin kargo ile teslimi",
    ],
    accent: "from-indigo-500 to-indigo-600",
  },
  {
    number: 3,
    icon: GraduationCap,
    title: "Üniversite Başvurusu",
    description: "Motivasyon mektubu hazırlanır ve hedef üniversitelere başvurular yapılır.",
    details: [
      "Motivasyon mektubu hazırlama",
      "Üniversite başvurularının yapılması",
      "%100 kabul garantisi",
    ],
    duration: "1 – 2 ay",
    accent: "from-violet-500 to-violet-600",
  },
  {
    number: 4,
    icon: Stamp,
    title: "Vize Süreci",
    description: "Kabul belgesi geldikten sonra vize randevusu planlanır ve hazırlıklar tamamlanır.",
    details: [
      "Sperrkonto açılışı",
      "Sağlık sigortası",
      "Vize randevusu ve başvuru",
      "Vize kabul ve iade garantisi",
    ],
    accent: "from-purple-500 to-purple-600",
  },
  {
    number: 5,
    icon: Plane,
    title: "Almanya'ya Varış Desteği",
    description: "Süreç Almanya'da da devam eder. Yerleşim işlemlerinde yanınızdayız.",
    details: [
      "Adres kaydı (Anmeldung)",
      "Oturum izni başvurusu",
      "Banka hesabı açılışı",
      "İlk 6 ay iletişim desteği",
    ],
    accent: "from-primary to-primary/80",
  },
];

export function Roadmap() {
  const { open } = useContactModal();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

            <div className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="relative pl-16 md:pl-20 group">
                    {/* Number circle */}
                    <div
                      className={cn(
                        "absolute left-0 top-0 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110",
                        step.accent
                      )}
                    >
                      <Icon className="h-6 w-6 md:h-7 md:w-7" />
                    </div>

                    {/* Content card */}
                    <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-primary/30">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          Adım {step.number}
                        </span>
                        {step.duration && (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                            {step.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-xl font-bold md:text-2xl mb-2">
                        {step.title}
                      </h3>

                      <p className="text-muted-foreground mb-4">
                        {step.description}
                      </p>

                      <ul className="space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2.5 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Connector dot */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-[22px] md:left-[30px] -bottom-6 h-3 w-3 rounded-full border-2 border-primary/30 bg-background" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 rounded-2xl border bg-primary/5 p-8 md:p-10">
              <p className="font-heading text-lg font-bold md:text-xl">
                Sürecin her aşamasında birebir danışmanlık
              </p>
              <p className="text-muted-foreground text-sm max-w-md">
                Evrak hazırlama, başvuru yönetimi, vize takibi ve Almanya&apos;da
                yerleşim desteği — tüm süreç boyunca yanınızdayız.
              </p>
              <Button
                size="lg"
                className="group mt-2"
                onClick={open}
              >
                Ücretsiz Danışmanlık Al
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
