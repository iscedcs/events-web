"use client";

import EventCard from "@/components/shared/event/event-card";
import EventCardSkeleton from "@/components/skeletons/event-card";
import EventCalendar from "@/components/ui/secondary/event-calendar";
import { SingleUserWatchlistProps } from "@/lib/types/event";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getWatchlistUserID } from "../../../../../../../actions/watchlists";
import EmptyState from "../empty-state";

export default function Interested() {
  const [watchlists, setWatchlists] = useState<SingleUserWatchlistProps[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

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
  }, [session?.user?.id]);

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
          {watchlists.map((watchlist) => (
            <div key={watchlist.id}>
              <EventCard
                id={watchlist.event.id}
                link={`/user/events/${watchlist.event.cleanName.toLowerCase()}`}
                cardType="interested"
              />
              <hr className="mt-[25px]" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
