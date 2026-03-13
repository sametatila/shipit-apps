import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbJsonLd } from "@shipit/seo";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

export function Breadcrumbs({ items, baseUrl }: BreadcrumbsProps) {
  const jsonLdItems = baseUrl
    ? items.map((item) => ({
        name: item.label,
        url: item.href ? `${baseUrl}${item.href}` : baseUrl,
      }))
    : undefined;

  return (
    <>
      {jsonLdItems && <JsonLd data={breadcrumbJsonLd(jsonLdItems)} />}
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
