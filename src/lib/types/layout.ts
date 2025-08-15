import { UserProps } from "./user";

export interface HederType {
  title: string;
  user: UserProps | undefined;
}

export interface HeaderItemsTypes {
  title: string;
  value: string;
  path: string;
  icon: React.ReactNode;
}

export type PaginationType = {
  limit?: number;
  page?: number;
};
