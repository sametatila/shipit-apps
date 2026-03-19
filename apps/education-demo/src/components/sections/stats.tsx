"use client";

import { useCounterAnimation } from "@/hooks/use-counter-animation";

interface Stat {
  value: string;
  suffix?: string;
  label: string;
}

interface StatsProps {
  title?: string;
  stats: Stat[];
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const numericValue = parseInt(stat.value.replace(/\D/g, ""), 10) || 0;
  const { ref, count } = useCounterAnimation(numericValue, 2000);

  return (
    <div
      ref={ref}
      className="text-center"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl text-primary-foreground">
        {count}
        {stat.suffix && <span className="text-primary-foreground/80">{stat.suffix}</span>}
      </div>
      <p className="mt-3 text-sm text-primary-foreground/70">{stat.label}</p>
    </div>
  );
}

export function Stats({ title, stats }: StatsProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-primary" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary-foreground)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary-foreground)/0.05),transparent_50%)]" />

      <div className="container mx-auto px-4">
        {title && (
          <h2 className="font-heading text-3xl font-bold text-center mb-12 md:text-4xl text-primary-foreground">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
