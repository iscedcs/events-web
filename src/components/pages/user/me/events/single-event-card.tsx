import { format } from "date-fns";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SingleEventCard({
	attendeeNumber,
	cleanName,
	image,
	startDate,
	ticketNumer,
	time,
	title,
	location,
}: {
	image: string;
	cleanName: string;
	ticketNumer: string;
	attendeeNumber: string;
	title: string;
	location: string;
	startDate: Date;
	time: string;
}) {
	return (
		<Link
			href={`/user/events/${cleanName.toLowerCase()}`}
			className=" flex gap-5 items-center py-[10px] rounded-[30px] px-[20px] bg-secondary"
		>
			<Image
				className=" w-[100px] rounded-[20px] h-[100px] object-cover"
				src={image ? image : "/resources/no-image.png"}
				alt="image"
				width={"1000"}
				height={"1000"}
			/>
			<div className=" w-[50%]">
				<p className=" capitalize line-clamp-2  mt-[10px] ">
					{title.toLowerCase()}
				</p>
				<p className=" text-[14px] text-accent">
					{format(startDate, "eee LLL d")}, {time}
				</p>
				<p className=" capitalize line-clamp-2 text-accent text-[14px]">
					{location.toLowerCase()}
				</p>
				<span className=" flex-col flex items-start gap-1">
					<div className=" flex gap-2 items-center">
						<CircleCheck className=" text-success w-3 h-3" />
						<p className=" text-[14px]  text-success">
							{ticketNumer} tickets
						</p>
					</div>
					<div className="flex gap-2 items-center">
						<CircleCheck className=" text-success w-3 h-3" />
						<p className=" text-[14px] text-success">
							{attendeeNumber} attendees
						</p>
					</div>
				</span>
			</div>
		</Link>
	);
}
