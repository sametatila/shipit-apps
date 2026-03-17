"use client";

import { Button } from "@shipit/ui";
import { Check } from "lucide-react";
import { cn } from "@shipit/ui";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useContactModal } from "@/contexts/contact-modal-context";

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

interface PricingProps {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}

export function Pricing({ title, subtitle, plans }: PricingProps) {
  const { ref, isVisible } = useScrollReveal();
  const { open } = useContactModal();

  return (
    <section className="py-20 md:py-28">
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
          className={cn(
            "grid gap-8 md:grid-cols-3 max-w-6xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                plan.popular && "border-primary shadow-lg scale-105 md:scale-110"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    En Popüler
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "default" : "outline"}
                className="w-full"
                size="lg"
                onClick={open}
              >
                {plan.ctaText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
