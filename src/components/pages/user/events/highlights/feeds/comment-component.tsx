"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SingleCommentProps } from "@/lib/types/feed";
import { formatDistance } from "date-fns";
import { EllipsisVertical, Trash } from "lucide-react";
import Image from "next/image";
import { deleteComment } from "../../../../../../../actions/comments";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CommentComponent({
	sessionUserId,
	comment,
}: {
	comment: SingleCommentProps;
	sessionUserId: string;
}) {
	const fullName = `${comment.user?.firstName} ${comment.user?.lastName}`;
	const router = useRouter();

	// console.log({ id: comment.id });

	const handleCommentDelete = async () => {
		try {
			const res = await deleteComment(comment.id);
			if (res) {
				router.refresh();
			} else {
				router.refresh();
				toast.error("Something went wrong with deleting comment");
			}
		} catch (e: any) {
			console.log("Unable to delete cooment", e);
		}
	};

	return (
		<div>
			<div className=" flex items-center justify-between mt-[10px]">
				<div className=" flex items-center gap-3">
					<Image
						src={
							comment.user?.displayPicture! === ""
								? "/resources/no-profile.jpg"
								: comment.user?.displayPicture!
						}
						alt="displayPicture"
						width={"1000"}
						height={"1000"}
						className=" w-[40px] rounded-full h-[40px] object-cover"
					/>
					<div className="">
						<span className=" flex flex-row gap-1.5 justify-between w-full items-center ">
							<div className="">
								<p className=" line-clamp-1 text-[14px] font-bold">
									{fullName}
								</p>
							</div>
							<div className="">
								<p className=" text-right text-[12px] text-accent">
									{formatDistance(
										new Date(comment.createdAt),
										new Date(),
										{
											includeSeconds: true,
											addSuffix: true,
										}
									)}
								</p>
							</div>
						</span>
						<p className=" text-[12px]">{comment.content}</p>
					</div>
				</div>
				{sessionUserId === comment.userId && (
					<div className="">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<EllipsisVertical />
							</DropdownMenuTrigger>
							<DropdownMenuContent className=" mr-[10px] border-0 bg-secondary rounded-[14px]">
								<div className=" px-[10px] py-[10px]">
									<span
										onClick={handleCommentDelete}
										className=" py-[4px] flex items-center gap-5"
									>
										<Trash className=" w-4 h-4 text-error" />
										<p className=" text-error">Delete</p>
									</span>
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</div>
		</div>
	);
}
