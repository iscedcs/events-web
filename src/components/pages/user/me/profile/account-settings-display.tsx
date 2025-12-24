import { OctagonX } from "lucide-react";
import Link from "next/link";
import { MdOutlinePassword } from "react-icons/md";

export default async function AccountSettingsDisplay() {
	return (
		<div className=" flex flex-col gap-4">
			<Link
				href={"account-settings/change-password"}
				className=" flex flex-row gap-6 items-center rounded-[10px] py-[15px] px-[20px] bg-secondary w-full"
			>
				<div className="">
					<MdOutlinePassword className=" w-6 h-6" />
				</div>
				<div className="">
					<p className="  text-[18px]">Change Password</p>
					<p className=" text-accent text-[13px]">
						Manage your account's password
					</p>
				</div>
			</Link>
			<div className=" flex flex-row gap-6 items-center rounded-[10px] py-[15px] px-[20px] bg-secondary w-full">
				<div className="">
					<OctagonX className=" w-6 h-6" />
				</div>
				<div className="">
					<p className=" text-[18px]">Delete Account</p>
					<p className=" text-accent text-[13px]">
						Manage your account's deletion and disabling
					</p>
				</div>
			</div>
		</div>
	);
}
