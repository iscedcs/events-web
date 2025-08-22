"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SingleAttendeeProps, SingleEventProps } from "@/lib/types/event";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { getAttendeeImagesByEventID } from "../../../../../../actions/attendee";
import { searchForEvents } from "../../../../../../actions/events";
import EventSearchResults from "./event-search-results";

export default function EventSearch() {
  const [closeSearch, setCloseSearch] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [events, setEvents] = useState<SingleEventProps[]>();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<SingleAttendeeProps[]>();

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

  const AttendeeImages = events?.map((item  ) => item);

  useEffect(() => {
    const fetchAttendeeImages = async () => {
      const results = await getAttendeeImagesByEventID(eventID);
      setImages(results);
    };
    fetchAttendeeImages();
  }, []);

  console.log({ images });

  // console.log({ searchValue });
  return (
    <div className="">
      <IoSearch
        onClick={handleSearchToggle}
        className=" text-accent w-[24px] h-[24px]"
      />
      {!closeSearch && (
        <div className=" -mt-[15px]  absolute top-0 z-30 bg-black w-full left-0">
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
          <div className=" py-[20px] bg-black h-screen flex gap-5 flex-col px-[15px]">
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
              <p className="text-accent text-sm mt-[10px]">No cards to show</p>
            )}
            {/* <EventSearchResults
              title="A title that is soo longggggggg sdskdosndsodksdk"
              host="Onyeka Divine"
              cleanName="dwdsd"
              image="/no-image.jpg"
              attendeeImages={[
                "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
                "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
                "https://marketplace.canva.com/MAC1I53J0Pg/1/thumbnail_large-1/canva-smiling-man-portrait-MAC1I53J0Pg.jpg",
                "https://marketplace.canva.com/MAC1I53J0Pg/1/thumbnail_large-1/canva-smiling-man-portrait-MAC1I53J0Pg.jpg",
                "https://marketplace.canva.com/MAC1I53J0Pg/1/thumbnail_large-1/canva-smiling-man-portrait-MAC1I53J0Pg.jpg",
              ]}
              location="A place dfindofmnjd fidfndifdf dfindifjdfidjfijd"
              time="2:00PM"
              attendeeNumber="100"
            /> */}
          </div>
        </div>
      )}
    </div>
  );
}
