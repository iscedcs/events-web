import { NextResponse, NextRequest } from "next/server";

import { buildAuthLoginUrl } from "./lib/auth-urls";
import {
  authRoutes,
  defaultBusinessUserRoute,
  defaultUserRoute,
  protectedRoutes,
  publicRoutes,
} from "../routes";

function isProtectedPath(pathname: string) {
  return protectedRoutes.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

function hasNextAuthSessionCookie(req: NextRequest) {
  return (
    req.cookies.get("__Secure-next-auth.session-token")?.value ||
    req.cookies.get("next-auth.session-token")?.value
  );
}

function decodeUserTypeFromJWT(
  jwt?: string
): "USER" | "BUSINESS_USER" | undefined {
  if (!jwt) return undefined;
  try {
    const payload = JSON.parse(
      Buffer.from(jwt.split(".")[1], "base64").toString("utf-8")
    );
    return payload?.userType;
  } catch {
    return undefined;
  }
}

function isExpired(jwt?: string) {
  if (!jwt) return true;
  try {
    const payload = JSON.parse(
      Buffer.from(jwt.split(".")[1], "base64").toString("utf-8")
    );
    const now = Math.floor(Date.now() / 1000);
    return typeof payload.exp === "number" ? payload.exp <= now : true;
  } catch {
    return true;
  }
}

export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { pathname, search } = nextUrl;

  // Always allow static & api
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/api")
  )
    return NextResponse.next();

  const token = cookies.get("accessToken")?.value;
  const hasValidAccessToken = !!token && !isExpired(token);
  const hasNextAuthCookie = !!hasNextAuthSessionCookie(req);
  const isLoggedIn = hasValidAccessToken || hasNextAuthCookie;

  const isPublic = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtected = isProtectedPath(pathname);

  // Auth routes: if already logged in, route by role unless prompt=login or explicit return is present
  if (isAuthRoute) {
    const prompt = nextUrl.searchParams.get("prompt");
    const hasReturnParam =
      nextUrl.searchParams.has("redirect") ||
      nextUrl.searchParams.has("redirect_uri") ||
      nextUrl.searchParams.has("callbackUrl");

    if (isLoggedIn && prompt !== "login" && !hasReturnParam) {
      const role = decodeUserTypeFromJWT(token);
      const target =
        role === "BUSINESS_USER" ? defaultBusinessUserRoute : defaultUserRoute;
      return NextResponse.redirect(new URL(target, nextUrl));
    }
    return NextResponse.next();
  }

  // Public routes: if logged-in, push to their default dashboards
  if (isPublic && isLoggedIn) {
    const role = decodeUserTypeFromJWT(token);
    const target =
      role === "BUSINESS_USER" ? defaultBusinessUserRoute : defaultUserRoute;
    return NextResponse.redirect(new URL(target, nextUrl));
  }

  // Protected routes: require login → bounce to Auth with returnTo
  if (isProtected && !isLoggedIn) {
    const back = nextUrl.origin + pathname + (search || "");
    return NextResponse.redirect(buildAuthLoginUrl(back));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
