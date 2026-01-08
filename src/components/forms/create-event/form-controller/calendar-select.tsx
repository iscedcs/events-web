import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, SetStateAction } from "react";
import { FaCalendarDay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function CalendarSelect({
	calendarSelection,
	setCalendarSelection,
}: {
	calendarSelection: "" | "google" | "apple";
	setCalendarSelection: Dispatch<SetStateAction<"" | "google" | "apple">>;
}) {
	return (
		<Select
			value={calendarSelection}
			onValueChange={(value) =>
				setCalendarSelection(value as "google" | "apple")
			}
		>
			<SelectTrigger className="bg-secondary border-0 text-white px-[10px] py-[20px] rounded-[12px] flex items-center gap-2">
				<FaCalendarDay className="w-[18px] h-[18px]" />
				<SelectValue placeholder="My Calendar" />
			</SelectTrigger>

			<SelectContent className="w-[60%] rounded-[20px] px-[15px] py-[10px] text-white border-0 bg-secondary">
				<p className="text-accent text-[13px]">
					Choose the calendar of the event:
				</p>

				<div className="mt-[10px]">
					<SelectItem value="google">Google Calendar</SelectItem>
					<SelectItem value="apple">Apple Calendar</SelectItem>
				</div>

				<div className="text-accent mt-[20px] flex gap-3 items-center">
					<IoIosInformationCircleOutline className="w-[20px] h-[20px]" />
					<p className="text-[13px]">
						Creating the event under a calendar grants its admins
						manage access.
					</p>
				</div>
			</SelectContent>
		</Select>
	);
}
