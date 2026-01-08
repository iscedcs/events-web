"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarPlus } from "lucide-react";
import React from "react";
import googleCalendarUrl from "../calendar/google-calendar";
import { downloadICS } from "../calendar/apple-calendar";
import { SingleEventProps } from "@/lib/types/event";

export default function CalendarButton({ event }: { event: SingleEventProps }) {
	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<CalendarPlus />
				</DialogTrigger>
				<DialogContent className=" bg-secondary border-0">
					<DialogTitle>Add to Calendar</DialogTitle>
					<p className=" text-accent">
						Add this event to your calendar, works with Apple
						Calendar and Google Calendar.
					</p>
					<div className=" mt-[10px] flex flex-row justify-start gap-3">
						<DialogClose
							className=" bg-white text-black py-[7px] px-[10px] rounded-full"
							onClick={() => {
								window.open(
									googleCalendarUrl({
										event,
									}),
									"_blank"
								);
							}}
						>
							Google Calendar
						</DialogClose>
						<DialogClose
							className=" bg-white text-black py-[7px] px-[10px] rounded-full"
							onClick={() => {
								downloadICS({
									event,
								});
							}}
						>
							Apple Calendar
						</DialogClose>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
