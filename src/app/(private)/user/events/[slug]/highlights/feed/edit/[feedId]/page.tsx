import FeedEditView from "@/components/pages/user/events/highlights/feeds/feed-edit";
import Header from "@/components/shared/layout/header";
import { getCurrentUser } from "../../../../../../../../../../actions/auth";
import { getUserByID } from "../../../../../../../../../../actions/user";
import { getFeedPostById } from "../../../../../../../../../../actions/feeds";

type Params = Promise<{ feedId: string }>;
export default async function Edit(props: { params: Params }) {
	const params = await props.params;
	const me = await getCurrentUser();

	const userId = me?.id ?? null;
	const headerUser = userId ? await getUserByID(userId) : null;

	const feedInfo = await getFeedPostById(params.feedId);

	return (
		<div>
			<Header hasBack title={`Edit post`} user={headerUser} />
			<div className=" relative px-[10px] py-[70px] ">
				<FeedEditView feed={feedInfo!} />
			</div>
		</div>
	);
}
