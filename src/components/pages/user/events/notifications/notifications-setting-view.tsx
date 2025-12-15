"use client";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotificationsSettingView({
	chatMessageEnabled,
	emailEnabled,
	eventReminderEnabled,
	eventStartingEnabled,
	inAppEnabled,
	notificationsEnabled,
	pushEnabled,
	systemEnabled,
}: {
	notificationsEnabled: boolean;
	pushEnabled: boolean;
	inAppEnabled: boolean;
	emailEnabled: boolean;
	chatMessageEnabled: boolean;
	eventReminderEnabled: boolean;
	eventStartingEnabled: boolean;
	systemEnabled: boolean;
}) {
	const [loading, setLoading] = useState(false);
	const [preferenceType, setPreferenceType] = useState<{
		notificationsEnabled: boolean;
		pushEnabled: boolean;
		inAppEnabled: boolean;
		emailEnabled: boolean;
		chatMessageEnabled: boolean;
		eventReminderEnabled: boolean;
		eventStartingEnabled: boolean;
		systemEnabled: boolean;
	}>({
		chatMessageEnabled: chatMessageEnabled,
		emailEnabled: emailEnabled,
		eventReminderEnabled: eventReminderEnabled,
		eventStartingEnabled: eventStartingEnabled,
		inAppEnabled: inAppEnabled,
		notificationsEnabled: notificationsEnabled,
		pushEnabled: pushEnabled,
		systemEnabled: systemEnabled,
	});

	const router = useRouter();

	const handleUpdateSinglePreference = async ({
		selectedPreference,
	}: {
		selectedPreference:
			| "notificationsEnabled"
			| "pushEnabled"
			| "inAppEnabled"
			| "emailEnabled"
			| "chatMessageEnabled"
			| "eventReminderEnabled"
			| "eventStartingEnabled"
			| "systemEnabled";
	}) => {
		const url = "/api/notifications/update";
		const headers = {
			"Content-Type": "application/json",
		};
		const method = "PATCH";

		switch (selectedPreference) {
			case "chatMessageEnabled": {
				setLoading(true);
				const res = await fetch(url, {
					method,
					headers,
					body: JSON.stringify({
						chatMessageEnabled: !preferenceType.chatMessageEnabled,
					}),
				});
				const data = await res.json();

				if (res.ok) {
					setPreferenceType({
						chatMessageEnabled: data.data.chatMessageEnabled,
						emailEnabled: data.data.emailEnabled,
						eventReminderEnabled: data.data.eventReminderEnabled,
						eventStartingEnabled: data.data.eventStartingEnabled,
						inAppEnabled: data.data.inAppEnabled,
						notificationsEnabled: data.data.notificationsEnabled,
						pushEnabled: data.data.pushEnabled,
						systemEnabled: data.data.systemEnabled,
					});
					setLoading(false);
				}
				break;
			}
			case "emailEnabled": {
				setLoading(true);
				const res = await fetch(url, {
					method,
					headers,
					body: JSON.stringify({
						emailEnabled: !preferenceType.emailEnabled,
					}),
				});
				const data = await res.json();

				if (res.ok) {
					setPreferenceType({
						chatMessageEnabled: data.data.chatMessageEnabled,
						emailEnabled: data.data.emailEnabled,
						eventReminderEnabled: data.data.eventReminderEnabled,
						eventStartingEnabled: data.data.eventStartingEnabled,
						inAppEnabled: data.data.inAppEnabled,
						notificationsEnabled: data.data.notificationsEnabled,
						pushEnabled: data.data.pushEnabled,
						systemEnabled: data.data.systemEnabled,
					});
					setLoading(false);
				}
				break;
			}
			case "eventReminderEnabled": {
				setLoading(true);
				const res = await fetch(url, {
					method,
					headers,
					body: JSON.stringify({
						eventReminderEnabled:
							!preferenceType.eventReminderEnabled,
						eventStartingEnabled:
							!preferenceType.eventStartingEnabled,
					}),
				});
				const data = await res.json();

				if (res.ok) {
					setPreferenceType({
						chatMessageEnabled: data.data.chatMessageEnabled,
						emailEnabled: data.data.emailEnabled,
						eventReminderEnabled: data.data.eventReminderEnabled,
						eventStartingEnabled: data.data.eventStartingEnabled,
						inAppEnabled: data.data.inAppEnabled,
						notificationsEnabled: data.data.notificationsEnabled,
						pushEnabled: data.data.pushEnabled,
						systemEnabled: data.data.systemEnabled,
					});
					setLoading(false);
				}
				break;
			}
			case "inAppEnabled": {
				setLoading(true);
				const res = await fetch(url, {
					method,
					headers,
					body: JSON.stringify({
						inAppEnabled: !preferenceType.inAppEnabled,
					}),
				});
				const data = await res.json();

				if (res.ok) {
					setPreferenceType({
						chatMessageEnabled: data.data.chatMessageEnabled,
						emailEnabled: data.data.emailEnabled,
						eventReminderEnabled: data.data.eventReminderEnabled,
						eventStartingEnabled: data.data.eventStartingEnabled,
						inAppEnabled: data.data.inAppEnabled,
						notificationsEnabled: data.data.notificationsEnabled,
						pushEnabled: data.data.pushEnabled,
						systemEnabled: data.data.systemEnabled,
					});
					setLoading(false);
				}
				break;
			}
			case "notificationsEnabled": {
				setLoading(true);
				const res = await fetch(url, {
					method,
					headers,
					body: JSON.stringify({
						notificationsEnabled:
							!preferenceType.notificationsEnabled,
						chatMessageEnabled:
							preferenceType.notificationsEnabled === true
								? false
								: true,
						emailEnabled:
							preferenceType.notificationsEnabled === true
								? false
								: true,
						eventReminderEnabled:
							preferenceType.notificationsEnabled === true
								? false
								: true,
						eventStartingEnabled:
							preferenceType.notificationsEnabled === true
								? false
								: true,
						inAppEnabled:
							preferenceType.notificationsEnabled === true
								? false
								: true,
						pushEnabled:
							preferenceType.notificationsEnabled === true
								? false
								: true,
						systemEnabled:
							preferenceType.notificationsEnabled === true
								? false
								: true,
					}),
				});
				const data = await res.json();

				if (res.ok) {
					setPreferenceType({
						chatMessageEnabled: data.data.chatMessageEnabled,
						emailEnabled: data.data.emailEnabled,
						eventReminderEnabled: data.data.eventReminderEnabled,
						eventStartingEnabled: data.data.eventStartingEnabled,
						inAppEnabled: data.data.inAppEnabled,
						notificationsEnabled: data.data.notificationsEnabled,
						pushEnabled: data.data.pushEnabled,
						systemEnabled: data.data.systemEnabled,
					});
					setLoading(false);
				}
				break;
			}
			case "pushEnabled": {
				setLoading(true);
				const res = await fetch(url, {
					method,
					headers,
					body: JSON.stringify({
						pushEnabled: !preferenceType.pushEnabled,
					}),
				});
				const data = await res.json();

				if (res.ok) {
					setPreferenceType({
						chatMessageEnabled: data.data.chatMessageEnabled,
						emailEnabled: data.data.emailEnabled,
						eventReminderEnabled: data.data.eventReminderEnabled,
						eventStartingEnabled: data.data.eventStartingEnabled,
						inAppEnabled: data.data.inAppEnabled,
						notificationsEnabled: data.data.notificationsEnabled,
						pushEnabled: data.data.pushEnabled,
						systemEnabled: data.data.systemEnabled,
					});
					setLoading(false);
				}
				break;
			}
			case "systemEnabled": {
				setLoading(true);
				const res = await fetch(url, {
					method,
					headers,
					body: JSON.stringify({
						systemEnabled: !preferenceType.systemEnabled,
					}),
				});
				const data = await res.json();

				if (res.ok) {
					setPreferenceType({
						chatMessageEnabled: data.data.chatMessageEnabled,
						emailEnabled: data.data.emailEnabled,
						eventReminderEnabled: data.data.eventReminderEnabled,
						eventStartingEnabled: data.data.eventStartingEnabled,
						inAppEnabled: data.data.inAppEnabled,
						notificationsEnabled: data.data.notificationsEnabled,
						pushEnabled: data.data.pushEnabled,
						systemEnabled: data.data.systemEnabled,
					});
					setLoading(false);
				}
				break;
			}
		}
	};

	return (
		<div className="">
			<div className=" rounded-[12px] bg-secondary ">
				<div className=" px-[20px] ">
					<div className="py-[20px] flex items-center justify-between">
						<div className="">
							<p className=" ">In-App Notifications</p>
							<p className=" text-accent text-[12px]">
								Get all notifications in app
							</p>
						</div>
						<Switch
							disabled={loading}
							onClick={() => {
								handleUpdateSinglePreference({
									selectedPreference: "inAppEnabled",
								});
							}}
							checked={preferenceType.inAppEnabled}
						/>
					</div>
					<Separator className=" bg-accent" />
				</div>
				<div className=" px-[20px] ">
					<div className="py-[20px] flex items-center justify-between">
						<div className="">
							<p className="">Email Notifications</p>
							<p className=" text-accent text-[12px]">
								Get notifications via email
							</p>
						</div>
						<Switch
							disabled={loading}
							onClick={() => {
								handleUpdateSinglePreference({
									selectedPreference: "emailEnabled",
								});
							}}
							checked={preferenceType.emailEnabled}
						/>
					</div>
					<Separator className=" bg-accent" />
				</div>
				<div className=" px-[20px] ">
					<div className="py-[20px] flex items-center justify-between">
						<div className="">
							<p>Chat Messages</p>
							<p className=" text-accent text-[12px]">
								Get notifications from chatrooms you are in
							</p>
						</div>
						<Switch
							disabled={loading}
							onClick={() => {
								handleUpdateSinglePreference({
									selectedPreference: "chatMessageEnabled",
								});
							}}
							checked={preferenceType.chatMessageEnabled}
						/>
					</div>
					<Separator className=" bg-accent" />
				</div>
				<div className=" px-[20px] ">
					<div className="py-[20px] flex items-center justify-between">
						<div className="">
							<p>Push Notifications</p>
							<p className=" text-accent text-[12px]">
								Get push notifications on your device
							</p>
						</div>
						<Switch
							disabled={loading}
							onClick={() => {
								handleUpdateSinglePreference({
									selectedPreference: "pushEnabled",
								});
							}}
							checked={preferenceType.pushEnabled}
						/>
					</div>
					<Separator className=" bg-accent" />
				</div>
				<div className=" px-[20px] ">
					<div className="py-[20px] flex items-center justify-between">
						<div className="">
							<p>Event Reminders</p>
							<p className=" text-accent text-[12px]">
								Get event reminders and event updates
							</p>
						</div>
						<Switch
							checked={
								preferenceType.eventReminderEnabled &&
								preferenceType.eventStartingEnabled
							}
							disabled={loading}
							onClick={() => {
								handleUpdateSinglePreference({
									selectedPreference: "eventReminderEnabled",
								});
							}}
						/>
					</div>
					<Separator className=" bg-accent" />
				</div>
				<div className=" px-[20px] ">
					<div className="py-[20px] flex items-center justify-between">
						<div className="">
							<p>System Notifications</p>
							<p className=" text-accent text-[12px]">
								Includes all system notifications like product
								updates
							</p>
						</div>
						<Switch
							disabled={loading}
							onClick={() => {
								handleUpdateSinglePreference({
									selectedPreference: "systemEnabled",
								});
							}}
							checked={preferenceType.systemEnabled}
						/>
					</div>
				</div>
			</div>

			<div className=" mt-[20px] rounded-[12px] bg-secondary ">
				<div className=" px-[20px] ">
					<div className="py-[20px] flex items-center justify-between">
						{preferenceType.notificationsEnabled === true ? (
							<div className="">
								<p>All Notifications Enabled</p>
								<p className=" text-error text-[12px]">
									Disable all notifications by turning this
									off
								</p>
							</div>
						) : (
							<div className="">
								<p>All Notifications Disabled</p>
								<p className=" text-error text-[12px]">
									Enable all notifications by turning this on
								</p>
							</div>
						)}

						<Switch
							disabled={loading}
							onClick={() => {
								handleUpdateSinglePreference({
									selectedPreference: "notificationsEnabled",
								});
							}}
							checked={preferenceType.notificationsEnabled}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
