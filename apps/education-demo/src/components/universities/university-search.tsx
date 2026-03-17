"use client";

import { useState, useMemo } from "react";
import { Badge } from "@shipit/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@shipit/ui/card";
import { Button } from "@shipit/ui";
import { Link } from "@/i18n/navigation";
import { useContactModal } from "@/contexts/contact-modal-context";
import {
  Search,
  MapPin,
  Users,
  Globe,
  Trophy,
  Euro,
  GraduationCap,
  Building2,
  LayoutGrid,
  LayoutList,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Calendar,
  CheckCircle,
  Filter,
  ArrowUpDown,
  FileText,
  Handshake,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface UniversityProgram {
  name: string;
  degree?: "bachelor" | "master" | null;
  language?: "de" | "en" | "de-en" | null;
  id?: string | null;
}

export interface UniversityData {
  id: number;
  name: string;
  slug: string;
  city: string;
  bundesland?: string | null;
  type?: string | null;
  founded?: number | null;
  shortDescription?: string | null;
  websiteUrl?: string | null;
  ranking?: { qsWorld?: number | null; theWorld?: number | null } | null;
  stats?: {
    totalStudents?: number | null;
    internationalPercent?: number | null;
    semesterFee?: string | null;
  } | null;
  conditionalAcceptance?: string | null;
  conditionalAcceptanceLevel?: string | null;
  studienkolleg?: boolean | null;
  applicationDeadlines?: {
    winterSemester?: string | null;
    summerSemester?: string | null;
  } | null;
  programs?: UniversityProgram[] | null;
  isPartner?: boolean | null;
  blogSlug?: string | null;
}

interface UniversitySearchProps {
  universities: UniversityData[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TYPE_LABELS: Record<string, string> = {
  "public-uni": "Devlet Üniversitesi",
  tu: "Teknik Üniversite",
  fh: "Fachhochschule",
  private: "Özel Üniversite",
  art: "Sanat / Müzik",
};

const TYPE_COLORS: Record<string, string> = {
  "public-uni": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  tu: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
  fh: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  private: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  art: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
};

const BUNDESLAND_LABELS: Record<string, string> = {
  "baden-wuerttemberg": "Baden-Württemberg",
  bayern: "Bayern",
  berlin: "Berlin",
  brandenburg: "Brandenburg",
  bremen: "Bremen",
  hamburg: "Hamburg",
  hessen: "Hessen",
  "mecklenburg-vorpommern": "Mecklenburg-Vorpommern",
  niedersachsen: "Niedersachsen",
  "nordrhein-westfalen": "Nordrhein-Westfalen",
  "rheinland-pfalz": "Rheinland-Pfalz",
  saarland: "Saarland",
  sachsen: "Sachsen",
  "sachsen-anhalt": "Sachsen-Anhalt",
  "schleswig-holstein": "Schleswig-Holstein",
  thueringen: "Thüringen",
};

const DEGREE_LABELS: Record<string, string> = {
  bachelor: "Lisans",
  master: "Yüksek Lisans",
};

const LANGUAGE_LABELS: Record<string, string> = {
  de: "Almanca",
  en: "İngilizce",
  "de-en": "Almanca & İngilizce",
};

const ACCEPTANCE_LEVEL_LABELS: Record<string, string> = {
  none: "Sıfır Almanca",
  a1: "A1",
  a2: "A2",
  b1: "B1",
  b2: "B2",
  c1: "C1",
};

type SortOption = "ranking" | "name-asc" | "name-desc" | "students" | "international";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "ranking", label: "QS Sıralaması" },
  { value: "name-asc", label: "İsim (A-Z)" },
  { value: "name-desc", label: "İsim (Z-A)" },
  { value: "students", label: "Öğrenci Sayısı" },
  { value: "international", label: "Uluslararası Oran" },
];

const ITEMS_PER_PAGE = 12;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function UniversitySearch({ universities }: UniversitySearchProps) {
  const { open: openContactModal } = useContactModal();

  // State
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBundeslands, setSelectedBundeslands] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [conditionalAcceptance, setConditionalAcceptance] = useState<string>("");
  const [partnerOnly, setPartnerOnly] = useState(false);
  const [studienkollegOnly, setStudienkollegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("ranking");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    type: true,
    bundesland: false,
    degree: true,
    language: true,
    acceptance: true,
    other: true,
  });

  // Available options from data
  const availableTypes = useMemo(() => {
    const types = new Set(universities.map((u) => u.type).filter(Boolean));
    return Array.from(types) as string[];
  }, [universities]);

  const availableBundeslands = useMemo(() => {
    const lands = new Set(universities.map((u) => u.bundesland).filter(Boolean));
    return (Array.from(lands) as string[]).sort((a, b) =>
      (BUNDESLAND_LABELS[a] ?? a).localeCompare(BUNDESLAND_LABELS[b] ?? b, "tr")
    );
  }, [universities]);

  const availableDegrees = useMemo(() => {
    const degrees = new Set<string>();
    for (const u of universities) {
      for (const p of u.programs ?? []) {
        if (p.degree) degrees.add(p.degree);
      }
    }
    return Array.from(degrees);
  }, [universities]);

  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    for (const u of universities) {
      for (const p of u.programs ?? []) {
        if (p.language) langs.add(p.language);
      }
    }
    return Array.from(langs);
  }, [universities]);

  // Filtering
  const filtered = useMemo(() => {
    let result = [...universities];

    // Text search
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          (u.shortDescription?.toLowerCase().includes(q) ?? false) ||
          (u.programs?.some((p) => p.name.toLowerCase().includes(q)) ?? false)
      );
    }

    // Type filter
    if (selectedTypes.length > 0) {
      result = result.filter((u) => u.type && selectedTypes.includes(u.type));
    }

    // Bundesland filter
    if (selectedBundeslands.length > 0) {
      result = result.filter((u) => u.bundesland && selectedBundeslands.includes(u.bundesland));
    }

    // Degree filter
    if (selectedDegrees.length > 0) {
      result = result.filter((u) =>
        u.programs?.some((p) => p.degree && selectedDegrees.includes(p.degree))
      );
    }

    // Language filter
    if (selectedLanguages.length > 0) {
      result = result.filter((u) =>
        u.programs?.some((p) => p.language && selectedLanguages.includes(p.language))
      );
    }

    // Conditional acceptance
    if (conditionalAcceptance) {
      result = result.filter((u) => u.conditionalAcceptance === conditionalAcceptance);
    }

    // Partner only
    if (partnerOnly) {
      result = result.filter((u) => u.isPartner);
    }

    // Studienkolleg only
    if (studienkollegOnly) {
      result = result.filter((u) => u.studienkolleg);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "ranking": {
          const aRank = a.ranking?.qsWorld ?? 9999;
          const bRank = b.ranking?.qsWorld ?? 9999;
          return aRank - bRank;
        }
        case "name-asc":
          return a.name.localeCompare(b.name, "tr");
        case "name-desc":
          return b.name.localeCompare(a.name, "tr");
        case "students": {
          const aS = a.stats?.totalStudents ?? 0;
          const bS = b.stats?.totalStudents ?? 0;
          return bS - aS;
        }
        case "international": {
          const aI = a.stats?.internationalPercent ?? 0;
          const bI = b.stats?.internationalPercent ?? 0;
          return bI - aI;
        }
        default:
          return 0;
      }
    });

    return result;
  }, [
    universities,
    search,
    selectedTypes,
    selectedBundeslands,
    selectedDegrees,
    selectedLanguages,
    conditionalAcceptance,
    partnerOnly,
    studienkollegOnly,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedResults = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Active filter count
  const activeFilterCount =
    selectedTypes.length +
    selectedBundeslands.length +
    selectedDegrees.length +
    selectedLanguages.length +
    (conditionalAcceptance ? 1 : 0) +
    (partnerOnly ? 1 : 0) +
    (studienkollegOnly ? 1 : 0);

  function clearAllFilters() {
    setSearch("");
    setSelectedTypes([]);
    setSelectedBundeslands([]);
    setSelectedDegrees([]);
    setSelectedLanguages([]);
    setConditionalAcceptance("");
    setPartnerOnly(false);
    setStudienkollegOnly(false);
    setCurrentPage(1);
  }

  function toggleArrayFilter(arr: string[], value: string, setter: (v: string[]) => void) {
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
    setCurrentPage(1);
  }

  function toggleSection(key: string) {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  /* ---------------------------------------------------------------- */
  /*  Filter Sidebar                                                   */
  /* ---------------------------------------------------------------- */

  const filterSidebar = (
    <div className="space-y-1">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Üniversite veya program ara..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-lg border bg-background px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
        {search && (
          <button
            onClick={() => { setSearch(""); setCurrentPage(1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Active Filters + Clear */}
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between pt-3">
          <span className="text-xs text-muted-foreground">
            {activeFilterCount} filtre aktif
          </span>
          <button
            onClick={clearAllFilters}
            className="text-xs text-primary hover:underline font-medium"
          >
            Tümünü Temizle
          </button>
        </div>
      )}

      {/* Üniversite Türü */}
      <FilterSection
        title="Üniversite Türü"
        icon={<Building2 className="h-4 w-4" />}
        expanded={expandedSections.type}
        onToggle={() => toggleSection("type")}
      >
        {availableTypes.map((type) => (
          <FilterCheckbox
            key={type}
            label={TYPE_LABELS[type] ?? type}
            checked={selectedTypes.includes(type)}
            onChange={() => toggleArrayFilter(selectedTypes, type, setSelectedTypes)}
            count={universities.filter((u) => u.type === type).length}
          />
        ))}
      </FilterSection>

      {/* Eyalet */}
      <FilterSection
        title="Eyalet"
        icon={<MapPin className="h-4 w-4" />}
        expanded={expandedSections.bundesland}
        onToggle={() => toggleSection("bundesland")}
      >
        {availableBundeslands.map((land) => (
          <FilterCheckbox
            key={land}
            label={BUNDESLAND_LABELS[land] ?? land}
            checked={selectedBundeslands.includes(land)}
            onChange={() => toggleArrayFilter(selectedBundeslands, land, setSelectedBundeslands)}
            count={universities.filter((u) => u.bundesland === land).length}
          />
        ))}
      </FilterSection>

      {/* Program Derecesi */}
      <FilterSection
        title="Program Derecesi"
        icon={<GraduationCap className="h-4 w-4" />}
        expanded={expandedSections.degree}
        onToggle={() => toggleSection("degree")}
      >
        {availableDegrees.map((degree) => (
          <FilterCheckbox
            key={degree}
            label={DEGREE_LABELS[degree] ?? degree}
            checked={selectedDegrees.includes(degree)}
            onChange={() => toggleArrayFilter(selectedDegrees, degree, setSelectedDegrees)}
            count={universities.filter((u) => u.programs?.some((p) => p.degree === degree)).length}
          />
        ))}
      </FilterSection>

      {/* Eğitim Dili */}
      <FilterSection
        title="Eğitim Dili"
        icon={<Globe className="h-4 w-4" />}
        expanded={expandedSections.language}
        onToggle={() => toggleSection("language")}
      >
        {availableLanguages.map((lang) => (
          <FilterCheckbox
            key={lang}
            label={LANGUAGE_LABELS[lang] ?? lang}
            checked={selectedLanguages.includes(lang)}
            onChange={() => toggleArrayFilter(selectedLanguages, lang, setSelectedLanguages)}
            count={universities.filter((u) => u.programs?.some((p) => p.language === lang)).length}
          />
        ))}
      </FilterSection>

      {/* Şartlı Kabul & Diğer */}
      <FilterSection
        title="Kabul & Özellikler"
        icon={<CheckCircle className="h-4 w-4" />}
        expanded={expandedSections.acceptance}
        onToggle={() => toggleSection("acceptance")}
      >
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Şartlı Kabul</label>
          <select
            value={conditionalAcceptance}
            onChange={(e) => { setConditionalAcceptance(e.target.value); setCurrentPage(1); }}
            className="w-full rounded-md border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Tümü</option>
            <option value="yes">Şartlı Kabul Var</option>
            <option value="no">Şartlı Kabul Yok</option>
          </select>
        </div>
        <div className="mt-3 space-y-2">
          <FilterCheckbox
            label="Sadece Partner Üniversiteler"
            checked={partnerOnly}
            onChange={() => { setPartnerOnly(!partnerOnly); setCurrentPage(1); }}
            icon={<Handshake className="h-3.5 w-3.5" />}
          />
          <FilterCheckbox
            label="Studienkolleg Mevcut"
            checked={studienkollegOnly}
            onChange={() => { setStudienkollegOnly(!studienkollegOnly); setCurrentPage(1); }}
            icon={<BookOpen className="h-3.5 w-3.5" />}
          />
        </div>
      </FilterSection>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="container mx-auto px-4 pb-20">
      {/* Toolbar: Sort + View + Mobile Filter Toggle */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> üniversite bulundu
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <Filter className="h-4 w-4 mr-1" />
            Filtreler
            {activeFilterCount > 0 && (
              <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          {/* Sort */}
          <div className="flex items-center gap-1">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-md border bg-background px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* View toggle */}
          <div className="hidden sm:flex items-center border rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {mobileFiltersOpen && (
        <div className="lg:hidden mb-6 p-4 border rounded-lg bg-card">
          {filterSidebar}
        </div>
      )}

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            {filterSidebar}
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {paginatedResults.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Sonuç Bulunamadı</h3>
              <p className="text-muted-foreground mt-1">
                Arama kriterlerinize uygun üniversite bulunamadı. Filtreleri değiştirmeyi deneyin.
              </p>
              <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
                Filtreleri Temizle
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedResults.map((uni) => (
                <UniversityCard key={uni.id} university={uni} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedResults.map((uni) => (
                <UniversityListItem key={uni.id} university={uni} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Önceki
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    if (totalPages <= 7) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (Math.abs(page - currentPage) <= 1) return true;
                    return false;
                  })
                  .map((page, idx, arr) => {
                    const showEllipsis = idx > 0 && page - arr[idx - 1] > 1;
                    return (
                      <span key={page} className="flex items-center">
                        {showEllipsis && <span className="px-1 text-muted-foreground">...</span>}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          {page}
                        </button>
                      </span>
                    );
                  })}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Sonraki
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FilterSection({
  title,
  icon,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b py-3">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          {icon}
          {title}
        </span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {expanded && <div className="mt-3 space-y-1.5">{children}</div>}
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
  count,
  icon,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
  icon?: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="rounded border-gray-300 text-primary focus:ring-primary/20 h-3.5 w-3.5"
      />
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
        {label}
      </span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground/60">{count}</span>
      )}
    </label>
  );
}

function UniversityCard({ university: uni }: { university: UniversityData }) {
  const { open: openContactModal } = useContactModal();
  const programCount = uni.programs?.length ?? 0;
  const degrees = new Set(uni.programs?.map((p) => p.degree).filter(Boolean));
  const languages = new Set(uni.programs?.map((p) => p.language).filter(Boolean));

  return (
    <Card className="group relative flex flex-col transition-all hover:shadow-lg hover:-translate-y-0.5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {uni.type && (
              <Badge variant="secondary" className={`text-[11px] ${TYPE_COLORS[uni.type] ?? ""}`}>
                {TYPE_LABELS[uni.type] ?? uni.type}
              </Badge>
            )}
            {uni.isPartner && (
              <Badge className="text-[11px] bg-primary/10 text-primary border-primary/20">
                <Handshake className="h-3 w-3 mr-0.5" />
                Partner
              </Badge>
            )}
          </div>
          {uni.ranking?.qsWorld && (
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
              <Trophy className="h-3.5 w-3.5" />
              #{uni.ranking.qsWorld}
            </div>
          )}
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-3 mt-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-lg font-bold shrink-0">
            {uni.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <CardTitle className="text-base leading-snug line-clamp-2">{uni.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" />
              {uni.city}
              {uni.bundesland && `, ${BUNDESLAND_LABELS[uni.bundesland] ?? uni.bundesland}`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-2.5 pb-3">
        {uni.stats?.totalStudents && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span>{uni.stats.totalStudents.toLocaleString("tr-TR")} öğrenci</span>
          </div>
        )}
        {uni.stats?.internationalPercent != null && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span>%{uni.stats.internationalPercent} uluslararası</span>
          </div>
        )}
        {uni.stats?.semesterFee && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Euro className="h-3.5 w-3.5 shrink-0" />
            <span>{uni.stats.semesterFee}</span>
          </div>
        )}
        {programCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
            <span>{programCount} program</span>
          </div>
        )}
        {uni.conditionalAcceptance === "yes" && (
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="h-3.5 w-3.5 shrink-0" />
            <span>
              Şartlı kabul
              {uni.conditionalAcceptanceLevel && (
                <> ({ACCEPTANCE_LEVEL_LABELS[uni.conditionalAcceptanceLevel] ?? uni.conditionalAcceptanceLevel})</>
              )}
            </span>
          </div>
        )}
        {uni.studienkolleg && (
          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
            <BookOpen className="h-3.5 w-3.5 shrink-0" />
            <span>Studienkolleg mevcut</span>
          </div>
        )}

        {/* Language + Degree Badges */}
        <div className="flex flex-wrap gap-1 pt-1">
          {Array.from(degrees).map((d) => (
            <Badge key={d} variant="outline" className="text-[10px] px-1.5 py-0">
              {DEGREE_LABELS[d!] ?? d}
            </Badge>
          ))}
          {Array.from(languages).map((l) => (
            <Badge key={l} variant="outline" className="text-[10px] px-1.5 py-0">
              {LANGUAGE_LABELS[l!] ?? l}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        {uni.blogSlug ? (
          <Button asChild variant="default" size="sm" className="flex-1">
            <Link href={`/blog/${uni.blogSlug}`}>
              <FileText className="h-3.5 w-3.5 mr-1" />
              Rehber
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/universities/${uni.slug}`}>
              Detay
            </Link>
          </Button>
        )}
        <Button variant="outline" size="sm" className="flex-1" onClick={openContactModal}>
          Danışmanlık Al
        </Button>
      </CardFooter>
    </Card>
  );
}

function UniversityListItem({ university: uni }: { university: UniversityData }) {
  const { open: openContactModal } = useContactModal();
  const programCount = uni.programs?.length ?? 0;

  return (
    <Card className="group transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        {/* Avatar */}
        <div className="flex items-center justify-center sm:w-20 sm:shrink-0 p-4 sm:p-6">
          <div className="h-14 w-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
            {uni.name.charAt(0)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:py-4 sm:px-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold">{uni.name}</h3>
                {uni.ranking?.qsWorld && (
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Trophy className="h-3 w-3" />#{uni.ranking.qsWorld}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" />
                {uni.city}
                {uni.bundesland && `, ${BUNDESLAND_LABELS[uni.bundesland] ?? uni.bundesland}`}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              {uni.blogSlug ? (
                <Button asChild variant="default" size="sm">
                  <Link href={`/blog/${uni.blogSlug}`}>
                    <FileText className="h-3.5 w-3.5 mr-1" />
                    Rehber
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="sm">
                  <Link href={`/universities/${uni.slug}`}>Detay</Link>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={openContactModal}>
                Danışmanlık
              </Button>
            </div>
          </div>

          {/* Info Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
            {uni.type && (
              <Badge variant="secondary" className={`text-[11px] ${TYPE_COLORS[uni.type] ?? ""}`}>
                {TYPE_LABELS[uni.type] ?? uni.type}
              </Badge>
            )}
            {uni.isPartner && (
              <Badge className="text-[11px] bg-primary/10 text-primary border-primary/20">
                <Handshake className="h-3 w-3 mr-0.5" />
                Partner
              </Badge>
            )}
            {uni.stats?.totalStudents && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {uni.stats.totalStudents.toLocaleString("tr-TR")}
              </span>
            )}
            {uni.stats?.internationalPercent != null && (
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                %{uni.stats.internationalPercent}
              </span>
            )}
            {uni.stats?.semesterFee && (
              <span className="flex items-center gap-1">
                <Euro className="h-3.5 w-3.5" />
                {uni.stats.semesterFee}
              </span>
            )}
            {programCount > 0 && (
              <span className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5" />
                {programCount} program
              </span>
            )}
            {uni.conditionalAcceptance === "yes" && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-3.5 w-3.5" />
                Şartlı kabul
              </span>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="flex sm:hidden items-center gap-2 mt-3">
            {uni.blogSlug ? (
              <Button asChild variant="default" size="sm" className="flex-1">
                <Link href={`/blog/${uni.blogSlug}`}>Rehber</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href={`/universities/${uni.slug}`}>Detay</Link>
              </Button>
            )}
            <Button variant="outline" size="sm" className="flex-1" onClick={openContactModal}>
              Danışmanlık
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
