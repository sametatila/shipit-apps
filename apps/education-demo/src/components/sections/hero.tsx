"use client";

import Image from "next/image";
import { Button } from "@shipit/ui";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useContactModal } from "@/contexts/contact-modal-context";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  image?: string;
}

export function Hero({
  title,
  subtitle,
  description,
  ctaText = "Ücretsiz Danışmanlık",
  secondaryCtaText = "Bizi Arayın",
  secondaryCtaHref,
  image,
}: HeroProps) {
  const { open } = useContactModal();

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        /* Placeholder: gradient background when no image */
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(214,80%,25%)] to-[hsl(214,60%,15%)]" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Accent bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--accent-medium))] to-[hsl(var(--accent))] z-10" />

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Text content */}
          <div className="max-w-2xl space-y-6">
            <p className="animate-fade-in text-sm font-semibold uppercase tracking-wider text-[hsl(var(--accent))]">
              {subtitle}
            </p>
            <h1 className="animate-fade-in font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl [animation-delay:100ms]">
              {title}
            </h1>
            <p className="animate-fade-in max-w-lg text-lg text-white/80 [animation-delay:200ms]">
              {description}
            </p>
            <div className="animate-fade-in flex flex-col sm:flex-row gap-4 [animation-delay:300ms]">
              <Button
                size="lg"
                className="group bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent-medium))] font-semibold shadow-lg shadow-[hsl(var(--accent)/.3)]"
                onClick={open}
              >
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              {secondaryCtaHref && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={secondaryCtaHref}>
                    <Phone className="mr-2 h-4 w-4" />
                    {secondaryCtaText}
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Right side - Eligibility test card */}
          <div
            className="hidden lg:block"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4 w-72 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--accent)/.2)]">
                  <CheckCircle className="h-5 w-5 text-[hsl(var(--accent))]" />
                </div>
                <h3 className="text-white font-semibold text-lg">
                  Ücretsiz Uygunluk Testi
                </h3>
              </div>
              <p className="text-white/70 text-sm">
                2 dakikada profilinize uygun programı öğrenin
              </p>
              <Button
                asChild
                size="sm"
                className="w-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent-medium))] font-semibold"
              >
                <Link href="/eligibility-check">
                  Teste Başla
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
