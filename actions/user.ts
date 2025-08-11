import { AUTH_API, URLS } from "@/lib/const";
import { auth } from "../auth";

export const getUserByID = async (id: string) => {
  try {
    const url = `${AUTH_API}${URLS.user.one.replace("{id}", id)}`;
    const session = await auth();
    const BEARER_TOKEN = session?.user.accessToken;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const success = data.success;
    const user = data.data;
    console.log({ data });
    if (success === true) {
      return user;
    }
    return null;
  } catch (e: any) {
    console.log("Error fetching user by ID", e);
  }
};
