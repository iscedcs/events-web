import ResetPasswordForm from "@/components/forms/reset-password/reset-password-form";
import Header from "@/components/shared/layout/header";
import { getAuthInfo, getCurrentUser } from "../../../../../../../actions/auth";
import { getUserByID } from "../../../../../../../actions/user";

export default async function ResetPassword() {
	const me = await getCurrentUser();
	const user = await getUserByID(me?.id ?? "");
	const session = await getAuthInfo();

	return (
		<div>
			<Header hasBack title={"Change Password"} user={user} />
			<p>Hello</p>
			{/* <ResetPasswordForm hash={session?.user?.password ?? ""} /> */}
		</div>
	);
}
