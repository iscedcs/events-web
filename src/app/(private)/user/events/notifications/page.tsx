import MarkAllAsRead from "@/components/pages/user/events/notifications/mark-all-as-read-button";
import NotificationView from "@/components/pages/user/events/notifications/notification-view";
import Header from "@/components/shared/layout/header";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import { getUnreadNotificationsCount } from "../../../../../../actions/notifications";

export default async function Notifications() {
	const me = await getCurrentUser();
	const user = me ? await getUserByID(me.id!) : null;

	const count = await getUnreadNotificationsCount();
	return (
		<div>
			<Header hasBack title="Notifications" user={user} />
			<div className=" min-h-screen px-[10px] pb-[80px] pt-[70px]">
				<NotificationView />
				{count > 0 && <MarkAllAsRead />}
			</div>
		</div>
	);
}
