import { useTranslations } from "next-intl";
import { Button } from "@shipit/ui";
import { Home } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-6xl font-bold text-primary">{t("title")}</h1>
      <h2 className="mt-4 text-2xl font-semibold">{t("subtitle")}</h2>
      <p className="mt-2 text-muted-foreground">{t("description")}</p>
      <Button asChild className="mt-8">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          {t("backHome")}
        </Link>
      </Button>
    </section>
  );
}
