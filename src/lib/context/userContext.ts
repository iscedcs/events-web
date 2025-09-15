"use client";

import { createContext, useContext } from "react";
import { UserProps } from "../types/user";

export const UserContext = createContext<UserProps | undefined>(undefined);

export const useUserContext = () => {
  const user = useContext(UserContext);

  if (user === undefined) {
    throw new Error("useUserContext must be within UserContext");
  }
  return user;
};
