import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@shipit/ui";
import { ArrowRight, Phone } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  image?: string;
}

export function Hero({
  title,
  subtitle,
  description,
  ctaText = "Iletisime Gec",
  ctaHref = "/contact",
  secondaryCtaText = "Bizi Arayin",
  secondaryCtaHref = "tel:+905551234567",
  image,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="space-y-6">
            <p className="animate-fade-in text-sm font-semibold uppercase tracking-wider text-primary">
              {subtitle}
            </p>
            <h1 className="animate-fade-in font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl [animation-delay:100ms]">
              {title}
            </h1>
            <p className="animate-fade-in max-w-lg text-lg text-muted-foreground [animation-delay:200ms]">
              {description}
            </p>
            <div className="animate-fade-in flex flex-col sm:flex-row gap-4 [animation-delay:300ms]">
              <Button asChild size="lg" className="group">
                <Link href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={secondaryCtaHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  {secondaryCtaText}
                </a>
              </Button>
            </div>
          </div>

          {image && (
            <div className="animate-scale-in relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] hover:shadow-3xl">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
