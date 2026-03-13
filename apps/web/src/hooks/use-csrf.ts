"use client";

import { useEffect, useRef } from "react";

export function useCsrf() {
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    fetch("/api/csrf")
      .then((res) => res.json())
      .then((data) => {
        tokenRef.current = data.token;
      })
      .catch(() => {
        // CSRF token alınamazsa sessizce devam et
      });
  }, []);

  function fetchWithCsrf(url: string, options: RequestInit = {}) {
    const headers = new Headers(options.headers);
    if (tokenRef.current) {
      headers.set("x-csrf-token", tokenRef.current);
    }
    return fetch(url, { ...options, headers });
  }

  return { fetchWithCsrf };
}
