import EventsTab from "@/components/pages/user/events/events-tab";
import Header from "@/components/shared/layout/header";
import { type NextPage } from "next";
import { getUserByID } from "../../../../../actions/user";
import { getCurrentUser } from "../../../../../actions/auth";
import ShareButtons from "@/components/ui/secondary/share-button";
import ShareButton from "@/components/ui/secondary/share-button";

export const dynamic = "force-dynamic";

type UserEventsProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const UserEvents: NextPage<UserEventsProps> = async ({ searchParams }) => {
	const me = await getCurrentUser();
	const userId = me?.id ?? "";

	const user = userId ? await getUserByID(userId) : null;

	const resolvedSearchParams = await searchParams;
	const tabParam = resolvedSearchParams?.tab;
	const currentTab = Array.isArray(tabParam)
		? tabParam[0]
		: tabParam || "discover";

	return (
		<div>
			<Header title="GADA" user={user} />
			<div className="py-[70px]">
				<EventsTab initialTab={currentTab} userId={userId} />
				<ShareButton />
			</div>
		</div>
	);
};

export default UserEvents;
