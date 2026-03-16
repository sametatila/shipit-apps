"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@shipit/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "@/i18n/navigation";

export interface UniversityLogo {
  name: string;
  slug: string;
  abbreviation: string;
  color: string;
  blogSlug: string;
}

const universities: UniversityLogo[] = [
  { name: "Technische Universität München", slug: "tum", abbreviation: "TUM", color: "#0065BD", blogSlug: "technische-universitat-munchen-tum" },
  { name: "Ludwig-Maximilians-Universität München", slug: "lmu", abbreviation: "LMU", color: "#00883A", blogSlug: "ludwig-maximilians-universitat-munchen-lmu" },
  { name: "Universität Heidelberg", slug: "heidelberg", abbreviation: "UHD", color: "#B5121B", blogSlug: "universitat-heidelberg" },
  { name: "RWTH Aachen", slug: "rwth", abbreviation: "RWTH", color: "#00549F", blogSlug: "rwth-aachen" },
  { name: "Freie Universität Berlin", slug: "fu-berlin", abbreviation: "FU", color: "#003366", blogSlug: "freie-universitat-berlin" },
  { name: "Technische Universität Berlin", slug: "tu-berlin", abbreviation: "TUB", color: "#C50E1F", blogSlug: "technische-universitat-berlin" },
  { name: "Humboldt-Universität zu Berlin", slug: "hu-berlin", abbreviation: "HU", color: "#003366", blogSlug: "humboldt-universitat-zu-berlin" },
  { name: "KIT Karlsruhe", slug: "kit", abbreviation: "KIT", color: "#009682", blogSlug: "karlsruher-institut-fur-technologie-kit" },
  { name: "Universität Hamburg", slug: "hamburg", abbreviation: "UHH", color: "#E2001A", blogSlug: "universitat-hamburg" },
  { name: "Universität Freiburg", slug: "freiburg", abbreviation: "UFR", color: "#004A99", blogSlug: "universitat-freiburg" },
  { name: "TU Dresden", slug: "tu-dresden", abbreviation: "TUD", color: "#003D73", blogSlug: "technische-universitat-dresden" },
  { name: "Universität Tübingen", slug: "tuebingen", abbreviation: "UTÜ", color: "#A51E37", blogSlug: "universitat-tubingen" },
  { name: "Universität Göttingen", slug: "goettingen", abbreviation: "UGÖ", color: "#004F8A", blogSlug: "universitat-gottingen" },
  { name: "Universität Bonn", slug: "bonn", abbreviation: "UBN", color: "#004F9F", blogSlug: "universitat-bonn" },
  { name: "Universität Stuttgart", slug: "stuttgart", abbreviation: "UST", color: "#004191", blogSlug: "universitat-stuttgart" },
  { name: "Goethe-Universität Frankfurt", slug: "frankfurt", abbreviation: "GUF", color: "#0054A6", blogSlug: "goethe-universitat-frankfurt" },
  { name: "Universität zu Köln", slug: "koeln", abbreviation: "UzK", color: "#8B0000", blogSlug: "universitat-zu-koln" },
  { name: "TU Darmstadt", slug: "tu-darmstadt", abbreviation: "TUD", color: "#004E8A", blogSlug: "technische-universitat-darmstadt" },
  { name: "Universität Mannheim", slug: "mannheim", abbreviation: "UMA", color: "#003B5C", blogSlug: "universitat-mannheim" },
  { name: "FAU Erlangen-Nürnberg", slug: "fau", abbreviation: "FAU", color: "#003865", blogSlug: "friedrich-alexander-universitat-erlangen-nurnberg" },
];

export function UniversityLogoSlider() {
  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Partner Üniversiteler
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Almanya&apos;nın En Prestijli Üniversiteleri
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Almanya&apos;daki en kaliteli 20 üniversite ile ilgili detaylı bilgilere ulaşın.
            Logoya tıklayarak üniversite hakkında kapsamlı rehberimizi okuyun.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {universities.map((uni) => (
              <CarouselItem
                key={uni.slug}
                className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-[14.28%]"
              >
                <Link href={`/blog/${uni.blogSlug}`} className="block">
                  <div className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 cursor-pointer">
                    <div
                      className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${uni.color}15` }}
                    >
                      <span
                        className="text-sm md:text-base font-bold tracking-tight"
                        style={{ color: uni.color }}
                      >
                        {uni.abbreviation}
                      </span>
                    </div>
                    <p className="text-[11px] md:text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors leading-tight line-clamp-2">
                      {uni.name}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots / Indicators - second row */}
        <div className="mt-8 grid grid-cols-5 sm:grid-cols-10 gap-2 max-w-3xl mx-auto">
          {universities.map((uni) => (
            <Link
              key={uni.slug}
              href={`/blog/${uni.blogSlug}`}
              className="group flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center text-[9px] font-bold transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${uni.color}20`, color: uni.color }}
              >
                {uni.abbreviation}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export { universities };
