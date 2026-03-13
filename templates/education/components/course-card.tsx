import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@shipit/ui/card";
import { Badge } from "@shipit/ui/badge";

interface CourseCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  duration?: string;
  level?: string;
}

export function CourseCard({
  title,
  description,
  icon: Icon,
  href,
  duration,
  level,
}: CourseCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl transition-colors duration-300 group-hover:text-primary">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
        {(duration || level) && (
          <CardFooter className="flex gap-2">
            {duration && (
              <Badge variant="secondary">{duration}</Badge>
            )}
            {level && (
              <Badge variant="outline">{level}</Badge>
            )}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
