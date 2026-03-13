"use client";

import { useState } from "react";
import { Button } from "@shipit/ui";
import { Badge } from "@shipit/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@shipit/ui/card";
import { Link } from "@/i18n/navigation";
import {
  GraduationCap,
  BookOpen,
  Award,
  Wrench,
  Languages,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Star,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { cn } from "@shipit/ui";

// Step definitions
type Step = "education" | "germanLevel" | "goal" | "age" | "budget" | "result";

interface FormData {
  education: string;
  germanLevel: string;
  goal: string;
  age: string;
  budget: string;
}

interface ProgramRecommendation {
  name: string;
  icon: React.ElementType;
  match: number; // 0-100
  description: string;
  requirements: string[];
  duration: string;
  cost: string;
  nextSteps: string[];
  href: string;
  highlight?: string;
}

const steps: Step[] = ["education", "germanLevel", "goal", "age", "budget", "result"];

const stepLabels: Record<Step, string> = {
  education: "Eğitim Durumu",
  germanLevel: "Almanca Seviyesi",
  goal: "Hedef",
  age: "Yaş",
  budget: "Bütçe",
  result: "Sonuç",
};

export function EligibilityChecker() {
  const [currentStep, setCurrentStep] = useState<Step>("education");
  const [formData, setFormData] = useState<FormData>({
    education: "",
    germanLevel: "",
    goal: "",
    age: "",
    budget: "",
  });

  const currentIndex = steps.indexOf(currentStep);
  const progress = ((currentIndex) / (steps.length - 1)) * 100;

  function selectOption(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Auto-advance to next step
    const nextIndex = currentIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  }

  function goBack() {
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  }

  function reset() {
    setFormData({ education: "", germanLevel: "", goal: "", age: "", budget: "" });
    setCurrentStep("education");
  }

  function getRecommendations(): ProgramRecommendation[] {
    const results: ProgramRecommendation[] = [];
    const { education, germanLevel, goal, age, budget } = formData;

    const germanScore = { none: 0, a1: 1, a2: 2, b1: 3, b2: 4, c1: 5, c2: 6 }[germanLevel] ?? 0;
    const ageNum = { "17-19": 18, "20-24": 22, "25-30": 27, "31+": 35 }[age] ?? 22;
    const budgetScore = { low: 1, medium: 2, high: 3, veryHigh: 4 }[budget] ?? 2;

    // Studienkolleg
    if (
      (education === "highschool" || education === "highschoolStudent") &&
      goal !== "ausbildung"
    ) {
      let match = 85;
      if (germanScore >= 3) match += 10; // B1+
      if (germanScore < 2) match -= 20;
      if (ageNum > 25) match -= 15;
      results.push({
        name: "Studienkolleg",
        icon: GraduationCap,
        match: Math.min(100, Math.max(0, match)),
        description:
          "Almanya'da üniversite öncesi 1 yıllık hazırlık programı. Türkiye lise diploması doğrudan tanınmadığı için ilk adım.",
        requirements: [
          "Lise diploması (min. 2.5 ortalama)",
          `Almanca B1 seviyesi ${germanScore < 3 ? "(henüz yok - hazırlanmanız gerekiyor)" : "(var)"}`,
          "Aufnahmetest (giriş sınavı) başarısı",
        ],
        duration: "1 yıl (2 dönem)",
        cost: "Ücretsiz (sadece Semesterbeitrag ~150-350€/dönem)",
        nextSteps: [
          "Almanca B1 seviyesine ulaşın",
          "Studienkolleg başvuru tarihlerini kontrol edin",
          "T-Kurs, M-Kurs veya W-Kurs arasında seçim yapın",
        ],
        href: "/programs",
        highlight: education === "highschool" ? "Profiliniz için en uygun başlangıç noktası" : undefined,
      });
    }

    // Lisans
    if (
      (education === "highschool" || education === "highschoolStudent") &&
      (goal === "university" || goal === "career")
    ) {
      let match = 70;
      if (germanScore >= 5) match += 20; // C1
      if (germanScore < 3) match -= 10;
      if (education === "highschoolStudent") match -= 10;
      results.push({
        name: "Lisans (Bachelor)",
        icon: BookOpen,
        match: Math.min(100, Math.max(0, match)),
        description:
          "3-4 yıllık lisans programları. Studienkolleg sonrası veya doğrudan başvuru (bazı üniversiteler).",
        requirements: [
          "Studienkolleg + FSP sınavı VEYA uluslararası lise diploması",
          `Almanca C1 (TestDaF 4x4) ${germanScore >= 5 ? "(var)" : "(henüz yok)"}`,
          "Sperrkonto: 11.208€/yıl",
        ],
        duration: "3-4 yıl (6-8 dönem)",
        cost: "Ücretsiz (BW eyaletinde 1.500€/dönem)",
        nextSteps: [
          "Önce Studienkolleg'i tamamlayın",
          "TestDaF veya DSH sınavına hazırlanın",
          "uni-assist üzerinden başvuru yapın",
        ],
        href: "/programs",
      });
    }

    // Yüksek Lisans
    if (education === "bachelors" || education === "masters") {
      let match = 90;
      if (germanScore >= 4) match += 5;
      if (budgetScore >= 2) match += 5;
      if (education === "masters") match -= 10; // already has masters
      results.push({
        name: "Yüksek Lisans (Master)",
        icon: Award,
        match: Math.min(100, Math.max(0, match)),
        description:
          "2 yıllık yüksek lisans programları. İngilizce ve Almanca seçenekleri mevcut. Türk lisans diplomasıyla doğrudan başvuru.",
        requirements: [
          "Lisans diploması (ilgili alanda)",
          `İngilizce (IELTS 6.5+ / TOEFL 90+) veya Almanca C1`,
          "Sperrkonto: 11.208€/yıl",
          "Motivasyon mektubu + CV",
        ],
        duration: "2 yıl (4 dönem)",
        cost: "Ücretsiz (BW eyaletinde 1.500€/dönem)",
        nextSteps: [
          "İngilizce veya Almanca program tercihi yapın",
          "DAAD burs başvurusu değerlendirin",
          "uni-assist veya direkt üniversite portalı üzerinden başvurun",
        ],
        href: "/programs",
        highlight:
          education === "bachelors" ? "Profilinize en uygun program" : undefined,
      });
    }

    // Ausbildung
    if (goal === "ausbildung" || goal === "career") {
      let match = goal === "ausbildung" ? 95 : 65;
      if (germanScore >= 3) match += 5;
      if (germanScore < 2) match -= 25;
      if (ageNum > 30) match -= 10;
      if (education === "bachelors" || education === "masters") match -= 10;
      results.push({
        name: "Ausbildung (Mesleki Eğitim)",
        icon: Wrench,
        match: Math.min(100, Math.max(0, match)),
        description:
          "2-3 yıllık maaşlı mesleki eğitim. Haftada 2 gün okul + 3 gün işyeri. Aylık 800-1.200€ maaş.",
        requirements: [
          "Lise diploması",
          `Almanca B1-B2 ${germanScore >= 3 ? "(var)" : "(henüz yok)"}`,
          "Firma ile eğitim sözleşmesi",
        ],
        duration: "2-3 yıl",
        cost: "Ücretsiz + Aylık 800-1.200€ maaş",
        nextSteps: [
          "Almanca B1 seviyesine ulaşın",
          "Meslek dalı seçimi yapın (300+ seçenek)",
          "Firma eşleştirme sürecini başlatın",
        ],
        href: "/programs",
        highlight:
          goal === "ausbildung"
            ? "Hem eğitim alın hem para kazanın"
            : undefined,
      });
    }

    // Almanca Dil Kursu
    if (germanScore < 4) {
      let match = 80;
      if (germanScore === 0) match = 95;
      if (germanScore >= 3) match = 50;
      results.push({
        name: "Almanca Dil Kursu",
        icon: Languages,
        match: Math.min(100, Math.max(0, match)),
        description:
          "Türkiye veya Almanya'da yoğun Almanca eğitimi. Diğer programlara başvuru öncesi gerekli dil seviyesine ulaşmanızı sağlar.",
        requirements: [
          "Herhangi bir ön koşul yok",
          "Pasaport (Almanya'da kurs için vize gerekebilir)",
        ],
        duration: "3-12 ay (seviyeye göre)",
        cost: "Türkiye: ~₺15.000-25.000 | Almanya: 500-800€/ay",
        nextSteps: [
          "Mevcut seviyenizi tespit ettirin",
          "Yoğun veya standart program seçin",
          "TestDaF/DSH/TELC hedef sınav belirleyin",
        ],
        href: "/programs",
        highlight:
          germanScore === 0
            ? "Almanya eğitimine ilk adım: Almanca öğrenin"
            : undefined,
      });
    }

    // Doktora
    if (education === "masters") {
      let match = 85;
      if (budgetScore >= 3) match += 5;
      results.push({
        name: "Doktora (PhD)",
        icon: Lightbulb,
        match: Math.min(100, Math.max(0, match)),
        description:
          "Araştırma pozisyonuyla finanse edilen doktora programları. Almanca veya İngilizce. Maaşlı pozisyonlar mevcut.",
        requirements: [
          "Yüksek lisans diploması",
          "Araştırma teklifi / proje planı",
          "İngilizce veya Almanca yeterlilik",
          "Akademik referans mektupları",
        ],
        duration: "3-5 yıl",
        cost: "Ücretsiz + Araştırma pozisyonu maaşı (2.500-4.500€/ay)",
        nextSteps: [
          "Araştırma alanınızda profesör/lab araştırın",
          "DAAD veya DFG burs programlarına başvurun",
          "Araştırma teklifi hazırlayın",
        ],
        href: "/programs",
        highlight: "Akademik kariyerinizi Almanya'da sürdürün",
      });
    }

    // Sort by match score
    return results.sort((a, b) => b.match - a.match);
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress bar */}
      {currentStep !== "result" && (
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>
              Adım {currentIndex + 1} / {steps.length - 1}
            </span>
            <span>{stepLabels[currentStep]}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Step: Education */}
      {currentStep === "education" && (
        <StepCard title="Mevcut eğitim durumunuz nedir?">
          <OptionGrid
            options={[
              { value: "highschoolStudent", label: "Lise Öğrencisi", desc: "Henüz mezun olmadım" },
              { value: "highschool", label: "Lise Mezunu", desc: "Lise diplomam var" },
              { value: "bachelors", label: "Lisans Mezunu", desc: "Üniversite diplomam var" },
              { value: "masters", label: "Yüksek Lisans Mezunu", desc: "Master/YL diplomam var" },
            ]}
            selected={formData.education}
            onSelect={(v) => selectOption("education", v)}
          />
        </StepCard>
      )}

      {/* Step: German Level */}
      {currentStep === "germanLevel" && (
        <StepCard title="Almanca seviyeniz nedir?" onBack={goBack}>
          <OptionGrid
            options={[
              { value: "none", label: "Almancam Yok", desc: "Hiç bilmiyorum" },
              { value: "a1", label: "A1 - Başlangıç", desc: "Temel kelimeler ve cümleler" },
              { value: "a2", label: "A2 - Temel", desc: "Günlük basit iletişim" },
              { value: "b1", label: "B1 - Orta", desc: "Günlük konuşma yapabiliyorum" },
              { value: "b2", label: "B2 - Orta-İleri", desc: "Akıcı iletişim kurabiliyorum" },
              { value: "c1", label: "C1 - İleri", desc: "Akademik seviye" },
              { value: "c2", label: "C2 - Uzman", desc: "Ana dil seviyesi" },
            ]}
            selected={formData.germanLevel}
            onSelect={(v) => selectOption("germanLevel", v)}
          />
        </StepCard>
      )}

      {/* Step: Goal */}
      {currentStep === "goal" && (
        <StepCard title="Almanya'daki hedefiniz nedir?" onBack={goBack}>
          <OptionGrid
            options={[
              {
                value: "university",
                label: "Üniversite Eğitimi",
                desc: "Lisans veya Yüksek Lisans",
              },
              { value: "ausbildung", label: "Mesleki Eğitim", desc: "Ausbildung ile kariyer" },
              {
                value: "career",
                label: "Kariyer Değişikliği",
                desc: "Yeni bir alanda çalışmak",
              },
              {
                value: "language",
                label: "Dil Öğrenme",
                desc: "Sadece Almanca öğrenmek",
              },
            ]}
            selected={formData.goal}
            onSelect={(v) => selectOption("goal", v)}
          />
        </StepCard>
      )}

      {/* Step: Age */}
      {currentStep === "age" && (
        <StepCard title="Yaş aralığınız nedir?" onBack={goBack}>
          <OptionGrid
            options={[
              { value: "17-19", label: "17-19", desc: "Lise çağı" },
              { value: "20-24", label: "20-24", desc: "Üniversite çağı" },
              { value: "25-30", label: "25-30", desc: "Genç profesyonel" },
              { value: "31+", label: "31+", desc: "Deneyimli profesyonel" },
            ]}
            selected={formData.age}
            onSelect={(v) => selectOption("age", v)}
          />
        </StepCard>
      )}

      {/* Step: Budget */}
      {currentStep === "budget" && (
        <StepCard title="Yıllık bütçeniz ne kadar?" onBack={goBack}>
          <OptionGrid
            options={[
              {
                value: "low",
                label: "5.000€'dan az",
                desc: "Sınırlı bütçe",
              },
              {
                value: "medium",
                label: "5.000 - 10.000€",
                desc: "Orta bütçe",
              },
              {
                value: "high",
                label: "10.000 - 15.000€",
                desc: "Rahat bütçe",
              },
              {
                value: "veryHigh",
                label: "15.000€+",
                desc: "Esnek bütçe",
              },
            ]}
            selected={formData.budget}
            onSelect={(v) => selectOption("budget", v)}
          />
        </StepCard>
      )}

      {/* Step: Results */}
      {currentStep === "result" && (
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="font-heading text-2xl font-bold">
              Profilinize Uygun Programlar
            </h2>
            <p className="text-muted-foreground">
              Yanıtlarınıza göre size en uygun Almanya eğitim programları:
            </p>
          </div>

          {getRecommendations().map((rec, index) => (
            <Card
              key={index}
              className={cn(
                "transition-all duration-300 hover:shadow-lg",
                index === 0 && "border-primary shadow-md"
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-lg",
                        index === 0
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      <rec.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{rec.name}</CardTitle>
                      {rec.highlight && (
                        <p className="mt-1 text-xs font-medium text-primary">
                          {rec.highlight}
                        </p>
                      )}
                    </div>
                  </div>
                  <MatchBadge score={rec.match} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {rec.description}
                </CardDescription>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Gereksinimler
                    </p>
                    <ul className="space-y-1.5">
                      {rec.requirements.map((req, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          {req.includes("(var)") ? (
                            <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                          ) : req.includes("(henüz yok") ? (
                            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-500" />
                          ) : (
                            <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                          )}
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Süre
                      </p>
                      <p className="mt-1 text-sm">{rec.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Maliyet
                      </p>
                      <p className="mt-1 text-sm">{rec.cost}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sonraki Adımlar
                  </p>
                  <ol className="space-y-1.5">
                    {rec.nextSteps.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant={index === 0 ? "default" : "outline"} size="sm">
                  <Link href={rec.href}>
                    Detaylı Bilgi
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}

          <div className="flex justify-center pt-4">
            <Button variant="ghost" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Testi Tekrarla
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Sub-components ---

function StepCard({
  title,
  children,
  onBack,
}: {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function OptionGrid({
  options,
  selected,
  onSelect,
}: {
  options: { value: string; label: string; desc: string }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onSelect(opt.value)}
          className={cn(
            "flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all duration-200 hover:border-primary hover:bg-primary/5",
            selected === opt.value
              ? "border-primary bg-primary/10"
              : "border-border"
          )}
        >
          <span className="font-semibold">{opt.label}</span>
          <span className="mt-1 text-xs text-muted-foreground">{opt.desc}</span>
        </button>
      ))}
    </div>
  );
}

function MatchBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : score >= 60
        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

  return (
    <div className={cn("rounded-full px-3 py-1 text-xs font-bold", color)}>
      %{score} Uygun
    </div>
  );
}
