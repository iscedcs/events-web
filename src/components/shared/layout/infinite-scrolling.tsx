"use client";

import { useEffect, useRef, useCallback } from "react";

interface InfiniteScrollProps {
  page: number;
  limit: number;
  totalRecord: number;
  isLoading: boolean;
  loadMore: (nextPage: number) => void;
  threshold?: number;
  children: React.ReactNode;
}

export default function InfiniteScroll({
  page,
  limit,
  totalRecord,
  isLoading,
  loadMore,
  threshold = 1,
  children,
}: InfiniteScrollProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // ✅ Compute hasMore precisely
  const hasMore = totalRecord > 0 && page * limit < totalRecord;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        loadMore(page + 1);
      }

      // ✅ Stop observing when no more data
      if (!hasMore) {
        observer.disconnect();
      }
    },
    [hasMore, isLoading, loadMore, page]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold,
    });

    const currentLoader = loaderRef.current;
    if (currentLoader && hasMore) {
      observer.observe(currentLoader);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleObserver, hasMore, threshold]);

  return (
    <div className="w-full">
      {children}

      <div
        ref={loaderRef}
        className="flex justify-center items-center py-6 text-sm text-gray-500"
      >
        {isLoading
          ? "Loading..."
          : hasMore
          ? "Scroll to load more"
          : "No more data to show"}
      </div>
    </div>
  );
}
