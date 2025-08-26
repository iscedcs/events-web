"use client";

import EventSearchList from "@/components/skeletons/event-search-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SingleEventProps } from "@/lib/types/event";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { searchForEvents } from "../../../../../../actions/events";
import EventSearchResults from "./event-search-results";

export default function EventSearch() {
  const [closeSearch, setCloseSearch] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [events, setEvents] = useState<SingleEventProps[]>();
  const [loading, setLoading] = useState(false);

  const handleSearchToggle = () => {
    setCloseSearch(!closeSearch);
  };

  useEffect(() => {
    if (!searchValue) {
      setEvents([]);
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const results = await searchForEvents(searchValue);
        setEvents(results || []);
      } catch (e) {
        console.error("Error searching events:", e);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchEvents, 400);
    return () => clearTimeout(debounce);
  }, [searchValue]);

  const eventID =
    events?.find((event) => event.cleanName === searchValue)?.id ?? "";

  // console.log({ searchValue });
  return (
    <div className="">
      <IoSearch
        onClick={handleSearchToggle}
        className=" text-accent w-[24px] h-[24px]"
      />
      {!closeSearch && (
        <div className=" fixed mt-[55px] top-0 z-30 h-screen bg-black w-full left-0">
          <div className="  flex pl-3 items-center gap-2  bg-secondary">
            <GoArrowLeft
              onClick={handleSearchToggle}
              className=" w-[20px] h-[20px]"
            />
            <div className=" flex gap-2 justify-between w-full relative">
              <IoSearch className=" -translate-y-1/2 top-1/2 absolute text-white w-[20px] h-[20px]" />
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="  text-[14px] py-[10px] border-0 rounded-none pl-[30px]"
                placeholder="Search for events"
              />
              <Button
                onClick={() => setSearchValue(searchValue)}
                className=" bg-success py-[20px] text-white rounded-none"
              >
                Search
              </Button>
            </div>
          </div>
          <div className=" h-screen bg-black  px-[15px] py-[20px]">
            {loading ? (
              <EventSearchList />
            ) : (
              <ScrollArea className=" h-[530px]">
                <div className="   flex gap-5 flex-col ">
                  {events && events.length > 0 ? (
                    events?.map((item) => (
                      <EventSearchResults
                        key={item.id}
                        host={item.host ?? ""}
                        cleanName={item.cleanName}
                        location={item.location ?? ""}
                        image={item.image}
                        time={item.time}
                        title={item.title ?? ""}
                        // attendeeImages={item.a}
                      />
                    ))
                  ) : (
                    <p className="text-accent text-sm mt-[10px]">
                      No cards to show
                    </p>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
