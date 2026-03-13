"use client";

import { Shield, Award, Clock, ThumbsUp, type LucideIcon } from "lucide-react";
import { cn } from "@shipit/ui";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface TrustBadge {
  icon: LucideIcon;
  label: string;
}

interface TrustBadgesProps {
  badges?: TrustBadge[];
  title?: string;
}

const defaultBadges: TrustBadge[] = [
  { icon: Shield, label: "Güvenli Ödeme" },
  { icon: Award, label: "Kalite Garantisi" },
  { icon: Clock, label: "7/24 Destek" },
  { icon: ThumbsUp, label: "Müşteri Memnuniyeti" },
];

export function TrustBadges({ badges = defaultBadges, title }: TrustBadgesProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-16 border-y bg-muted/20">
      <div className="container mx-auto px-4">
        {title && (
          <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider">
            {title}
          </p>
        )}
        <div
          ref={ref}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {badges.map((badge, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center gap-2 transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="rounded-full bg-primary/10 p-3">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
