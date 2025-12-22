import Header from "@/components/shared/layout/header";
import { getCurrentUser } from "../../../../../../actions/auth";
import { getUserByID } from "../../../../../../actions/user";
import BookmarksDisplay from "@/components/pages/user/me/bookmarks/bookmarks-display";

export default async function MyBookmarks() {
	const me = await getCurrentUser();
	const user = await getUserByID(me?.id ?? "");
	return (
		<div>
			<Header hasBack title={"My Bookmarks"} user={user} />
			<div className=" px-[10px] pt-[70px]">
				<BookmarksDisplay userId={me?.id!} />
			</div>
		</div>
	);
}
