import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@shipit/ui/card";
import { Badge } from "@shipit/ui/badge";

interface CaseResult {
  title: string;
  description: string;
  outcome: string;
  category: string;
}

interface CaseResultsProps {
  results: CaseResult[];
}

function getOutcomeBadgeVariant(
  outcome: string
): "default" | "secondary" | "destructive" | "outline" {
  const lowerOutcome = outcome.toLowerCase();
  if (
    lowerOutcome.includes("kazanildi") ||
    lowerOutcome.includes("basarili") ||
    lowerOutcome.includes("kabul")
  ) {
    return "default";
  }
  if (
    lowerOutcome.includes("uzlasma") ||
    lowerOutcome.includes("anlasma")
  ) {
    return "secondary";
  }
  return "outline";
}

export function CaseResults({ results }: CaseResultsProps) {
  // Basari orani hesapla
  const successCount = results.filter((r) => {
    const lower = r.outcome.toLowerCase();
    return (
      lower.includes("kazanildi") ||
      lower.includes("basarili") ||
      lower.includes("kabul")
    );
  }).length;

  const successRate =
    results.length > 0 ? Math.round((successCount / results.length) * 100) : 0;

  return (
    <div>
      {/* Basari Orani Vurgusu */}
      <div className="mb-10 flex flex-col items-center justify-center rounded-xl bg-primary/5 p-8">
        <div className="mb-2 text-5xl font-bold text-primary">
          %{successRate}
        </div>
        <p className="text-lg font-medium text-muted-foreground">
          Basari Orani
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {results.length} davadan {successCount} tanesinde basarili sonuc
        </p>
      </div>

      {/* Dava Sonuclari Listesi */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {results.map((result, index) => (
          <Card
            key={index}
            className="h-full transition-all duration-300 hover:shadow-md"
          >
            <CardHeader>
              <div className="mb-2 flex items-center justify-between gap-2">
                <Badge variant="outline" className="text-xs">
                  {result.category}
                </Badge>
                <Badge
                  variant={getOutcomeBadgeVariant(result.outcome)}
                  className="text-xs"
                >
                  {result.outcome}
                </Badge>
              </div>
              <CardTitle className="text-lg">{result.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {result.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
