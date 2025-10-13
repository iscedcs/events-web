import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import authConfig from "../auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  defaultBusinessUserRoute,
  defaultUserRoute,
  protectedRoutes,
  publicRoutes,
} from "../routes";
import { userType } from "./lib/types/auth";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;

  const userRole: userType | undefined = token?.userType as
    | userType
    | undefined;

  const isApiRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );
  const prompt = nextUrl.searchParams.get("prompt");
  const hasReturnParam =
    nextUrl.searchParams.has("redirect") ||
    nextUrl.searchParams.has("redirect_uri") ||
    nextUrl.searchParams.has("callbackUrl");

  const forceLogin = prompt === "login";

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn && !forceLogin && !hasReturnParam) {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (userRole === "USER") {
        return Response.redirect(new URL(defaultUserRoute, nextUrl));
      }
      if (userRole === "BUSINESS_USER") {
        return Response.redirect(new URL(defaultBusinessUserRoute, nextUrl));
      }
    }

    return;
  }

  if (isLoggedIn && userRole === "USER" && isPublicRoute) {
    return Response.redirect(new URL(defaultUserRoute, nextUrl));
  }
  if (isLoggedIn && userRole === "BUSINESS_USER" && isPublicRoute) {
    return Response.redirect(new URL(defaultBusinessUserRoute, nextUrl));
  }

  if (!isLoggedIn && isProtectedRoute) {
    const signIn = new URL("/sign-in", nextUrl);
    signIn.searchParams.set("redirect", nextUrl.pathname + nextUrl.search);
    return Response.redirect(signIn);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
