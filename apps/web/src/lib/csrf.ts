import { cookies } from "next/headers";

const CSRF_COOKIE_NAME = "__csrf";
const CSRF_HEADER_NAME = "x-csrf-token";

/**
 * CSRF token oluşturur ve cookie olarak set eder.
 * Double-submit cookie pattern kullanır.
 */
export async function generateCsrfToken(): Promise<string> {
  const token = crypto.randomUUID();
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 saat
  });
  return token;
}

/**
 * Gelen isteğin CSRF token'ını doğrular.
 * Cookie'deki token ile header'daki token eşleşmeli.
 */
export async function verifyCsrfToken(request: Request): Promise<boolean> {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  if (!cookieToken || !headerToken) return false;

  return cookieToken === headerToken;
}
