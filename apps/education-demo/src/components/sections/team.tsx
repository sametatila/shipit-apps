"use client";

import Image from "next/image";
import { cn } from "@shipit/ui";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Phone, Mail, MapPin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  city?: string;
  phone?: string;
  email?: string;
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
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
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
                    {member.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                )}
              </div>
              <h3 className="font-heading text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
              {member.city && (
                <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {member.city}
                </p>
              )}
              {member.bio && (
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              )}
              <div className="mt-3 flex items-center justify-center gap-3">
                {member.phone && (
                  <a
                    href={`tel:${member.phone.replace(/[\s]/g, "")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title={member.phone}
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title={member.email}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
