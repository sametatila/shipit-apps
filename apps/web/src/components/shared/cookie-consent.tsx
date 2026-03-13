"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@shipit/ui";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const t = useTranslations("cookie");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => { localStorage.setItem("cookie-consent", "accepted"); setShow(false); };
  const reject = () => { localStorage.setItem("cookie-consent", "rejected"); setShow(false); };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg md:bottom-4 md:left-4 md:right-auto md:max-w-md md:rounded-lg md:border">
      <p className="text-sm text-muted-foreground mb-4">{t("message")}</p>
      <div className="flex space-x-2">
        <Button size="sm" onClick={accept}>{t("accept")}</Button>
        <Button size="sm" variant="outline" onClick={reject}>{t("reject")}</Button>
      </div>
    </div>
  );
}
