import EventMapLocation from "@/components/pages/user/events/single-event/event-registration/event-map-location";
import ShareButton from "@/components/pages/user/events/single-event/event-registration/share-button";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SingleDayDisplay from "@/components/ui/secondary/single-day-display";
import { SingleEventProps } from "@/lib/types/event";
import { stripTime } from "@/lib/utils";
import { format, isAfter, isBefore, isEqual } from "date-fns";
import { ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { HiTicket } from "react-icons/hi";
import { PiMapPinFill } from "react-icons/pi";
import { getEventsByCleanName } from "../../../../../actions/events";
import { SETTINGS } from "@/lib/settings-config";

type Params = Promise<{ cleanName: string }>;

export const generateMetadata = async (
	props: { params: Params },
	parent: ResolvingMetadata
) => {
	const params = await props.params;
	const formattedProps = encodeURIComponent(params.cleanName);
	const event: SingleEventProps = await getEventsByCleanName(
		formattedProps ?? ""
	);

	if (event === null || event === undefined) {
		return {
			title: "Page not found",
			description: "This page you are trying to access does not exist.",
		};
	}

	return {
		title: event.title,
		description: `Read more about this event by tapping the link.`,
		openGraph: {
			images: [
				{
					url: event.image,
					width: 1200,
					height: 630,
				},
			],
			twitter: {
				card: "summary_large_image",
				title: event.title,
				description: `Read more about this event by tapping the link.`,
				images: [event.image],
			},
		},
	};
};

export default async function SingleEventPage(props: { params: Params }) {
	const params = await props.params;
	const formattedProps = encodeURIComponent(params.cleanName);
	const event: SingleEventProps = await getEventsByCleanName(
		formattedProps ?? ""
	);

	const now = stripTime(new Date());
	const startDate = stripTime(new Date(event?.startDate ?? now));
	const endDate = stripTime(new Date(event?.endDate ?? now));

	return (
		<div className=" relative">
			<Image
				src={"/resources/background-screen.gif"}
				alt="image"
				width={"1000"}
				height={"1000"}
				unoptimized
				className=" relative w-screen h-screen object-cover"
			/>
			<div className=" absolute top-0 h-screen left-0 w-full z-50 bg-[#000000f3] ">
				<ScrollArea className=" h-[100svh]">
					<div className=" px-[10px]">
						<div
							className={`${
								isEqual(now, startDate) ||
								isBefore(now, endDate)
									? "mt-[20px]"
									: " mt-[70px]"
							}`}
						>
							<Image
								src={
									event.image?.startsWith("http") ||
									event.image?.startsWith("/")
										? event.image
										: "/resources/no-image.png"
								}
								alt="image"
								width={"1000"}
								height={"1000"}
								className=" w-full h-[300px] rounded-[24px] object-cover"
							/>
							<div className=" mt-[10px] flex items-center gap-2">
								<div
									className={` ${
										isAfter(now, startDate) ||
										isAfter(now, endDate)
											? " bg-error"
											: "animate-caret-blink bg-white"
									}  w-[8px] h-[8px]`}
								></div>
								{isAfter(now, startDate) ||
								isAfter(now, endDate) ? (
									<p className=" text-error text-[10px]">
										Registration closed
									</p>
								) : (
									<p className=" text-[10px]">
										Registration on-going
									</p>
								)}
							</div>
							<div className=" mt-[10px]   ">
								<div className="flex items-center justify-between">
									<p className="text-[24px] capitalize">
										{event.title.toLowerCase()}
									</p>
									<ShareButton
										url={`/event/${event.cleanName}`}
										description={event.description}
										title={event.title}
									/>
								</div>

								<div className=" flex justify-between items-center">
									<div className=" flex mt-[10px] items-center gap-3">
										<FaUserCircle className=" w-[30px] h-[30px]" />
										<div className="">
											<p className=" text-[10px] text-accent">
												Presented by
											</p>
											<p className=" text-[14px]">
												{event.host ?? "No host name"}
											</p>
										</div>
									</div>
									{/* <div className=" flex gap-2">
                    <Link href={""}>
                      <AiFillInstagram />
                    </Link>
                    <Link href="">
                      <BsGlobe />
                    </Link>
                    <Link href={""}>
                      <IoLogoLinkedin />
                    </Link>
                  </div> */}
								</div>
								<div className=" flex items-center gap-2 mt-[20px]">
									<SingleDayDisplay date={event.startDate} />
									<div className="">
										<p className=" text-[16px]">
											{format(
												event.startDate,
												"iiii, LLLL d"
											)}
										</p>
										<p className=" text-[14px]">
											{event.time ?? "No time provided"}
										</p>
									</div>
								</div>
								<div className="  flex items-center gap-2 mt-[10px]">
									<div className=" bg-secondary flex items-center justify-center w-[40px] border-accent h-[40px] border rounded-[12px] ">
										<PiMapPinFill className=" w-[20px] h-[20px]" />
									</div>
									<div className="  w-[80%]">
										<p className=" line-clamp-2 text-[16px] capitalize">
											{event.location.toLowerCase()}
										</p>
										{SETTINGS.google_api.isWorking && (
											<p className=" text-accent text-[14px] capitalize">
												{event.town.toLowerCase()}
											</p>
										)}
									</div>
								</div>
								<div className=" mt-[30px] rounded-[20px] overflow-hidden  border border-accent  ">
									<div className=" bg-secondary">
										<p className=" px-[20px] py-[10px] text-[14px]">
											Registration Information
										</p>
									</div>
									<div className="px-[20px] flex items-center gap-2 py-[20px]">
										<div className=" w-[32px] rounded-[12px] h-[32px] flex items-center justify-center bg-secondary border border-accent">
											<HiTicket className=" w-[20px] h-[20px]" />
										</div>
										<div className="">
											<p className=" text-[14px]">
												Event admission is still ongoing
											</p>
											<p className=" text-[10px]">
												If you’d like, you can still
												register.
											</p>
										</div>
									</div>
									<hr className=" h-[0.5px]" />

									<div className=" px-[20px] flex gap-4 flex-col py-[15px]">
										<p className=" text-[14px]">
											Please click on the button below to
											register for the event. You will
											recieve an email notification for
											your entry
										</p>
										<Button
											asChild
											className=" rounded-[12px] py-[25px] font-semibold text-[16px]"
										>
											<Link
												href={`/user/events/${event.cleanName.toLowerCase()}`}
											>
												Become an attendee
											</Link>
										</Button>
									</div>
								</div>

								<div className=" mt-[10px]">
									<p className=" py-[20px]">About Event</p>
									<hr className=" h-[0.5px]" />
									<div className=" py-[20px]">
										<p className=" text-[16px]">
											{event.description ??
												"No description provided"}
										</p>
									</div>
									<p className=" py-[20px]">Location</p>
									<hr className=" h-[0.5px]" />
									<div className=" py-[20px]">
										<p className=" capitalize text-[16px]">
											{event.location.toLowerCase()}
										</p>
										{SETTINGS.google_api.isWorking && (
											<p className=" text-[12px] capitalize">
												{event.town.toLowerCase()}
											</p>
										)}

										<div className=" mt-[10px]">
											<EventMapLocation event={event} />
										</div>
										<div className=" mt-[30px]">
											<Link
												href={""}
												className=" underline"
											>
												Report Event
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
