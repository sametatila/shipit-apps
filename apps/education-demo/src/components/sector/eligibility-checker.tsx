"use client";

import { useState } from "react";
import { Button } from "@shipit/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@shipit/ui/card";
import { Link } from "@/i18n/navigation";
import { useContactModal } from "@/contexts/contact-modal-context";
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
  AlertTriangle,
  Route,
  MessageCircle,
} from "lucide-react";
import { cn } from "@shipit/ui";

// Step definitions
type Step = "education" | "germanLevel" | "goal" | "age" | "result";

interface FormData {
  education: string;
  germanLevel: string;
  goal: string;
  age: string;
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

const steps: Step[] = ["education", "germanLevel", "goal", "age", "result"];

const stepLabels: Record<Step, string> = {
  education: "Eğitim Durumu",
  germanLevel: "Almanca Seviyesi",
  goal: "Hedef",
  age: "Yaş",
  result: "Sonuç",
};

export function EligibilityChecker() {
  const [currentStep, setCurrentStep] = useState<Step>("education");
  const [formData, setFormData] = useState<FormData>({
    education: "",
    germanLevel: "",
    goal: "",
    age: "",
  });
  const { open } = useContactModal();

  const currentIndex = steps.indexOf(currentStep);
  const progress = ((currentIndex) / (steps.length - 1)) * 100;

  function selectOption(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    setFormData({ education: "", germanLevel: "", goal: "", age: "" });
    setCurrentStep("education");
  }

  function getRecommendations(): ProgramRecommendation[] {
    const results: ProgramRecommendation[] = [];
    const { education, germanLevel, goal, age } = formData;

    const germanScore = { none: 0, a1: 1, a2: 2, b1: 3, b2: 4, c1: 5, c2: 6 }[germanLevel] ?? 0;
    const ageNum = { "18-22": 20, "23-27": 25, "28-34": 31, "35+": 38 }[age] ?? 22;

    const isHighSchool = education === "highschoolRegular" || education === "highschoolOpen";
    const isUniStudent = education === "uniStudent";
    const hasBachelors = education === "bachelors" || education === "masters" || isUniStudent;

    // ─── Studienkolleg (lise mezunları için ana yol) ───
    if (isHighSchool && goal !== "ausbildung" && goal !== "language") {
      let match = 92;
      if (germanScore >= 3) match += 5; // B1+ var, hazır
      if (germanScore < 2) match -= 15; // Önce dil kursu gerekir
      if (ageNum > 28) match -= 20;
      if (education === "highschoolOpen") match -= 5;
      results.push({
        name: "Studienkolleg",
        icon: GraduationCap,
        match: Math.min(100, Math.max(0, match)),
        description:
          "Almanya'da üniversite öncesi 1 yıllık hazırlık programı. Türkiye lise diploması doğrudan tanınmadığı için üniversiteye giden en güvenilir yol.",
        requirements: [
          "Lise diploması (min. 60/100 ortalama)",
          `Almanca B1 seviyesi ${germanScore < 3 ? "(henüz yok - hazırlanmanız gerekiyor)" : "(var)"}`,
          "Aufnahmetest (giriş sınavı) başarısı",
        ],
        duration: "1 yıl (2 dönem)",
        cost: "Ücretsiz (sadece Semesterbeitrag ~150-350€/dönem)",
        nextSteps: [
          germanScore < 3 ? "Almanca B1 seviyesine ulaşın" : "B1 sertifikanızı hazırlayın",
          "T-Kurs (teknik), M-Kurs (tıp), W-Kurs (işletme) veya G-Kurs (beşeri) arasında seçim yapın",
          "Studienkolleg başvuru tarihlerini kontrol edin (Kış: 15 Temmuz, Yaz: 15 Ocak)",
        ],
        href: "/programs",
        highlight: "Üniversiteye giden en güvenilir yol",
      });
    }

    // ─── Lisans (Bachelor) ───
    if (isHighSchool && (goal === "university" || goal === "career")) {
      let match = 88;
      if (germanScore >= 5) match += 8; // C1 var, doğrudan başvurabilir
      if (germanScore < 3) match -= 10;
      if (education === "highschoolOpen") match -= 5;
      results.push({
        name: "Lisans (Bachelor)",
        icon: BookOpen,
        match: Math.min(100, Math.max(0, match)),
        description:
          "Almanya'nın dünyaca ünlü devlet üniversitelerinde 3-4 yıllık ücretsiz lisans eğitimi. Studienkolleg sonrası veya yüksek notla doğrudan başvuru imkanı.",
        requirements: [
          "Studienkolleg + FSP sınavı VEYA yüksek not ortalamalı lise diploması",
          `Almanca C1 (TestDaF 4×4 veya DSH-2) ${germanScore >= 5 ? "(var)" : "(henüz yok)"}`,
          "Sperrkonto: 11.904€/yıl (2026)",
        ],
        duration: "3-4 yıl (6-8 dönem)",
        cost: "Devlet üniversiteleri ücretsiz (BW eyaletinde 1.500€/dönem)",
        nextSteps: [
          "Önce Studienkolleg'i tamamlayın (FSP sınavı ile bitirme)",
          "TestDaF veya DSH sınavına hazırlanın",
          "uni-assist üzerinden hedef üniversitelere başvurun",
        ],
        href: "/programs",
        highlight: germanScore >= 5 ? "Dil seviyeniz yeterli - doğrudan başvurabilirsiniz" : undefined,
      });
    }

    // ─── Yüksek Lisans (Master) - EN YÜKSEK ÖNCELİK lisans mezunları için ───
    if (hasBachelors && goal !== "ausbildung" && goal !== "language") {
      let match = 95; // Lisans mezunu için en güçlü öneri
      if (germanScore >= 4 || germanScore === 0) match += 3; // B2+ veya İngilizce program
      if (education === "masters") match -= 15; // Zaten master var, ikinci master daha az mantıklı
      if (isUniStudent) match -= 5; // Henüz mezun değil
      if (ageNum > 35) match -= 5;
      results.push({
        name: "Yüksek Lisans (Master)",
        icon: Award,
        match: Math.min(100, Math.max(0, match)),
        description:
          "Almanya'da 2 yıllık ücretsiz yüksek lisans eğitimi. 1.800+ İngilizce program seçeneği. Türk lisans diplomasıyla doğrudan başvuru. DAAD ve Deutschlandstipendium burs imkanları.",
        requirements: [
          `Lisans diploması ${isUniStudent ? "(devam ediyor - mezuniyet sonrası başvurabilirsiniz)" : "(var)"}`,
          `İngilizce (IELTS 6.5+ / TOEFL 90+) veya Almanca C1 ${germanScore >= 5 ? "(var)" : germanScore === 0 ? "(İngilizce programlar mevcut)" : "(henüz yok)"}`,
          "Sperrkonto: 11.904€/yıl (2026)",
          "Motivasyon mektubu + CV + 2 referans mektubu",
        ],
        duration: "1.5-2 yıl (3-4 dönem)",
        cost: "Devlet üniversiteleri ücretsiz (BW eyaletinde 1.500€/dönem)",
        nextSteps: [
          "İngilizce veya Almanca program tercihi yapın",
          "DAAD burs başvurusunu değerlendirin (son tarih: genellikle Ekim-Kasım)",
          "uni-assist veya doğrudan üniversite portalı üzerinden başvurun",
        ],
        href: "/programs",
        highlight: education === "bachelors"
          ? "Profiliniz için en güçlü öneri"
          : isUniStudent
            ? "Mezuniyetiniz sonrası en uygun program"
            : undefined,
      });
    }

    // ─── Ausbildung - lisans/master'a göre daha düşük öncelik ───
    if (goal === "ausbildung") {
      let match = 80;
      if (germanScore >= 3) match += 5;
      if (germanScore < 2) match -= 20;
      if (ageNum > 35) match -= 15;
      // Lisans/master mezunlarında ausbildung daha az önerilir
      if (education === "bachelors") match -= 20;
      if (education === "masters") match -= 25;
      if (isUniStudent) match -= 15;
      results.push({
        name: "Ausbildung (Mesleki Eğitim)",
        icon: Wrench,
        match: Math.min(100, Math.max(0, match)),
        description:
          "2-3.5 yıllık maaşlı mesleki eğitim. Haftada 2 gün okul + 3 gün işyeri. 300+ meslek dalı. Eğitim sırasında aylık 800-1.200€ maaş.",
        requirements: [
          "Lise diploması (herhangi bir tür yeterli)",
          `Almanca B1-B2 ${germanScore >= 3 ? "(var)" : "(henüz yok - hazırlanmanız gerekiyor)"}`,
          "İşveren ile eğitim sözleşmesi (Ausbildungsvertrag)",
        ],
        duration: "2-3.5 yıl",
        cost: "Ücretsiz + Aylık 800-1.200€ maaş (işveren sigortanızı karşılar)",
        nextSteps: [
          germanScore < 3 ? "Almanca B1 seviyesine ulaşın" : "Almanca seviyenizi B2'ye yükseltin",
          "İlgilendiğiniz meslek dalını belirleyin (IT, sağlık, mekatronik, otelcilik vb.)",
          "Firma eşleştirme sürecini danışmanlarımızla başlatın",
        ],
        href: "/programs",
        highlight: "Hem eğitim alın hem para kazanın",
      });
    }

    // ─── Almanca Dil Kursu (destek programı, ana hedef değil) ───
    if (germanScore < 4) {
      let match = 60; // Temel olarak destek programı
      if (germanScore === 0) match = 75;
      if (germanScore >= 3) match = 40; // B1 zaten var, dil kursu çok gerekli değil
      if (goal === "language") match = 95; // Sadece dil öğrenmek istiyorsa ana öneri
      results.push({
        name: "Almanca Dil Kursu",
        icon: Languages,
        match: Math.min(100, Math.max(0, match)),
        description:
          "Almanya'daki eğitiminize hazırlık için Almanca dil kursu. A1'den C1'e kadar tüm seviyelerde yoğun eğitim. TestDaF, DSH ve TELC sınavlarına hazırlık.",
        requirements: [
          "Herhangi bir ön koşul yok (A1'den başlanabilir)",
          "Almanya'da kurs için dil kursu vizesi gerekebilir",
        ],
        duration: "3-12 ay (seviyeye göre)",
        cost: "Türkiye: ~₺15.000-25.000/seviye | Almanya: 500-800€/ay",
        nextSteps: [
          "Mevcut Almanca seviyenizi tespit ettirin",
          "Yoğun (intensiv) veya standart kurs arasında seçim yapın",
          "Hedef sınavınızı belirleyin (TestDaF, DSH veya TELC)",
        ],
        href: "/programs",
        highlight:
          germanScore === 0
            ? "Almanya eğitimine ilk adım: Almanca öğrenin"
            : goal === "language"
              ? "Size uygun program"
              : "Diğer programlara hazırlık için önerilen",
      });
    }

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
              { value: "highschoolRegular", label: "Lise Mezunu (Örgün)", desc: "Örgün lise diplomam var" },
              { value: "highschoolOpen", label: "Lise Mezunu (Açık Öğretim)", desc: "Açık öğretim lise diplomam var" },
              { value: "uniStudent", label: "Üniversite Öğrencisi", desc: "Henüz lisans eğitimim devam ediyor" },
              { value: "bachelors", label: "Lisans Mezunu", desc: "Üniversite diplomam var" },
              { value: "masters", label: "Yüksek Lisans Mezunu", desc: "Master / YL diplomam var" },
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
              { value: "university", label: "Üniversite Eğitimi", desc: "Lisans veya Yüksek Lisans" },
              { value: "career", label: "Kariyer & Çalışma", desc: "Almanya'da kariyer yapmak" },
              { value: "ausbildung", label: "Mesleki Eğitim (Ausbildung)", desc: "Maaşlı meslek eğitimi" },
              { value: "language", label: "Dil Öğrenme", desc: "Sadece Almanca öğrenmek istiyorum" },
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
              { value: "18-22", label: "18-22", desc: "Yeni mezun" },
              { value: "23-27", label: "23-27", desc: "Üniversite çağı" },
              { value: "28-34", label: "28-34", desc: "Genç profesyonel" },
              { value: "35+", label: "35+", desc: "Deneyimli profesyonel" },
            ]}
            selected={formData.age}
            onSelect={(v) => selectOption("age", v)}
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
              key={rec.name}
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
                          ) : req.includes("(henüz yok") || req.includes("(devam ediyor") ? (
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

          {/* Roadmap & CTA */}
          <div className="space-y-4 pt-2">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Route className="h-5 w-5 text-primary" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <p className="font-semibold text-sm">Tüm sürecin adımlarını öğrenin</p>
                  <p className="text-xs text-muted-foreground">
                    Belgelerden vizeye, kabul mektubundan Almanya&apos;ya yerleşime kadar.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="shrink-0">
                  <Link href="/roadmap">
                    Yol Haritası
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <p className="font-semibold text-sm">Sonucunuzu uzmanlarımızla değerlendirin</p>
                  <p className="text-xs text-muted-foreground">
                    Size özel eğitim planı oluşturmak için ücretsiz danışmanlık alın.
                  </p>
                </div>
                <Button size="sm" className="shrink-0" onClick={open}>
                  Ücretsiz Danışmanlık
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center pt-2">
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
