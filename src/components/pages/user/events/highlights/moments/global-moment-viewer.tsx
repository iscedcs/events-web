"use client";

import { SingleMomentPostProps } from "@/lib/types/moment";
import { UserProps } from "@/lib/types/user";
import { useSearchParams, useRouter } from "next/navigation";
import SingleMomentView from "./single-moment-view";
// ... other imports

type Props = {
	allUserMoments: { user: UserProps; moments: SingleMomentPostProps[] }[];
	currentStoryId: string;
	sessionUserId: string;
};

export default function GlobalMomentViewer({
	allUserMoments,
	sessionUserId,
	currentStoryId,
}: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();

	// Find the correct user's moments array
	const activeUserMoments = allUserMoments.find((entry) =>
		entry.moments.some((m) => String(m.id) === String(currentStoryId))
	);

	const momentsForViewer = activeUserMoments?.moments ?? [];

	if (momentsForViewer.length === 0) {
		return <div>Story not found</div>;
	}

	return (
		<SingleMomentView
			sessionUserId={sessionUserId}
			moments={momentsForViewer}
			momentId={currentStoryId}
		/>
	);
}
