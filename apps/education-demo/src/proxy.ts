import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Payload admin, API, static dosyalar, _next hariç tüm route'lar
    "/((?!api|admin|_next|_vercel|.*\\..*).*)",
  ],
};
