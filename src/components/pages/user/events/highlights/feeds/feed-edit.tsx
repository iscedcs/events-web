"use client";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { MediaType, SingleFeedPostProps } from "@/lib/types/feed";
import { FileImage, LoaderCircle, Video } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FeedEditView({ feed }: { feed: SingleFeedPostProps }) {
	const [mediaType, setMediaType] = useState<MediaType>(
		feed.mediaType ?? "IMAGE"
	);
	const [captionText, setCaptionText] = useState<string>(feed.caption ?? "");
	const [mediaUrl, setMediaUrl] = useState<string>(feed.mediaUrl ?? "");
	const [open, setOpen] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	// const [error, setErrorMessage] = useState("");

	const router = useRouter();

	useEffect(() => {
		const checkCaption = () => {
			if (captionText.length === 300) {
				setOpen(true);
			} else {
				setOpen(false);
			}
		};
		checkCaption();
	}, [captionText.length]);

	const handleSubmit = async () => {
		setSubmitting(true);
		const payload = {
			caption: captionText,
			id: feed.id,
		};

		try {
			const res = await fetch("/api/feed/edit", {
				method: "PATCH",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (res.ok) {
				toast.success("Your post has been edited");
				router.push("./../../../highlights");
				setSubmitting(false);
			} else {
				toast.error("Your post was not edited");
				setSubmitting(false);
				router.refresh();
			}
		} catch (e: any) {
			console.log("Unable to edit feed post", e);
		}
	};

	return (
		<>
			<div className=" relative">
				<Textarea
					value={captionText}
					maxLength={300}
					onChange={(e) => {
						setCaptionText(e.target.value);
					}}
					placeholder="What's happening?"
					className="bg-[#151515] resize-none h-[300px] focus-visible:ring-0 border-0 outline-0 ring-0"
				/>
				{captionText.length > 200 && (
					<div className=" flex items-center justify-between mt-3">
						{/* <p className=" text-accent text-[13px]">Caption size</p> */}
						<Progress
							className=" w-[40%]"
							value={captionText.length - 200}
						/>
						<p
							className={
								captionText.length >= 230
									? "text-error"
									: "text-white"
							}
						>
							{captionText.length}
						</p>
					</div>
				)}

				{mediaUrl && (
					<div className=" relative">
						<div className=" rounded-[20px] absolute w-full h-full bg-[#ffffff4c]"></div>
						<div className="  mb-[20px] mt-[15px]">
							{mediaType === "IMAGE" ? (
								<Image
									alt="image"
									src={mediaUrl}
									width={"1000"}
									height={"1000"}
									className=" rounded-[20px]"
								/>
							) : (
								<video
									src={mediaUrl}
									autoPlay
									playsInline
									controls
									muted
									loop
									className=" rounded-[20px]"
								></video>
							)}
						</div>
					</div>
				)}
				<div className=" fixed w-full right-0 px-[10px] bottom-0 mb-[20px] ">
					<Button
						disabled={
							mediaUrl === "" ||
							submitting ||
							captionText.length === 0
						}
						onClick={handleSubmit}
						className="  flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]"
					>
						{submitting ? (
							<>
								<LoaderCircle className=" animate-spin" />
								<p>Making changes</p>
							</>
						) : (
							<>
								<p>Edit</p>
							</>
						)}
					</Button>
				</div>
			</div>
			<AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
				{/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
				<AlertDialogContent className=" bg-secondary border-0">
					<AlertDialogHeader>
						<AlertDialogTitle>
							Feed Text Limit Reached
						</AlertDialogTitle>
						<AlertDialogDescription>
							Your input has reached the allowed character limit
							for feed text.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className=" bg-white text-black">
							Close
						</AlertDialogCancel>
						{/* <AlertDialogAction>Continue</AlertDialogAction> */}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
