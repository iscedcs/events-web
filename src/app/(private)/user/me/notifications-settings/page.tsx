import Header from "@/components/shared/layout/header";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import NotificationsSettingView from "@/components/pages/user/events/notifications/notifications-setting-view";
import { getUserPreferences } from "../../../../../../actions/notifications";

export default async function NotificationsSettings() {
	const me = await getCurrentUser();
	const user = me ? await getUserByID(me.id!) : null;

	// console.log({ id: me?.id });

	const userPreference = await getUserPreferences();

	return (
		<div>
			<Header hasBack title="Notification Settings" user={user} />
			<div className=" px-[10px] pt-[70px] pb-[70px]">
				<NotificationsSettingView
					chatMessageEnabled={userPreference?.chatMessageEnabled!}
					emailEnabled={userPreference?.emailEnabled!}
					eventReminderEnabled={userPreference?.eventReminderEnabled!}
					eventStartingEnabled={userPreference?.eventStartingEnabled!}
					inAppEnabled={userPreference?.inAppEnabled!}
					notificationsEnabled={userPreference?.notificationsEnabled!}
					pushEnabled={userPreference?.pushEnabled!}
					systemEnabled={userPreference?.systemEnabled!}
				/>
			</div>
		</div>
	);
}
