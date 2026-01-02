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
import { MediaType } from "@prisma/client";
import { FileImage, LoaderCircle, Trash, Video } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FeedCreateView({ eventId }: { eventId: string }) {
	const [mediaType, setMediaType] = useState<MediaType>("IMAGE");
	const [captionText, setCaptionText] = useState("");
	const [loading, setLoading] = useState(false);
	const [mediaUrl, setMediaUrl] = useState("");
	const [open, setOpen] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	// const [error, setErrorMessage] = useState("");

	const MAX_FILE_SIZE = 100 * 1024 * 1024;
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

	const handleMediaUpload = async ({
		file,
		mediaType,
	}: {
		file: File;
		mediaType: MediaType;
	}) => {
		setLoading(true);
		if (file.size > MAX_FILE_SIZE) {
			toast.error("Media must be less than 100MB");
			setLoading(false);
			return;
		}
		switch (mediaType) {
			case "IMAGE":
				setMediaType("IMAGE");
				break;
			case "VIDEO":
				setMediaType("VIDEO");
				break;
			default:
				setMediaType("IMAGE");
				break;
		}

		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const result = await response.json();

			if (result.success) {
				setMediaUrl(result.url);
				setLoading(false);
				// toast.success("Image uploaded successfully");
			} else {
				toast.error(result.error || "Failed to upload media");
				setLoading(false);
			}
		} catch (e: any) {
			console.error(e);
			setLoading(false);

			toast.error("An error occurred while uploading the image");
		}
	};

	const handleDeleteImage = () => {
		setMediaUrl("");
		toast.info("Media removed");
	};

	const handleSubmit = async () => {
		setLoading(true);
		setSubmitting(true);
		const payload = {
			eventId,
			mediaUrl,
			mediaType,
			caption: captionText,
		};

		try {
			const res = await fetch("/api/feed/new", {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			// console.log({ data });
			if (res.ok) {
				toast.success("Your post has been sent");
				router.push("./../../highlights");
				setLoading(false);
				setSubmitting(false);
			} else {
				toast.error("Your post was not sent");
				setLoading(false);
				setSubmitting(false);
				router.refresh();
			}
		} catch (e: any) {
			console.log("Unable to make feed post", e);
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
				{mediaUrl === "" && (
					<div className=" mt-[10px] flex gap-3">
						<div
							onClick={() =>
								document.getElementById("image-upload")?.click()
							}
							className=""
						>
							<div
								className={`py-[15px] px-[15px] rounded-full  ${
									loading ? " bg-[#121212]" : "bg-secondary"
								}`}
							>
								{loading ? (
									<LoaderCircle className=" animate-spin w-4 h-4" />
								) : (
									<FileImage className=" w-4 h-4" />
								)}
							</div>
							<input
								id="image-upload"
								type="file"
								accept="image/*"
								disabled={loading}
								className="hidden"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file)
										handleMediaUpload({
											file,
											mediaType: "IMAGE",
										});
								}}
							/>
						</div>
						<div
							onClick={() =>
								document.getElementById("video-upload")?.click()
							}
							className=""
						>
							<div
								className={`py-[15px] px-[15px] rounded-full  ${
									loading ? " bg-[#121212]" : "bg-secondary"
								}`}
							>
								{loading ? (
									<LoaderCircle className=" animate-spin w-4 h-4" />
								) : (
									<Video className=" w-4 h-4" />
								)}
							</div>
							<input
								id="video-upload"
								type="file"
								accept="video/*"
								disabled={loading}
								className="hidden"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file)
										handleMediaUpload({
											file,
											mediaType: "VIDEO",
										});
								}}
							/>
						</div>
					</div>
				)}
				{mediaUrl && (
					<div className=" relative mb-[20px] mt-[15px]">
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
						<div
							onClick={handleDeleteImage}
							className=" rounded-full mt-[10px] mr-[10px] right-0 top-0 absolute py-[15px] px-[15px] bg-secondary"
						>
							<Trash className=" w-4 h-4" />
						</div>
					</div>
				)}
				<div className=" fixed w-full right-0 px-[10px] bottom-0 mb-[20px] ">
					<Button
						disabled={
							mediaUrl === "" ||
							captionText.length === 0 ||
							loading
						}
						onClick={handleSubmit}
						className="  flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]"
					>
						{submitting ? (
							<>
								<LoaderCircle className=" animate-spin" />
								<p>Making post</p>
							</>
						) : (
							<>
								<p>Post</p>
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
