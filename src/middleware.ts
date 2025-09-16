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
  const isAuth = !!token;

  const userRole: userType | undefined = token?.userType as
    | userType
    | undefined;

  const isApiRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if (isApiRoute) {
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

  if (!isAuth && !pathname.startsWith("/sign-in")) {
    const signInUrl = new URL("/sign-in", req.url);
    return Response.redirect(signInUrl);
  }

  if (isLoggedIn && userRole === "USER" && isPublicRoute) {
    return Response.redirect(new URL(defaultUserRoute, nextUrl));
  }
  if (isLoggedIn && userRole === "BUSINESS_USER" && isPublicRoute) {
    return Response.redirect(new URL(defaultBusinessUserRoute, nextUrl));
  }

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
