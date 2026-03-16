"use client";

import * as React from "react";
import Image from "next/image";
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
  logo: string;
  blogSlug: string;
}

const universities: UniversityLogo[] = [
  { name: "Technische Universität München", slug: "tum", logo: "/images/universities/tum.svg", blogSlug: "technische-universitat-munchen-tum" },
  { name: "Ludwig-Maximilians-Universität München", slug: "lmu", logo: "/images/universities/lmu.svg", blogSlug: "ludwig-maximilians-universitat-munchen-lmu" },
  { name: "Universität Heidelberg", slug: "heidelberg", logo: "/images/universities/heidelberg.svg", blogSlug: "universitat-heidelberg" },
  { name: "RWTH Aachen", slug: "rwth", logo: "/images/universities/rwth.svg", blogSlug: "rwth-aachen" },
  { name: "Freie Universität Berlin", slug: "fu-berlin", logo: "/images/universities/fu-berlin.svg", blogSlug: "freie-universitat-berlin" },
  { name: "Technische Universität Berlin", slug: "tu-berlin", logo: "/images/universities/tu-berlin.svg", blogSlug: "technische-universitat-berlin" },
  { name: "Humboldt-Universität zu Berlin", slug: "hu-berlin", logo: "/images/universities/hu-berlin.svg", blogSlug: "humboldt-universitat-zu-berlin" },
  { name: "KIT Karlsruhe", slug: "kit", logo: "/images/universities/kit.svg", blogSlug: "karlsruher-institut-fur-technologie-kit" },
  { name: "Universität Hamburg", slug: "hamburg", logo: "/images/universities/hamburg.svg", blogSlug: "universitat-hamburg" },
  { name: "Universität Freiburg", slug: "freiburg", logo: "/images/universities/freiburg.svg", blogSlug: "universitat-freiburg" },
  { name: "TU Dresden", slug: "tu-dresden", logo: "/images/universities/tu-dresden.svg", blogSlug: "technische-universitat-dresden" },
  { name: "Universität Tübingen", slug: "tuebingen", logo: "/images/universities/tuebingen.svg", blogSlug: "universitat-tubingen" },
  { name: "Universität Göttingen", slug: "goettingen", logo: "/images/universities/goettingen.svg", blogSlug: "universitat-gottingen" },
  { name: "Universität Bonn", slug: "bonn", logo: "/images/universities/bonn.svg", blogSlug: "universitat-bonn" },
  { name: "Universität Stuttgart", slug: "stuttgart", logo: "/images/universities/stuttgart.svg", blogSlug: "universitat-stuttgart" },
  { name: "Goethe-Universität Frankfurt", slug: "frankfurt", logo: "/images/universities/frankfurt.svg", blogSlug: "goethe-universitat-frankfurt" },
  { name: "Universität zu Köln", slug: "koeln", logo: "/images/universities/koeln.svg", blogSlug: "universitat-zu-koln" },
  { name: "TU Darmstadt", slug: "tu-darmstadt", logo: "/images/universities/tu-darmstadt.svg", blogSlug: "technische-universitat-darmstadt" },
  { name: "Universität Mannheim", slug: "mannheim", logo: "/images/universities/mannheim.svg", blogSlug: "universitat-mannheim" },
  { name: "FAU Erlangen-Nürnberg", slug: "fau", logo: "/images/universities/fau.svg", blogSlug: "friedrich-alexander-universitat-erlangen-nurnberg" },
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
            Almanya&apos;n&#305;n En Prestijli Üniversiteleri
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Almanya&apos;daki en kaliteli 20 üniversite ile ilgili detayl&#305; bilgilere ula&#351;&#305;n.
            Logoya t&#305;klayarak üniversite hakk&#305;nda kapsaml&#305; rehberimizi okuyun.
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
                    <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={uni.logo}
                        alt={`${uni.name} logosu`}
                        className="h-full w-full object-contain"
                      />
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

        {/* Mini logo grid */}
        <div className="mt-8 grid grid-cols-5 sm:grid-cols-10 gap-2 max-w-3xl mx-auto">
          {universities.map((uni) => (
            <Link
              key={uni.slug}
              href={`/blog/${uni.blogSlug}`}
              className="group flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="h-8 w-8 flex items-center justify-center transition-transform group-hover:scale-110">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uni.logo}
                  alt={uni.name}
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export { universities };
