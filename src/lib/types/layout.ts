import { UserProps } from "./user";

export interface HederType {
  hasBack?: boolean;
  title: string;
  user: UserProps | undefined | null;
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

export interface InfiniteScrollProps {
  /** Current page number */
  page: number;
  /** Number of records per page */
  limit: number;
  /** Total available records (from API) */
  totalRecord: number;
  /** Whether data is currently loading */
  isLoading: boolean;
  /** Function to fetch next page */
  loadMore: (nextPage: number) => void;
  /** Scroll threshold (default 1 means full visibility) */
  threshold?: number;
  /** Content */
  children: React.ReactNode;
}
