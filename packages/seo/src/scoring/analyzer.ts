import type { SeoAnalysis, SeoCheckResult, SeoInput } from "./types";
import {
  checkTitleLength,
  checkKeywordInTitle,
  checkDescriptionLength,
  checkKeywordInDescription,
  checkContentLength,
  checkKeywordDensity,
  checkKeywordInFirstParagraph,
  checkSentenceLength,
  checkHeadingStructure,
  checkKeywordInHeadings,
  checkInternalLinks,
  checkImageAltText,
  checkKeywordInSlug,
  checkSlugLength,
} from "./checks";

// Check weights for overall score calculation
const WEIGHTS: Record<string, number> = {
  "title-length": 12,
  "keyword-title": 10,
  "desc-length": 8,
  "keyword-desc": 8,
  "content-length": 12,
  "keyword-density": 10,
  "keyword-first-para": 6,
  "sentence-length": 8,
  "heading-structure": 6,
  "keyword-headings": 5,
  "internal-links": 5,
  "image-alt": 4,
  "keyword-slug": 4,
  "slug-length": 2,
};

export function analyzeSeo(input: SeoInput): SeoAnalysis {
  const {
    focusKeyword = "",
    metaTitle = "",
    metaDescription = "",
    slug = "",
    content = "",
    headings = [],
    links = [],
    images = [],
    wordCount,
  } = input;

  const actualWordCount =
    wordCount ?? (content ? content.trim().split(/\s+/).filter(Boolean).length : 0);

  const checks: SeoCheckResult[] = [
    // Title
    checkTitleLength(metaTitle),
    checkKeywordInTitle(metaTitle, focusKeyword),
    // Description
    checkDescriptionLength(metaDescription),
    checkKeywordInDescription(metaDescription, focusKeyword),
    // Content
    checkContentLength(actualWordCount),
    checkKeywordDensity(content, focusKeyword),
    checkKeywordInFirstParagraph(content, focusKeyword),
    // Readability
    checkSentenceLength(content),
    // Structure
    checkHeadingStructure(headings),
    checkKeywordInHeadings(headings, focusKeyword),
    // Links
    checkInternalLinks(links),
    // Images
    checkImageAltText(images),
    // Slug
    checkKeywordInSlug(slug, focusKeyword),
    checkSlugLength(slug),
  ];

  // Calculate weighted overall score
  let totalWeight = 0;
  let weightedSum = 0;
  for (const check of checks) {
    const weight = WEIGHTS[check.id] || 1;
    totalWeight += weight;
    weightedSum += check.score * weight;
  }
  const overallScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

  const summary = {
    good: checks.filter((c) => c.status === "good").length,
    improvement: checks.filter((c) => c.status === "improvement").length,
    poor: checks.filter((c) => c.status === "poor").length,
  };

  return { overallScore, checks, summary };
}
