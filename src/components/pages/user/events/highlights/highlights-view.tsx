import { HiPlus } from "react-icons/hi";
import FeedComponent from "./feeds/feed-component";
import MomentComponent from "./moments/moment-component";
import Link from "next/link";

export default function HightLightsView({
	eventId,
	displayPicture,
}: {
	eventId: string;
	displayPicture: string;
}) {
	return (
		<div className=" ">
			<div className="relative">
				<MomentComponent
					displayPicture={displayPicture}
					eventId={eventId}
				/>

				<FeedComponent
					displayPicture={displayPicture}
					eventId={eventId}
				/>
			</div>
			<Link href={"highlights/feed/create"}>
				<div className=" fixed flex items-center justify-center right-0 bottom-0 mb-[30px] rounded-full mr-[20px] bg-white w-[60px] h-[60px] ">
					<HiPlus className=" w-[30px] h-[30px] text-black" />
				</div>
			</Link>
		</div>
	);
}
