"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { updateUserSchema } from "@/lib/schema/update-user";
import { UserProps } from "@/lib/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ChevronDownIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiRename } from "react-icons/bi";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { PiTrash } from "react-icons/pi";
import { toast } from "sonner";
import z from "zod";

export type updateUserValues = z.infer<typeof updateUserSchema>;
export default function EditUserForm({
	user,
	id,
}: {
	user: UserProps | null | undefined;
	id: string;
}) {
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(undefined);
	const router = useRouter();
	// console.log({ id })

	const form = useForm<updateUserValues>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			displayPicture: user?.displayPicture ?? "",
			dob: user?.dob
				? new Date(user.dob).toISOString()
				: new Date().toISOString(),
			email: user?.email ?? "",
			firstName: user?.firstName ?? "",
			lastName: user?.lastName ?? "",
			phone: user?.phone ?? "",
			address: user?.address ?? "",
		},
		mode: "all",
	});

	const handleImageUpload = async (file: File) => {
		setIsUploadingImage(true);

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const result = await response.json();
			if (result.success) {
				form.setValue("displayPicture", result.url);
				toast.success("Profile image uploaded successfully");
			} else {
				toast.error(result.error || "Failed to upload profile image");
			}
		} catch (error) {
			toast.error("An error occurred while uploading the profile image");
			console.error(error);
		} finally {
			setIsUploadingImage(false);
		}
	};

	const handleDeleteImage = () => {
		form.setValue("displayPicture", "");
	};

	const handleSubmit = async (data: updateUserValues) => {
		try {
			setLoading(true);
			const payload = {
				address: data.address,
				displayPicture: data.displayPicture,
				dob: data.dob,
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				phone: data.phone,
				id: id,
			};
			const res = await fetch("/api/user/update", {
				body: JSON.stringify(payload),
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				toast.success("Profile updated successfully");
				router.push("/user/me");
				setLoading(false);
			} else {
				toast.error("Profile was not updated");
				form.reset();
				router.refresh();
				setLoading(false);
			}
		} catch (e: any) {
			console.log("Something went wrong with updating profile", e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className=" pb-[100px] h-[100svh] flex flex-col justify-between"
			>
				<div className="">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem className=" relative">
								<BiRename className=" top-1/2 -translate-y-1/2  absolute w-6 h-6" />
								<Input
									{...field}
									className=" text-[18px] pl-[50px] placeholder:font-bold rounded-none py-[30px] border-t-0 border-l-0 border-r-0"
								/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem className=" relative">
								<BiRename className=" top-1/2 -translate-y-1/2  absolute w-6 h-6" />
								<Input
									{...field}
									className=" text-[18px] pl-[50px] placeholder:font-bold rounded-none py-[30px] border-t-0 border-l-0 border-r-0"
								/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className=" relative">
								<MdEmail className=" text-accent top-1/2 -translate-y-1/2  absolute w-6 h-6" />
								<Input
									disabled
									{...field}
									className=" text-[18px] pl-[50px] placeholder:font-bold rounded-none py-[30px] border-t-0 border-l-0 border-r-0"
								/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className=" relative">
								<FaPhoneAlt className=" top-1/2 -translate-y-1/2  absolute w-5 h-5" />
								<Input
									{...field}
									className=" text-[18px] pl-[50px] placeholder:font-bold rounded-none py-[30px] border-t-0 border-l-0 border-r-0"
								/>
							</FormItem>
						)}
					/>

					<FormField
						name="dob"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger
										className=" relative"
										asChild
									>
										<div className="">
											<BsCalendarDateFill className=" top-1/2 -translate-y-1/2  absolute w-5 h-5" />
											<Button
												variant="outline"
												type="button"
												id="date"
												className="w-full pl-[50px] py-[30px] text-[18px] border-t-0 border-l-0 border-r-0 rounded-none justify-between font-normal"
											>
												{field.value
													? format(
															new Date(
																field.value
															),
															"PPP"
													  )
													: "Select date"}
											</Button>
										</div>
									</PopoverTrigger>
									<PopoverContent
										className=" bg-secondary text-white border-0 overflow-hidden p-0"
										align="start"
									>
										<Calendar
											mode="single"
											captionLayout="dropdown"
											selected={
												field.value
													? new Date(field.value)
													: undefined
											}
											onSelect={(selectedDate) => {
												field.onChange(
													selectedDate?.toISOString()
												);
												setOpen(false);
											}}
										/>
									</PopoverContent>
								</Popover>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem className=" relative">
								<MdLocationPin className=" top-1/2 -translate-y-1/2  absolute w-5 h-5" />
								<Input
									{...field}
									className=" text-[18px] pl-[50px] placeholder:font-bold rounded-none py-[30px] border-t-0 border-l-0 border-r-0"
								/>
							</FormItem>
						)}
					/>

					<FormField
						name="displayPicture"
						control={form.control}
						render={({ field }) => (
							<FormItem className=" mt-[25px]">
								<p className=" text-[20px]">
									Add a profile picture
								</p>
								<FormControl>
									<div className="">
										<input
											type="file"
											accept="image/*"
											onChange={(e) => {
												const file =
													e.target.files?.[0];
												if (file)
													handleImageUpload(file);
											}}
											className="hidden"
											id="event-image-upload"
											disabled={isUploadingImage}
										/>
										<div className=" h-[150px] border-[2px] border-dashed rounded-[8px] bg-secondary w-[30%]">
											<div
												onClick={() =>
													document
														.getElementById(
															"event-image-upload"
														)
														?.click()
												}
												className=" flex items-center h-full justify-center "
											>
												{field.value ? (
													<div className=" w-full relative h-full">
														<div className=" w-full absolute h-full flex justify-center items-center bg-black/60 ">
															<PiTrash
																onClick={() => {
																	handleDeleteImage();
																}}
																className=" w-[24px] h-[24px]"
															/>
														</div>
														<Image
															src={
																field.value ||
																""
															}
															alt="profile image"
															width={"1000"}
															height={"1000"}
															className=" object-cover h-full w-full rounded-[8px]"
														/>
													</div>
												) : (
													<p className=" text-[20px]">
														+
													</p>
												)}
											</div>

											<Button
												type="button"
												onClick={() =>
													form.setValue(
														"displayPicture",
														""
													)
												}
												className="bg-white absolute top-1 right-1 rounded-full shadow-lg p-1"
											></Button>
										</div>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<div className=" mt-[20px]">
					<Button
						disabled={loading}
						type="submit"
						className="w-full rounded-[12px] font-semibold py-[24px]"
					>
						{loading ? (
							<LoaderCircle className=" animate-spin" />
						) : (
							<p>Update</p>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
