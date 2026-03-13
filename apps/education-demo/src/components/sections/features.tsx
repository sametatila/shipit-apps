"use client";

import {
  Shield,
  Clock,
  Star,
  Users,
  Award,
  HeartHandshake,
  Wrench,
  Palette,
  Lightbulb,
  BarChart3,
  Settings,
  Headphones,
  Zap,
  Globe,
  Lock,
  GraduationCap,
  BookOpen,
  Languages,
  Target,
  Brain,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@shipit/ui";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Clock,
  Star,
  Users,
  Award,
  HeartHandshake,
  Wrench,
  Palette,
  Lightbulb,
  BarChart3,
  Settings,
  Headphones,
  Zap,
  Globe,
  Lock,
  GraduationCap,
  BookOpen,
  Languages,
  Target,
  Brain,
  Monitor,
};

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export function Features({ title, subtitle, features }: FeaturesProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {subtitle && (
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              {subtitle}
            </p>
          )}
          <h2 className="font-heading text-3xl font-bold md:text-4xl">{title}</h2>
        </div>
        <div
          ref={ref}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? Star;
            return (
              <div
                key={index}
                className={cn(
                  "group rounded-xl border bg-card p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
