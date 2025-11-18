"use client";

import NearbyEventCard from "@/components/pages/user/events/discover/nearby-event-card";
import NearbyEventSkeleton from "@/components/skeletons/nearby-event";
import { SingleEventProps } from "@/lib/types/event";
import { Frown } from "lucide-react";
import { useEffect, useState } from "react";
import { MdOutlineLocationOff } from "react-icons/md";
import { getNearbyEvents } from "../../../../../../../actions/events";

export default function EventsNearYou() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [radius, setRadius] = useState<number>(5000);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<SingleEventProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation not supported in this browser");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
      },
      () => setError("Please allow location access to continue")
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (lat === null || lng === null) return;

    const controller = new AbortController();
    const fetchNearbyEvents = async () => {
      setLoading(true);
      try {
        const eventInfo = await getNearbyEvents(
          lng?.toString() ?? "",
          lat?.toString() ?? "",
          radius.toString() ?? ""
        );
        if (eventInfo !== null) {
          setEvents(eventInfo?.events ?? undefined);
          setLoading(false);
        }
      } catch (e: any) {
        console.log("Unable to fetch nearby events", e);
      }
    };
    const debounce = setTimeout(fetchNearbyEvents, 300);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [lng, lat]);

  // console.log({ lng, lat });
  // console.log({ events });

  return (
    <div className="mt-[40px]">
      <p className="text-[24px]">Events near you</p>

      <div className="mt-[10px]">
        {error ? (
          <div
            onClick={getLocation}
            className="rounded-[20px] bg-secondary py-[30px] flex items-center justify-center flex-col gap-3 text-center"
          >
            <div className="bg-white flex items-center rounded-full justify-center w-[50px] h-[50px]">
              <MdOutlineLocationOff className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-[16px]">Unable to display events</p>
              <p className="text-[13px] text-accent">
                {error === "Please allow location access to continue"
                  ? "Tap to turn on location to view events near you"
                  : error}
              </p>
            </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col gap-5">
            <NearbyEventSkeleton />
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-[20px] bg-secondary py-[30px] flex items-center justify-center flex-col gap-3 text-center">
            <div className="bg-white flex items-center rounded-full justify-center w-[50px] h-[50px]">
              <Frown className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-[16px]">No events found in your area yet</p>
              <p className="text-[13px] text-accent">
                Try again later or move to a different location
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {events.map((info) => (
              <NearbyEventCard
                key={info.cleanName}
                host={info.host}
                image={info.image}
                location={info.location}
                startDate={info.startDate}
                time={info.time}
                title={info.title}
                cleanName={info.cleanName}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
