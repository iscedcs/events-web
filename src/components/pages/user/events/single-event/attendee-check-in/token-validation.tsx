"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SingleEventProps } from "@/lib/types/event";
import { Check, Crown, LoaderCircle, Ticket } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
	checkInAttendeeWithToken,
	getAttendeeByToken,
} from "../../../../../../../actions/attendee";
import { SingleTicketProps } from "@/lib/types/ticket";
import { getTicketByID } from "../../../../../../../actions/tickets";
import { format } from "date-fns";
import { FaPhoneAlt } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import { SingleAttendeeProps } from "@/lib/types/attendee";

export default function TokenValidation({
	event,
}: {
	event: SingleEventProps;
}) {
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [info, setInfo] = useState<
		| {
				attendee: SingleAttendeeProps | undefined;
				event: SingleEventProps | undefined;
				ticket: SingleTicketProps;
		  }
		| undefined
		| null
	>(null);
	const [isInvalid, setIsInvalid] = useState(false);

	//   console.log({ inputValue });

	const router = useRouter();
	const baseUrl = process.env.NEXT_PUBLIC_URL;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const check = await checkInAttendeeWithToken({
				eventId: event.id,
				token: inputValue.toUpperCase(),
			});

			if (check?.statusCode === "409") {
				router.push(
					`${baseUrl}/user/events/${event?.cleanName.toLowerCase()}/check-in/token/${inputValue.toUpperCase()}?checked=true`
				);
			}
			if (check?.statusCode === "400") {
				router.push(
					`${baseUrl}/user/events/${event?.cleanName.toLowerCase()}/check-in/token/${inputValue.toUpperCase()}?checked=error`
				);
			}
			if ((check as any)?.result) {
				router.push(
					`${baseUrl}/user/events/${event?.cleanName.toLowerCase()}/check-in/token/${inputValue.toUpperCase()}`
				);
			}
		} catch (e: any) {
			console.log("Unable to check in attendee into event", e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!inputValue.trim()) {
			setIsInvalid(false);
			setLoading(false);
			setInfo(null);

			return;
		}

		setLoading(true);
		const fetchAttendee = async () => {
			try {
				const info = await getAttendeeByToken(inputValue.toUpperCase());
				const ticketInfo = await getTicketByID(
					info?.attendee.ticketId ?? ""
				);
				if (!info?.attendee) {
					setInfo(null);
					setIsInvalid(true);
					return;
				}
				setInfo({
					attendee: info?.attendee,
					event: info?.event,
					ticket: ticketInfo,
				});
				if (info) {
					setLoading(false);
					setIsInvalid(false);
				}
			} catch (error) {
				console.error("Error fetching attendee:", error);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};

		const timeout = setTimeout(() => {
			fetchAttendee();
		}, 10);

		return () => clearTimeout(timeout);
	}, [inputValue]);

	return (
		<form onSubmit={handleSubmit}>
			<p className=" text-[24px] font-bold ">Enter the access code</p>
			<div className=" flex h-[100svh] justify-between flex-col">
				<div className="">
					<div className=" relative">
						{loading && (
							<LoaderCircle className=" animate-spin absolute top-1/2 -translate-y-[50%] right-0" />
						)}
						{info?.attendee && loading === false && (
							<Check className=" absolute top-1/2 -translate-y-[50%] right-0" />
						)}
						<Input
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							className={` ${
								isInvalid && " text-error"
							} rounded-none uppercase py-[20px] pr-[28px] text-[20px] border-t-0 border-l-0 border-r-0 mt-[10px]`}
						/>
					</div>

					{info?.attendee ? (
						<>
							{info?.attendee?.eventId !== event.id ? (
								<>
									<div className="flex items-center mt-[10px]">
										<p>
											This code does not belong to this
											event, try using a different code or
											contact support
										</p>
										<Button className=" items-center flex">
											<FaPhoneAlt />
											Support
										</Button>
									</div>
								</>
							) : (
								<div className=" mt-[15px] gap-2 flex">
									{info.ticket.isFree ? (
										<div className=" bg-success border flex items-center justify-center border-white rounded-full w-[48px] h-[48px] ">
											<Ticket />
										</div>
									) : (
										<div className=" bg-[#F9AA4B] border flex items-center justify-center border-white rounded-full w-[48px] h-[48px] ">
											<Crown />
										</div>
									)}
									<div className=" ">
										<p className=" font-bold text-[24px]">
											{info.attendee?.name}
										</p>
										{info.attendee?.checkedIn ? (
											<>
												<p className="">
													Entry time:{" "}
													{format(
														info.attendee
															?.checkedIn,
														"eeee, LLLL c "
													)}
												</p>
												<p className=" text-[14px] text-accent">
													{format(
														info.attendee
															?.checkedIn,
														"p"
													)}{" "}
													· GMT +1 ·{" "}
													{info.ticket.isFree
														? "Free Ticket"
														: "Paid Ticket"}
												</p>
											</>
										) : (
											<>
												{info.event?.startDate && (
													<>
														<p>
															Event time:{" "}
															{format(
																info.event
																	?.startDate,
																"eeee, LLLL c "
															)}
														</p>
														<p className=" text-[14px] text-accent">
															{info?.event?.time}{" "}
															· GMT +1 ·{" "}
															{info.ticket.isFree
																? "Free Ticket"
																: "Paid Ticket"}
														</p>
													</>
												)}
											</>
										)}
										{info.attendee.checkedIn === null ? (
											<div className=" items-center gap-2 flex text-error">
												<div className=" rounded-full bg-error w-3 h-3"></div>
												<p>Not checked in</p>
											</div>
										) : (
											<div className=" items-center gap-2 flex text-success">
												<div className=" rounded-full bg-success w-3 h-3"></div>
												<p>Checked in</p>
											</div>
										)}
									</div>
								</div>
							)}
						</>
					) : (
						<>
							{isInvalid &&
								inputValue.length === 6 &&
								loading === false &&
								info?.attendee === null && (
									<div className=" flex items-center mt-[10px]">
										<p>
											Invalid access code, try rechecking
											the code or contact support
										</p>
										<Button className=" items-center flex">
											<FaPhoneAlt />
											Support
										</Button>
									</div>
								)}
						</>
					)}
					{(isInvalid === false || inputValue.length !== 6) && (
						<Button
							type="submit"
							disabled={
								info === null ||
								loading ||
								info?.attendee?.eventId !== event.id
							}
							className=" mt-[30px] flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]"
						>
							{loading && info !== null && (
								<span className=" animate-spin">
									<LoaderCircle />
								</span>
							)}
							{loading && info !== null
								? "Checking in"
								: "Check in"}
						</Button>
					)}
				</div>
			</div>
		</form>
	);
}
