import { SingleEventProps } from "@/lib/types/event";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineAmpStories, MdOutlineChat } from "react-icons/md";

export default function EventChatButton({
	event,
}: {
	event: SingleEventProps;
}) {
	return (
		// <div>
		//   <Link
		//     href={`/user/events/${event?.cleanName.toLowerCase()}/chat`}
		//     className=" flex gap-4 items-center justify-between  bg-secondary mt-[56px] py-[10px]  px-[10px] "
		//   >
		//     <div className=" flex gap-4 items-center">
		//       <Image
		//         src={
		//           event?.image?.startsWith("http") || event?.image?.startsWith("/")
		//             ? event.image
		//             : "/resources/no-image.png"
		//         }
		//         alt="image"
		//         width={"1000"}
		//         height={"1000"}
		//         className=" w-[48px] border border-white h-[48px] rounded-full object-cover"
		//       />
		//       <div className="">
		//         <p className=" text-[16px] font-medium">Event Chat</p>
		//         <p className=" text-accent text-[12px]">
		//           Join others and participate in event discussions.
		//         </p>
		//       </div>
		//     </div>
		//     <div className="">
		//       <MdOutlineChat className=" w-[20px] h-[20px]" />
		//     </div>
		//   </Link>
		// </div>

		<div className=" py-[10px] flex gap-2 flex-row w-full justify-center  px-[10px] mt-[56px]">
			<Link
				href={`/user/events/${event?.cleanName.toLowerCase()}/chat`}
				className=" rounded-full gap-2 py-[10px] px-[40px] items-center flex bg-secondary"
			>
				<MessageCircleMore className=" w-5 h-5" />
				<p>Chatroom</p>
			</Link>
			<Link
				href={`/user/events/${event?.cleanName.toLowerCase()}/highlights`}
				className=" rounded-full gap-2  py-[10px] px-[40px] items-center flex bg-secondary"
			>
				<MdOutlineAmpStories className=" w-6 h-6" />
				<p>Highlights</p>
			</Link>
		</div>
	);
}
