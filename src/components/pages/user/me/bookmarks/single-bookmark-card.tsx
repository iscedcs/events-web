import { format } from "date-fns";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SingleBookmarkCard({
	cleanName,
	image,
	startDate,
	time,
	title,
	location,
}: {
	image: string;
	cleanName: string;
	title: string;
	location: string;
	startDate: Date;
	time: string;
}) {
	return (
		<Link
			href={`/user/events/${cleanName.toLowerCase()}`}
			className=" flex gap-5 items-center py-[20px] rounded-[30px] px-[20px] bg-secondary"
		>
			<Image
				className=" w-[100px] rounded-[20px] h-[100px] object-cover"
				src={image ? image : "/resources/no-image.png"}
				alt="image"
				width={"1000"}
				height={"1000"}
			/>
			<div className="">
				<p className=" capitalize line-clamp-2  mt-[10px] ">
					{title.toLowerCase()}
				</p>
				<p className=" text-[14px] text-accent">
					{format(startDate, "eee LLL d")}, {time}
				</p>
				<p className=" capitalize line-clamp-2 text-accent text-[14px]">
					{location.toLowerCase()}
				</p>
			</div>
		</Link>
	);
}
