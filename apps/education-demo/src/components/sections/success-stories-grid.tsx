"use client";

import { useState } from "react";
import { Badge } from "@shipit/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@shipit/ui/card";
import { Star, GraduationCap, MapPin, Quote } from "lucide-react";
import { cn } from "@shipit/ui";

interface StoryData {
  name: string;
  initials: string;
  university: string;
  program: string;
  programType: string;
  city: string;
  year: number;
  rating: number;
  quote: string;
  videoUrl?: string;
}

const programTypeColors: Record<string, string> = {
  Master: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Lisans: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Ausbildung: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Veli: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Studienkolleg: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  "Dil Kursu": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
};

export function SuccessStoriesGrid({ stories }: { stories: StoryData[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("Tümü");

  const uniqueProgramTypes = [...new Set(stories.map((s) => s.programType))];
  const filteredStories =
    activeFilter === "Tümü"
      ? stories
      : stories.filter((s) => s.programType === activeFilter);

  return (
    <>
      {/* Filter Section */}
      <section className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Tüm Hikayeler
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveFilter("Tümü")}
              className="focus:outline-none"
            >
              <Badge
                variant={activeFilter === "Tümü" ? "default" : "outline"}
                className={cn(
                  "cursor-pointer px-4 py-2 text-sm transition-colors",
                  activeFilter === "Tümü"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/10"
                )}
              >
                Tümü ({stories.length})
              </Badge>
            </button>
            {uniqueProgramTypes.map((type) => {
              const count = stories.filter((s) => s.programType === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className="focus:outline-none"
                >
                  <Badge
                    variant={activeFilter === type ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer px-4 py-2 text-sm transition-colors",
                      activeFilter === type
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary/10"
                    )}
                  >
                    <GraduationCap className="mr-1 h-3.5 w-3.5" />
                    {type} ({count})
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredStories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Bu kategoride henüz hikaye bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <Card
                  key={story.name}
                  className={cn(
                    "flex flex-col h-full transition-all duration-300",
                    "animate-in fade-in-0 slide-in-from-bottom-4"
                  )}
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold">
                        {story.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg leading-tight">
                          {story.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {story.university} &middot; {story.program}
                        </p>
                        <div className="flex items-center gap-0.5 mt-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < story.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {story.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary/20" />
                      <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                        {story.quote}
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="gap-2 flex-wrap">
                    <Badge
                      variant="secondary"
                      className={programTypeColors[story.programType] || ""}
                    >
                      <GraduationCap className="mr-1 h-3 w-3" />
                      {story.programType}
                    </Badge>
                    {story.city && (
                      <Badge variant="secondary">
                        <MapPin className="mr-1 h-3 w-3" />
                        {story.city}
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
