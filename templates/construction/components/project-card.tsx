import Image from "next/image";
import Link from "next/link";
import { Card } from "@shipit/ui/card";
import { Badge } from "@shipit/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  href?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  category,
  date,
  href = "#",
}: ProjectCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

          {/* Kategori Badge */}
          <Badge
            variant="secondary"
            className="absolute left-4 top-4 bg-white/90 text-foreground"
          >
            {category}
          </Badge>

          {/* Alt Bilgi Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="mb-1 text-sm font-medium opacity-80">{date}</p>
            <h3 className="mb-2 text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-primary">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed opacity-90">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
