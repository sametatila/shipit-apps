"use client";

import { Check, X, Minus, Crown, Star, Zap } from "lucide-react";
import { Button } from "@shipit/ui";
import { Badge } from "@shipit/ui/badge";
import { cn } from "@shipit/ui";
import { useContactModal } from "@/contexts/contact-modal-context";

export interface PackageFeature {
  featureName: string;
  value: string;
}

export interface PackageData {
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  features: PackageFeature[];
  highlights: string[];
  note?: string;
  ctaText: string;
  popular: boolean;
}

const packageIcons: Record<number, typeof Star> = {
  0: Star,
  1: Crown,
  2: Zap,
};

function FeatureValue({ value }: { value: string }) {
  const normalized = value.trim().toLowerCase();

  if (normalized === "dahil") {
    return (
      <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium text-sm">
        <Check className="h-4 w-4" />
        <span className="hidden sm:inline">Dahil</span>
      </span>
    );
  }

  if (normalized === "dahil değil") {
    return (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground/50 text-sm">
        <X className="h-4 w-4" />
        <span className="hidden sm:inline">Dahil değil</span>
      </span>
    );
  }

  if (normalized === "-") {
    return <Minus className="h-4 w-4 text-muted-foreground/40" />;
  }

  // Custom value (number, percentage, specific text)
  return (
    <span className="text-sm font-medium text-foreground">{value}</span>
  );
}

export function PackageComparison({
  packages,
  globalNote,
}: {
  packages: PackageData[];
  globalNote?: string;
}) {
  const { open } = useContactModal();

  // Collect all unique feature names preserving order from first package
  const allFeatureNames: string[] = [];
  for (const pkg of packages) {
    for (const feature of pkg.features) {
      if (!allFeatureNames.includes(feature.featureName)) {
        allFeatureNames.push(feature.featureName);
      }
    }
  }

  // Build lookup: packageSlug -> featureName -> value
  const featureMap = new Map<string, Map<string, string>>();
  for (const pkg of packages) {
    const map = new Map<string, string>();
    for (const f of pkg.features) {
      map.set(f.featureName, f.value);
    }
    featureMap.set(pkg.slug, map);
  }

  const formatPrice = (price: number, currency: string) => {
    if (currency === "EUR") return `${price.toLocaleString("tr-TR")}€`;
    return `₺${price.toLocaleString("tr-TR")}`;
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Hizmet Karşılaştırması
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Üniversite Danışmanlık Paketlerimiz
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            İhtiyacınıza en uygun paketi seçin. Tüm paketlerde %100 Alman devlet üniversitesi kabul garantisi.
          </p>
        </div>

        {/* Desktop: Comparison Table */}
        <div className="hidden lg:block max-w-5xl mx-auto">
          <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
            {/* Header row */}
            <div className="grid border-b" style={{ gridTemplateColumns: `minmax(280px, 1.5fr) repeat(${packages.length}, 1fr)` }}>
              <div className="p-6 bg-muted/30 flex items-end">
                <p className="text-sm font-medium text-muted-foreground">
                  Özellikler
                </p>
              </div>
              {packages.map((pkg, index) => {
                const Icon = packageIcons[index] || Star;
                return (
                  <div
                    key={pkg.slug}
                    className={cn(
                      "p-6 text-center relative",
                      pkg.popular && "bg-primary/5 border-x-2 border-t-2 border-primary"
                    )}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Badge className="bg-primary text-primary-foreground shadow-md px-3">
                          Önerilen
                        </Badge>
                      </div>
                    )}
                    <div className="flex justify-center mb-3">
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        pkg.popular
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="font-heading text-lg font-bold">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{pkg.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Feature rows */}
            {allFeatureNames.map((featureName, rowIndex) => (
              <div
                key={featureName}
                className={cn(
                  "grid border-b last:border-b-0",
                  rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"
                )}
                style={{ gridTemplateColumns: `minmax(280px, 1.5fr) repeat(${packages.length}, 1fr)` }}
              >
                <div className="px-6 py-4 flex items-center">
                  <p className="text-sm text-foreground">{featureName}</p>
                </div>
                {packages.map((pkg) => {
                  const value = featureMap.get(pkg.slug)?.get(featureName) || "-";
                  return (
                    <div
                      key={`${pkg.slug}-${featureName}`}
                      className={cn(
                        "px-6 py-4 flex items-center justify-center",
                        pkg.popular && "bg-primary/5 border-x-2 border-primary"
                      )}
                    >
                      <FeatureValue value={value} />
                    </div>
                  );
                })}
              </div>
            ))}

            {/* CTA row */}
            <div
              className="grid border-t-2"
              style={{ gridTemplateColumns: `minmax(280px, 1.5fr) repeat(${packages.length}, 1fr)` }}
            >
              <div className="p-6 bg-muted/30 flex items-center">
                {globalNote && (
                  <p className="text-xs text-muted-foreground italic">
                    * {globalNote}
                  </p>
                )}
              </div>
              {packages.map((pkg) => (
                <div
                  key={`cta-${pkg.slug}`}
                  className={cn(
                    "p-6 flex items-center justify-center",
                    pkg.popular && "bg-primary/5 border-x-2 border-b-2 border-primary rounded-b-2xl"
                  )}
                >
                  <Button
                    variant={pkg.popular ? "default" : "outline"}
                    className="w-full max-w-[200px]"
                    size="lg"
                    onClick={open}
                  >
                    {pkg.ctaText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Card View */}
        <div className="lg:hidden space-y-6 max-w-md mx-auto">
          {packages.map((pkg, index) => {
            const Icon = packageIcons[index] || Star;
            return (
              <div
                key={pkg.slug}
                className={cn(
                  "relative rounded-2xl border bg-card p-6 shadow-sm transition-all",
                  pkg.popular && "border-primary shadow-lg ring-2 ring-primary/20"
                )}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground shadow-md px-4">
                      Önerilen
                    </Badge>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    pkg.popular
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold">{pkg.name}</h3>
                    <p className="text-xs text-muted-foreground">{pkg.description}</p>
                  </div>
                </div>


                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature.featureName}
                      className="flex items-start justify-between gap-3 text-sm"
                    >
                      <span className="text-muted-foreground flex-1">
                        {feature.featureName}
                      </span>
                      <span className="shrink-0">
                        <FeatureValue value={feature.value} />
                      </span>
                    </li>
                  ))}
                </ul>

                {pkg.note && (
                  <p className="text-xs text-muted-foreground italic mb-4 pb-4 border-b">
                    * {pkg.note}
                  </p>
                )}

                <Button
                  variant={pkg.popular ? "default" : "outline"}
                  className="w-full"
                  size="lg"
                  onClick={open}
                >
                  {pkg.ctaText}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Global note for mobile */}
        {globalNote && (
          <div className="lg:hidden mt-6 text-center">
            <p className="text-xs text-muted-foreground italic">
              * {globalNote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
