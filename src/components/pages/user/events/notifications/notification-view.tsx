"use client";

import { NotificationProps } from "@/lib/types/notifications";
import React, { useEffect, useState } from "react";
import { getAllUserNotifications } from "../../../../../../actions/notifications";
import SingleNotificationCard from "./single-notification-card";
import NotificationsView from "@/components/skeletons/notifications-view";
import { BellRing } from "lucide-react";

export default function NotificationView() {
	const [loading, setLoading] = useState(true);
	const [notifications, setNotifications] = useState<NotificationProps[]>();
	const [pagination, setPagination] = useState<{
		total: number;
		page: number;
		limit: number;
	}>();

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			const response = await getAllUserNotifications({});

			if (response) {
				setNotifications(response.records);
				setPagination({
					limit: response.limit,
					page: response.page,
					total: response.total,
				});
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	// console.log({ notifications });
	return (
		<div>
			{loading ? (
				<NotificationsView />
			) : (
				<>
					{notifications?.length === 0 ? (
						<div className="">
							<div className=" h-[calc(100svh-55px)] flex items-center flex-col justify-center">
								<BellRing className=" text-accent w-20 h-20" />
								<p>You do not have any notifications</p>
							</div>
						</div>
					) : (
						<>
							<div className=" flex flex-col gap-3">
								{notifications?.map((item) => {
									return (
										<SingleNotificationCard
											body={item.body}
											createdAt={item.createdAt}
											read={item.read}
											title={item.title}
											type={item.type}
											data={item.data}
											key={item.id}
											id={item.id}
										/>
									);
								})}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
