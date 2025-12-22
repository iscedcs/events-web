import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { LuTicket } from "react-icons/lu";
import { PiCrownBold } from "react-icons/pi";

export default function SingleTicketCard({
	cleanName,
	image,
	startDate,
	time,
	title,
	location,
	ticketId,
	isFree,
	ticketTitle,
}: {
	image: string;
	cleanName: string;
	isFree: boolean;
	title: string;
	ticketTitle: string;
	location: string;
	startDate: Date;
	time: string;
	ticketId: string;
}) {
	return (
		<Link
			href={`/user/events/${cleanName.toLowerCase()}/ticket/${ticketId}`}
			className="  py-[10px] rounded-[30px] px-[20px] bg-secondary"
		>
			<div className="flex gap-5 items-center">
				<Image
					className=" w-[100px] rounded-[20px] h-[100px] object-cover"
					src={image ? image : "/resources/no-image.png"}
					alt="image"
					width={"1000"}
					height={"1000"}
				/>
				<div className=" w-[50%]">
					<div className={` flex gap-2 items-center`}>
						<p className=" text-accent text-[12px]">
							{ticketTitle}
						</p>
						{isFree ? (
							<div className=" bg-success px-[8px] py-[3px] rounded-[12px]">
								<LuTicket className="  w-[15px] h-[15px]" />
							</div>
						) : (
							<div className="px-[8px] py-[3px] rounded-[12px]  bg-[#F9AA4B]">
								<PiCrownBold className=" w-[15px] h-[15px]" />
							</div>
						)}
					</div>
					<p className=" capitalize line-clamp-2  mt-[4px] ">
						{title.toLowerCase()}
					</p>
					<p className=" text-[14px] text-accent">
						{format(startDate, "eee LLL d")}, {time}
					</p>
					<p className=" capitalize line-clamp-2 text-accent text-[14px]">
						{location.toLowerCase()}
					</p>
				</div>
			</div>
		</Link>
	);
}
