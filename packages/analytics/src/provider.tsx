"use client";

import React from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

interface AnalyticsProviderProps {
  gaId?: string;
  gtmId?: string;
  vercelAnalytics?: boolean;
  children?: React.ReactNode;
}

export function AnalyticsProvider({
  gaId,
  gtmId,
  vercelAnalytics = true,
  children,
}: AnalyticsProviderProps) {
  return (
    <>
      {children}
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {vercelAnalytics && <VercelAnalytics />}
    </>
  );
}
