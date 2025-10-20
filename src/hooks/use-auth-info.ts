"use client";

import { useEffect, useState } from "react";
import { getAuthInfo } from "../../actions/auth";
import { AuthInfo } from "@/lib/types/auth";

interface UseAuthInfoReturn {
  auth: AuthInfo | null;
  loading: boolean;
  error: string | null;
}

export const useAuthInfo = (): UseAuthInfoReturn => {
  const [auth, setAuth] = useState<AuthInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const info = await getAuthInfo();

        // Type guard – ensure the result fits AuthInfo shape
        if (info && typeof info === "object" && "accessToken" in info) {
          setAuth(info as AuthInfo);
        } else {
          setError("Invalid auth data format");
        }
      } catch (err: unknown) {
        console.error("Failed to fetch auth info:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  return { auth, loading, error };
};
