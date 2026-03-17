"use client";

import { cn } from "@shipit/ui";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Stat {
  value: string;
  suffix?: string;
  label: string;
}

interface StatsProps {
  title?: string;
  stats: Stat[];
}

export function Stats({ title, stats }: StatsProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="font-heading text-3xl font-bold text-center mb-12 md:text-4xl">{title}</h2>
        )}
        <div
          ref={ref}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "text-center transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl text-primary">
                {stat.value}
                {stat.suffix && <span className="text-[hsl(var(--accent))]">{stat.suffix}</span>}
              </div>
              <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-[hsl(var(--accent))]" />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
