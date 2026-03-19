"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@shipit/ui/card";
import { Badge } from "@shipit/ui/badge";
import { GraduationCap, BookOpen, Award, Wrench, Languages, MessageCircle } from "lucide-react";
import { useContactModal } from "@/contexts/contact-modal-context";

const iconMap: Record<string, React.ElementType> = {
  studienkolleg: GraduationCap,
  bachelor: BookOpen,
  master: Award,
  ausbildung: Wrench,
  language: Languages,
};

interface CourseCardProps {
  title: string;
  description: string;
  iconName: string;
  duration?: string;
  level?: string;
}

export function CourseCard({
  title,
  description,
  iconName,
  duration,
  level,
}: CourseCardProps) {
  const { open } = useContactModal();
  const Icon = iconMap[iconName] || GraduationCap;

  return (
    <button
      type="button"
      onClick={open}
      className="group block text-left w-full"
    >
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
        <CardFooter className="flex items-center justify-between">
          <div className="flex gap-2">
            {duration && <Badge variant="secondary">{duration}</Badge>}
            {level && <Badge variant="outline">{level}</Badge>}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            <MessageCircle className="h-3.5 w-3.5" />
            Bilgi Al
          </span>
        </CardFooter>
      </Card>
    </button>
  );
}
