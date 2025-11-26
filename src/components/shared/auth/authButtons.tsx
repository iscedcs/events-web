"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function SignIn() {
  const onSignIn = () => {
    // Where we came from (deep link safe)
    const back = window.location.href;

    // Build IdP sign-in URL with redirect_uri
    const base = process.env.NEXT_PUBLIC_AUTH_BASE_URL!;
    const path = process.env.NEXT_PUBLIC_AUTH_LOGIN_PATH || "/sign-in";
    const authUrl = new URL(path, base);
    authUrl.searchParams.set("redirect_uri", back);

    window.location.href = authUrl.toString();
  };

  return (
    <div>
      <Button onClick={onSignIn}>Sign In</Button>
    </div>
  );
}

export function SignUp() {
  const onSignUp = () => {
    // Where we came from (deep link safe)
    const back = window.location.href;

    // Build IdP sign-in URL with redirect_uri
    const base = process.env.NEXT_PUBLIC_AUTH_BASE_URL!;
    const path = "/register";
    const authUrl = new URL(path, base);
    authUrl.searchParams.set("redirect_uri", back);

    window.location.href = authUrl.toString();
  };

  return (
    <div>
      <Button onClick={onSignUp}>Get Started</Button>
    </div>
  );
}
