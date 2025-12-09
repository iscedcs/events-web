import { NextRequest, NextResponse } from "next/server";
import { buildAuthLoginUrl } from "./lib/auth-urls";
import { verifyToken } from "./lib/verify-jwt";
import {
  defaultBusinessUserRoute,
  defaultUserRoute,
  protectedRoutes,
  publicRoutes,
  authRoutes,
} from "../routes";

function isProtectedPath(pathname: string) {
  return protectedRoutes.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { pathname, search } = nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/auth/logout")
  ) {
    return NextResponse.next();
  }

  const token = cookies.get("accessToken")?.value || null;
  let isLoggedIn = false;
  let userType: "USER" | "BUSINESS_USER" | null = null;

  if (token) {
    const result = await verifyToken(token);

    if (result.valid && result.payload && result.payload.exp) {
      const now = Math.floor(Date.now() / 1000);

      if (result.payload.exp > now) {
        isLoggedIn = true;
        userType = result.payload.userType || null;
      }
    }
  }

  const isPublic = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtected = isProtectedPath(pathname);

  if (isAuthRoute) {
    const prompt = nextUrl.searchParams.get("prompt");
    const hasReturnParam =
      nextUrl.searchParams.has("redirect") ||
      nextUrl.searchParams.has("redirect_uri") ||
      nextUrl.searchParams.has("callbackUrl");

    if (isLoggedIn && prompt !== "login" && !hasReturnParam) {
      const target =
        userType === "BUSINESS_USER"
          ? defaultBusinessUserRoute
          : defaultUserRoute;

      return NextResponse.redirect(new URL(target, nextUrl));
    }

    return NextResponse.next();
  }

  if (isPublic && isLoggedIn) {
    const route =
      userType === "BUSINESS_USER"
        ? defaultBusinessUserRoute
        : defaultUserRoute;

    return NextResponse.redirect(new URL(route, nextUrl));
  }

  if (isProtected && !isLoggedIn) {
    const returnTo = `${req.nextUrl.origin}${pathname}${search}`;
    return NextResponse.redirect(buildAuthLoginUrl(returnTo));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
