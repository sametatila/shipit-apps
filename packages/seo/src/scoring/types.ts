export type SeoStatus = "good" | "improvement" | "poor";

export interface SeoCheckResult {
  id: string;
  label: string;
  status: SeoStatus;
  message: string;
  score: number; // 0-100
}

export interface SeoAnalysis {
  overallScore: number; // 0-100
  checks: SeoCheckResult[];
  summary: {
    good: number;
    improvement: number;
    poor: number;
  };
}

export interface SeoInput {
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  content?: string; // plain text (extracted from Lexical or provided directly)
  headings?: { level: number; text: string }[];
  links?: { url: string; text: string; isInternal: boolean }[];
  images?: { src: string; altText: string | null }[];
  wordCount?: number;
  paragraphCount?: number;
}
