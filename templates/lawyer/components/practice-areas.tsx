import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@shipit/ui/card";

interface PracticeArea {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

interface PracticeAreasProps {
  areas: PracticeArea[];
}

export function PracticeAreas({ areas }: PracticeAreasProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((area) => {
        const Icon = area.icon;
        return (
          <Link key={area.title} href={area.href} className="group block">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-lg transition-colors duration-300 group-hover:text-primary">
                  {area.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {area.description}
                </CardDescription>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Detayli Bilgi
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
