"use server";

import { signIn } from "../auth";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res === null) {
      return null;
    }
    return res;
  } catch (error: any) {
    console.log("Something went wrong", error);
  }
};
