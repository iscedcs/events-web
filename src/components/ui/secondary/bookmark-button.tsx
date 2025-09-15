"use client";

import { isPastDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import { toast } from "sonner";

export default function BookmarkButton({
  eventId,
  isClicked,
  eventDate,
}: {
  eventId: string;
  isClicked: boolean;
  eventDate: Date;
}) {
  const [clicked, setClicked] = useState<boolean>(false);
  const router = useRouter();
  const today = new Date().toISOString();
  const isoToday = new Date(today);

  const handleAdd = async () => {
    setClicked(false);
    try {
      const res = await fetch("/api/watchlist/new", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ eventId }),
      });
      const data = await res.json();

      if (data.success) {
        setClicked(true);
        toast.success("Event added to your bookmarks");
        return;
      }

      setClicked(false);
      router.refresh();

      if (isPastDate(eventDate)) {
        toast.error("Cannot add past events to bookmarks");
      } else {
        toast.error("Event wasn't added to bookmarks");
      }
    } catch (e: any) {
      setClicked(false);
      router.refresh();

      console.log("There was a problem adding event to watchlist", e);
    }
  };

  const handleRemove = async () => {
    try {
      const res = await fetch("/api/watchlist/new", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ eventId }),
      });
      const data = await res.json();
      if (data.success) {
        setClicked(false);
        router.refresh();
        toast.success("Event removed from your bookmarks");
      } else if (data.status === 401) {
        setClicked(false);
        router.refresh();
        toast.error(data.error);
      } else {
        setClicked(true);
        router.refresh();
        toast.error("Event wasn't added to bookmarks");
      }
    } catch (e: any) {
      setClicked(true);
      router.refresh();
      console.log("There was a problem removing event from watchlist", e);
    }
  };
  return (
    <div>
      {clicked || isClicked ? (
        <MdOutlineBookmark
          onClick={handleRemove}
          className=" w-[25px] h-[25px]"
        />
      ) : (
        <MdOutlineBookmarkBorder
          onClick={handleAdd}
          className=" w-[25px] h-[25px]"
        />
      )}
    </div>
  );
}
