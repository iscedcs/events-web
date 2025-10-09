"use client";

import EventCard from "@/components/shared/event/event-card";
import EventCardSkeleton from "@/components/skeletons/event-card";
import EventCalendar from "@/components/ui/secondary/event-calendar";
import { SingleUserWatchlistProps } from "@/lib/types/event";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  checkWatchList,
  getWatchlistUserID,
} from "../../../../../../../actions/watchlists";
import EmptyState from "../empty-state";

export default function Interested() {
  const [watchlists, setWatchlists] = useState<SingleUserWatchlistProps[]>([]);
  const [clicked, setClicked] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.id) return;
    let cancelled = false;

    const fetchWatchlists = async () => {
      setLoading(true);
      try {
        const watchlistsData = await getWatchlistUserID();
        console.log({ watchlistsData });
        if (!cancelled) setWatchlists(watchlistsData ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWatchlists();

    return () => {
      cancelled = true;
    };
  }, [clicked]);

  useEffect(() => {
    const checkWatchlistFetch = async () => {
      const watchlistIds = watchlists.map(
        (watchlist) => watchlist.event.id ?? ""
      );
      const checkWatchlistData = await Promise.all(
        watchlistIds.map((id) => checkWatchList(id))
      );
      setClicked(checkWatchlistData.some((result) => result));
    };
    checkWatchlistFetch();
  }, [clicked]);

  console.log({ watchlists });

  if (!loading && watchlists.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="px-[10px] absolute top-0 right-0">
        <EventCalendar eventType="interested" type="multiple" />
      </div>

      {loading ? (
        <div className=" mt-[20px]">
          <EventCardSkeleton />
        </div>
      ) : (
        <div className="grid-cols-1 grid gap-[30px] mt-[20px]">
          {watchlists.map((watchlist) => {
            return (
              <div key={watchlist.id}>
                <EventCard
                  host={watchlist.event.host}
                  image={watchlist.event.image}
                  isClicked={true}
                  startDate={watchlist.event.startDate}
                  time={watchlist.event.time}
                  title={watchlist.event.title}
                  id={watchlist.event.id}
                  link={`/user/events/${watchlist.event.cleanName.toLowerCase()}`}
                  cardType="interested"
                />
                <hr className="mt-[25px]" />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
