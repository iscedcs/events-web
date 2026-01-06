"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getEventsForCalendar } from "../../../../actions/events";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../dropdown-menu";
import Image from "next/image";
import { Skeleton } from "../skeleton";

type CalendarEvent = {
	title?: string;
	cleanName?: string;
	image?: string;
	startDate?: Date;
};

export default function StandaloneCurrentMonthCalendar() {
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth(); // 0-indexed

	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const loadEvents = async () => {
			const res = await getEventsForCalendar({});
			if (res) {
				setLoading(false);
				setEvents(res || []);
			}
		};
		loadEvents();
	}, []);

	const daysInMonth = useMemo(() => {
		return new Date(currentYear, currentMonth + 1, 0).getDate();
	}, [currentYear, currentMonth]);

	const firstDayOfMonth = useMemo(() => {
		return new Date(currentYear, currentMonth, 1).getDay();
	}, [currentYear, currentMonth]);

	const daysArray = useMemo(() => {
		const arr: (number | null)[] = [];
		for (let i = 0; i < firstDayOfMonth; i++) arr.push(null);
		for (let d = 1; d <= daysInMonth; d++) arr.push(d);
		return arr;
	}, [daysInMonth, firstDayOfMonth]);

	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	if (loading) {
		return <Skeleton className=" w-full h-[321px] " />;
	}

	return (
		<div className="w-full max-w-[400px] mx-auto p-4 rounded-xl bg-secondary text-white">
			{/* Header */}
			<div className="text-left mb-4">
				<h2 className="text-xl ">
					{today.toLocaleString("default", { month: "long" })}{" "}
					{currentYear}
				</h2>
			</div>

			{/* Days of week */}
			<div className="grid grid-cols-7 text-center mb-2 text-[14px] text-gray-300">
				{daysOfWeek.map((d) => (
					<div key={d}>{d}</div>
				))}
			</div>

			{/* Calendar days */}
			<div className="grid grid-cols-7 gap-1 text-center">
				{daysArray.map((day, i) => {
					if (!day) {
						return <div key={i} className="min-h-[36px]" />;
					}

					const thisDate = new Date(currentYear, currentMonth, day);

					const hasEvent = events.filter((ev) => {
						const d = new Date(ev.startDate ?? "");
						return (
							d.getFullYear() === thisDate.getFullYear() &&
							d.getMonth() === thisDate.getMonth() &&
							d.getDate() === thisDate.getDate()
						);
					});

					const eventCount = hasEvent?.length ?? 0;

					// ---- 0 events: plain day ----
					if (eventCount === 0) {
						return (
							<div
								key={i}
								className="min-h-[36px] flex items-center justify-center px-3 py-2 rounded-full"
							>
								{day}
							</div>
						);
					}

					if (eventCount === 1) {
						const singleEvent = hasEvent![0];
						const bgImage = singleEvent.image;
						const link = singleEvent.cleanName;
						const title = singleEvent.title;

						return (
							<div className=" relative">
								<div className="  relative">
									<Image
										src={bgImage!}
										alt="image"
										width={"1000"}
										height={"1000"}
										className=" left-0 top-0 absolute w-full  rounded-full h-[45px] object-cover"
									/>
									<div className=" bg-black/75 left-0 top-0 absolute w-full  rounded-full h-[45px]"></div>
								</div>
								<Link
									href={`/user/events/${link?.toLowerCase()}`}
									key={i}
									className="min-h-[36px] flex items-center justify-center px-3 py-2 rounded-full hover:bg-primary hover:text-white transition relative"
								>
									{!bgImage && (
										<div className="absolute inset-0 bg-black/70 rounded-full"></div>
									)}
									<span className="relative z-10">{day}</span>
								</Link>
							</div>
						);
					}

					// ---- 2+ events: show dropdown with list ----
					return (
						<DropdownMenu key={i}>
							<DropdownMenuTrigger className="flex items-center min-h-[36px] px-3 py-2   justify-center rounded-full hover:bg-primary hover:text-white transition relative">
								<div className="absolute inset-0 bg-black/70 rounded-full"></div>
								<span className="relative z-10">{day}</span>
							</DropdownMenuTrigger>

							<DropdownMenuContent className="bg-black text-white rounded-lg p-2 w-[220px]">
								<div className="space-y-2">
									{hasEvent!.map((e, idx) => (
										<Link
											href={`/user/events/${e.cleanName?.toLowerCase()}`}
											key={idx}
											className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-primary transition"
										>
											<span className="text-sm">
												<div className=" flex items-center gap-3">
													<Image
														src={
															e.image?.startsWith(
																"http"
															) ||
															e.image?.startsWith(
																"/"
															)
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
	);
}
