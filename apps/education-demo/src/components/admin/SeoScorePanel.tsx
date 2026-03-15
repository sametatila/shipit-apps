"use client";

import { useEffect, useState, useCallback } from "react";
import { useField, useFormFields } from "@payloadcms/ui";
import { analyzeSeo } from "@shipit/seo/scoring";
import type { SeoAnalysis, SeoCheckResult, SeoStatus } from "@shipit/seo/scoring";

const STATUS_COLORS: Record<SeoStatus, string> = {
  good: "#22c55e",
  improvement: "#f59e0b",
  poor: "#ef4444",
};

const STATUS_LABELS: Record<SeoStatus, string> = {
  good: "İyi",
  improvement: "Geliştirilebilir",
  poor: "Zayıf",
};

function getScoreColor(score: number): string {
  if (score >= 70) return "#22c55e";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

function ScoreCircle({ score }: { score: number }) {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: "relative", width: 100, height: 100 }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 700, color }}>{score}</span>
        <span style={{ fontSize: 10, color: "#6b7280" }}>/ 100</span>
      </div>
    </div>
  );
}

function CheckItem({ check }: { check: SeoCheckResult }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        padding: "6px 0",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: STATUS_COLORS[check.status],
          flexShrink: 0,
          marginTop: 4,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
          {check.label}
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
          {check.message}
        </div>
      </div>
    </div>
  );
}

export function SeoScorePanel() {
  const [analysis, setAnalysis] = useState<SeoAnalysis | null>(null);

  // Read sibling fields from the seo group
  const focusKeyword = useFormFields(([fields]) => fields["seo.focusKeyword"]?.value as string || "");
  const metaTitle = useFormFields(([fields]) => fields["seo.metaTitle"]?.value as string || "");
  const metaDescription = useFormFields(([fields]) => fields["seo.metaDescription"]?.value as string || "");
  const slug = useFormFields(([fields]) => fields["slug"]?.value as string || "");

  const runAnalysis = useCallback(() => {
    const result = analyzeSeo({
      focusKeyword: focusKeyword || "",
      metaTitle: metaTitle || "",
      metaDescription: metaDescription || "",
      slug: slug || "",
      content: "",
      headings: [],
      links: [],
      images: [],
    });
    setAnalysis(result);
  }, [focusKeyword, metaTitle, metaDescription, slug]);

  useEffect(() => {
    const timer = setTimeout(runAnalysis, 300);
    return () => clearTimeout(timer);
  }, [runAnalysis]);

  if (!analysis) return null;

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#fafafa",
        marginTop: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 16,
        }}
      >
        <ScoreCircle score={analysis.overallScore} />
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
            SEO Puanı
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 8,
              fontSize: 13,
            }}
          >
            <span style={{ color: STATUS_COLORS.good }}>
              ● {analysis.summary.good} İyi
            </span>
            <span style={{ color: STATUS_COLORS.improvement }}>
              ● {analysis.summary.improvement} Geliştir
            </span>
            <span style={{ color: STATUS_COLORS.poor }}>
              ● {analysis.summary.poor} Zayıf
            </span>
          </div>
        </div>
      </div>

      <div>
        {analysis.checks
          .sort((a, b) => {
            const order: Record<SeoStatus, number> = { poor: 0, improvement: 1, good: 2 };
            return order[a.status] - order[b.status];
          })
          .map((check) => (
            <CheckItem key={check.id} check={check} />
          ))}
      </div>
    </div>
  );
}

export default SeoScorePanel;
