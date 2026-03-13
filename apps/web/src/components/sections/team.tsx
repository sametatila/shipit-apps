"use client";

import Image from "next/image";
import { cn } from "@shipit/ui";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

interface TeamProps {
  title: string;
  subtitle?: string;
  members: TeamMember[];
}

export function Team({ title, subtitle, members }: TeamProps) {
  const { ref, isVisible } = useScrollReveal();

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
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {members.map((member, index) => (
            <div
              key={index}
              className={cn(
                "group text-center transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="font-heading text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
              {member.bio && (
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
