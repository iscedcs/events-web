"use server";

import { AUTH_API, URLS } from "@/lib/const";
import { getAuthInfo } from "./auth";

export const getUserByID = async (id: string) => {
  try {
    const url = `${AUTH_API}${URLS.user.one.replace("{id}", id)}`;
    const auth = await getAuthInfo();
    const BEARER = "error" in auth || auth.isExpired ? null : auth.accessToken;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });
    const data = await res.json();
    const success = data.success;
    const user = data.data;
    // console.log({ data });
    if (success === true) {
      return user;
    }
    return null;
  } catch (e: any) {
    console.log("Error fetching user by ID", e);
  }
};
