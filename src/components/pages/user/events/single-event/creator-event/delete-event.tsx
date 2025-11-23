"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function DeleteEvent({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/event/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setLoading(false);
        toast.success("Event has been deleted");
        router.push("/user/events?tab=manage");
      } else {
        setLoading(false);
        toast.error("Event has not been deleted successfully");
        router.refresh();
      }
    } catch (e: any) {
      console.log("Unable to delete event", e);
    }
  };

  return (
    <div className="">
      <Button
        disabled={loading}
        onClick={handleDelete}
        className=" bg-error text-white mt-[10px] flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]"
      >
        {loading ? (
          <div className=" font-semibold flex flex-row items-center gap-1">
            <LoaderCircle className=" animate-spin" />
            <p>Deleting Event</p>
          </div>
        ) : (
          "Delete Event"
        )}
      </Button>
    </div>
  );
}
