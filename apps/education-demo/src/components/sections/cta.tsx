"use client";

import { Button } from "@shipit/ui";
import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/contexts/contact-modal-context";

interface CTAProps {
  title: string;
  description: string;
  buttonText?: string;
}

export function CTA({
  title,
  description,
  buttonText = "Hemen Başlayalım",
}: CTAProps) {
  const { open } = useContactModal();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-primary" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary-foreground)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary-foreground)/0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
          {description}
        </p>
        <Button size="lg" variant="secondary" className="mt-8 group" onClick={open}>
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
