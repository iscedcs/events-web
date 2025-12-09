import { decodeJwt } from "./server/event-fetch";

export async function verifyToken(token: string) {
  try {
    const decoded = decodeJwt(token);
    console.log("[EVENT] Decoded token payload:", decoded);

    if (!decoded) return { valid: false };

    if (isTokenExpired(token)) return { valid: false };

    return { valid: true, payload: decoded };
  } catch (error) {
    console.error("[EVENT] Token verification error:", error);
    return { valid: false };
  }
}

export function isTokenExpired(token: string | null): boolean {
  const decoded = decodeJwt(token!);

  if (!decoded?.exp) return true;

  const nowSec = Math.floor(Date.now() / 1000);

  return decoded.exp <= nowSec;
}
