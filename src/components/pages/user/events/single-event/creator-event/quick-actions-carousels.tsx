"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { SingleEventProps } from "@/lib/types/event";
import { Button } from "@/components/ui/button";
import ShareButton from "./share-button";
import googleCalendarUrl from "../../calendar/google-calendar";
import { downloadICS } from "../../calendar/apple-calendar";

export default function QuickActionsCarousels({
	extraInfo,
}: {
	extraInfo: SingleEventProps;
}) {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		if (!api) {
			return;
		}
		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);
		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	const plugin = React.useRef(
		Autoplay({ delay: 4000, stopOnInteraction: true })
	);

	return (
		<div>
			<Carousel
				plugins={[plugin.current]}
				className="w-full "
				onMouseEnter={plugin.current.stop}
				onMouseLeave={plugin.current.reset}
				setApi={setApi}
			>
				<CarouselContent>
					<CarouselItem>
						<div className=" rounded-[20px] px-[20px] py-[20px] my-[20px] bg-secondary">
							{!extraInfo.isPublic ? (
								<div className="">
									<p className=" text-accent">
										This event is a private event, share
										event link to get more attendees
									</p>
								</div>
							) : (
								<div className="">
									<p className=" text-accent">
										This event is public!! Share the event
										link to increase visibility and
										attendance.
									</p>
								</div>
							)}
							<ShareButton
								url={`/event/${extraInfo.cleanName}`}
								eventTitle={extraInfo.title}
								text={extraInfo.description}
							/>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className=" rounded-[20px] px-[20px] py-[20px] my-[20px] bg-secondary">
							{!extraInfo.isPublic ? (
								<div className="">
									<p className=" text-accent">
										This event is a private event, share
										event link to get more attendees
									</p>
								</div>
							) : (
								<div className="">
									<p className=" text-accent">
										Add this event to your calendar, works
										with Apple Calendar and Google Calendar.
									</p>
								</div>
							)}
							<div className=" mt-[10px] flex flex-row justify-start gap-3">
								<Button
									onClick={() => {
										window.open(
											googleCalendarUrl({
												event: extraInfo,
											}),
											"_blank"
										);
									}}
								>
									Google Calendar
								</Button>
								<Button
									onClick={() => {
										downloadICS({ event: extraInfo });
									}}
								>
									Apple Calendar
								</Button>
							</div>
						</div>
					</CarouselItem>
				</CarouselContent>
			</Carousel>

			{api && (
				<div className=" flex gap-2 justify-center flex-row">
					{api.scrollSnapList().map((i) => (
						<div
							key={i}
							className={` ${
								current - 1 === i ? "  w-[30px]" : " w-[10px]"
							} rounded-full bg-white  h-[10px]`}
						></div>
					))}
				</div>
			)}
		</div>
	);
}
