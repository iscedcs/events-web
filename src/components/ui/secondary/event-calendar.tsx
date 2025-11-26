"use client";

import { useAuthInfo } from "@/hooks/use-auth-info";
import { shortenToThree } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import {
  getEventsForCalendar,
  getUserEVentsForCalendar,
} from "../../../../actions/events";
import {
  getFutureTicketsForCalendarByUserId,
  getPastTicketsForCalendarByUserID,
} from "../../../../actions/tickets";
import { getWatchlistForCalendarUserID } from "../../../../actions/watchlists";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

type CalendarType = "multiple" | "single";
type EventType = "featured" | "going" | "hosting" | "interested" | "past";

export default function EventCalendar({
  eventType,
  type,
  isOpen,
}: {
  eventType: EventType;
  type: CalendarType;
  isOpen?: boolean;
}) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [openDialog, setOpenDialog] = useState(isOpen);
  const [event, setEvent] = useState<
    | {
        image: string | undefined;
        title: string | undefined;
        cleanName: string | undefined;
        startDate: Date | undefined;
      }[]
    | undefined
  >();

  const session = useAuthInfo();

  const userId = session.auth?.user.id;

  useEffect(() => {
    const displayEvent = async () => {
      const events = await getEventsForCalendar({});
      const going = await getFutureTicketsForCalendarByUserId(userId ?? "");
      const hosting = await getUserEVentsForCalendar({});
      const interested = await getWatchlistForCalendarUserID(userId ?? "");
      const past = await getPastTicketsForCalendarByUserID(userId ?? "");

      switch (eventType) {
        case "featured":
          setEvent(events);
          break;
        case "going":
          setEvent(going);
          break;
        case "hosting":
          setEvent(hosting);
          break;
        case "interested":
          setEvent(interested);
          break;
        case "past":
          setEvent(past);
          break;
        default:
          setEvent(undefined);
          break;
      }
    };

    displayEvent();
  }, [eventType, userId]);

  const years = useMemo(() => {
    const startYear = currentYear;
    const endYear = currentYear + 50;
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
  }, [currentYear]);

  const calendarMonths = [
    { month: "January", number: 1 },
    { month: "February", number: 2 },
    { month: "March", number: 3 },
    { month: "April", number: 4 },
    { month: "May", number: 5 },
    { month: "June", number: 6 },
    { month: "July", number: 7 },
    { month: "August", number: 8 },
    { month: "September", number: 9 },
    { month: "October", number: 10 },
    { month: "November", number: 11 },
    { month: "December", number: 12 },
  ];

  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  function getFirstDayOfMonth(month: number, year: number) {
    return new Date(year, month - 1, 1).getDay();
  }

  function generateCalendarDays(month: number, year: number) {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days: (number | undefined)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(undefined);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return days;
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const filteredMonths = calendarMonths.filter((m) => m.number >= month);

  const typeSelect =
    type === "single"
      ? calendarMonths.filter((m) => m.number === currentMonth)
      : filteredMonths;

  return (
    <div className="w-full">
      <DropdownMenu
        onOpenChange={(open) => setOpenDialog(open)}
        open={openDialog}
      >
        <DropdownMenuTrigger
          onClick={() => setOpenDialog(!openDialog)}
          className="border rounded-[12px] px-2.5 py-2 flex items-center gap-2"
        >
          <p className="text-[14px]">
            {shortenToThree(
              calendarMonths.find((m) => m.number === month)?.month ?? ""
            )}{" "}
            {year}{" "}
          </p>
          {openDialog ? <PiCaretUpBold /> : <PiCaretDownBold />}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`pb-[20px] rounded-none border-0 w-screen px-[20px] bg-black text-white ${
            type === "multiple" ? "mt-[10px]" : "mt-0"
          }`}
        >
          <div>
            <div
              className={`flex justify-center gap-13 ${
                type === "multiple" ? "block" : "hidden"
              }`}
            >
              <Select onValueChange={(value) => setMonth(Number(value))}>
                <SelectTrigger className="border-0">
                  <SelectValue
                    placeholder={
                      calendarMonths.find((m) => m.number === month)?.month
                    }
                  />
                </SelectTrigger>
                <SelectContent className="w-[300px] bg-secondary text-white border-0 py-[10px] rounded-none">
                  {calendarMonths.map((m) => (
                    <SelectItem
                      key={m.number}
                      className="data-[state=checked]:bg-white data-[state=checked]:rounded-none data-[state=checked]:text-black py-[10px] px-[20px]"
                      value={m.number.toString()}
                    >
                      {m.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setYear(Number(value))}>
                <SelectTrigger className="border-0">
                  <SelectValue placeholder={year.toString()} />
                </SelectTrigger>
                <SelectContent className="w-[300px] bg-secondary text-white border-0 py-[10px] rounded-none">
                  {years.map((y) => (
                    <SelectItem
                      key={y}
                      className="data-[state=checked]:bg-white data-[state=checked]:rounded-none data-[state=checked]:text-black py-[10px] px-[20px]"
                      value={y.toString()}
                    >
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              {typeSelect.map((monthObj) => {
                const days = generateCalendarDays(monthObj.number, year);
                return (
                  <div key={monthObj.number} className="mt-6">
                    <div className="flex items-center gap-2 text-lg">
                      <p>{monthObj.month}</p>
                      <p>{year}</p>
                    </div>

                    <div className="text-[16px] w-full my-3 rounded-[12px] px-4 py-4 bg-secondary">
                      <div className="grid grid-cols-7 text-center mb-2">
                        {daysOfWeek.map((dn, index) => (
                          <div key={index}>{dn}</div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center">
                        {days.map((day, i) => {
                          if (!day) {
                            return (
                              <div
                                key={`${monthObj.number}-${i}`}
                                className="min-h-[36px]"
                              />
                            );
                          }

                          const fullDay = new Date(
                            year,
                            monthObj.number - 1,
                            day
                          );

                          // ----- NOTE: use filter to get all events for this day -----
                          const eventsForDay = event?.filter((eventItem) => {
                            const e = new Date(
                              eventItem?.startDate ?? new Date()
                            );
                            return (
                              e.getFullYear() === fullDay.getFullYear() &&
                              e.getMonth() === fullDay.getMonth() &&
                              e.getDate() === fullDay.getDate()
                            );
                          });

                          const eventCount = eventsForDay?.length ?? 0;

                          // ---- 0 events: plain day ----
                          if (eventCount === 0) {
                            return (
                              <div
                                key={`${monthObj.number}-${i}`}
                                className="min-h-[36px] flex items-center justify-center px-3 py-2 rounded-full"
                              >
                                {day}
                              </div>
                            );
                          }

                          // ---- 1 event: use image as background (preserve original behavior) ----
                          if (eventCount === 1) {
                            const singleEvent = eventsForDay![0];
                            const bgImage = singleEvent.image;
                            const link = singleEvent.cleanName;
                            const title = singleEvent.title;

                            return (
                              <Link
                                href={`/user/events/${link?.toLowerCase()}`}
                                key={`${monthObj.number}-${i}`}
                                className="min-h-[36px] flex items-center justify-center px-3 py-2 rounded-full hover:bg-primary hover:text-white transition relative"
                                style={{
                                  backgroundImage: bgImage
                                    ? `url(${bgImage})`
                                    : undefined,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  color: bgImage ? "white" : undefined,
                                }}
                              >
                                {bgImage && (
                                  <div className="absolute inset-0 bg-black/70 rounded-full"></div>
                                )}
                                <span className="relative z-10">{day}</span>
                              </Link>
                            );
                          }

                          // ---- 2+ events: show dropdown with list ----
                          return (
                            <DropdownMenu key={`${monthObj.number}-${i}`}>
                              <DropdownMenuTrigger className="flex items-center min-h-[36px] px-3 py-2   justify-center rounded-full hover:bg-primary hover:text-white transition relative">
                                <div className="absolute inset-0 bg-black/70 rounded-full"></div>
                                <span className="relative z-10">{day}</span>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent className="bg-black text-white rounded-lg p-2 w-[220px]">
                                <div className="space-y-2">
                                  {eventsForDay!.map((e, idx) => (
                                    <Link
                                      href={`/user/events/${e.cleanName?.toLowerCase()}`}
                                      key={idx}
                                      className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-primary transition"
                                    >
                                      <span className="text-sm">
                                        <div className=" flex items-center gap-3">
                                          <Image
                                            src={
                                              e.image?.startsWith("http") ||
                                              e.image?.startsWith("/")
                                                ? e.image
                                                : "/resources/no-image.png"
                                            }
                                            alt="image"
                                            width={"20"}
                                            height={"20"}
                                            className=" w-[25px] h-[25px] rounded-full object-cover"
                                          />
                                          <p className=" w-[60%] truncate capitalize">
                                            {e.title?.toLowerCase()}
                                          </p>
                                        </div>
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
