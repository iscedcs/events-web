"use client";

import { Button } from "@/components/ui/button";
import { SingleEventProps } from "@/lib/types/event";
import React, { useState } from "react";
import { closeRegistration } from "../../../../../../../actions/events";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TbLoader2 } from "react-icons/tb";

export default function CloseRegistration({
	event,
}: {
	event: SingleEventProps;
}) {
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleRegistrationClose = async () => {
		setLoading(true);
		const data = await closeRegistration(event.id);
		if (data) {
			toast.success("Registration for this event has been closed");
			// window.location.reload();
			router.refresh();
			setLoading(false);
		} else {
			toast.error("Closing registration was not successful");
			// window.location.reload();
			router.refresh();
			setLoading(false);
		}
	};

	return (
		<div className="">
			<Button
				disabled={event.registrationClosed || loading}
				onClick={handleRegistrationClose}
				className=" mt-[30px] flex flex-row items-center w-full rounded-[12px] font-semibold py-[24px]"
			>
				{loading ? (
					<div className=" flex items-center gap-2">
						<TbLoader2 className=" w-[22px] h-[22px] animate-spin" />
						Closing Registration
					</div>
				) : (
					`${
						event.registrationClosed
							? "Registration Closed"
							: "Close Registration"
					}`
				)}
			</Button>
		</div>
	);
}
