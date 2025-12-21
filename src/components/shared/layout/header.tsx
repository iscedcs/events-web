"use client";
import BackButton from "@/components/ui/secondary/back-button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { HEADERITEMS } from "@/lib/const";
import { HederType } from "@/lib/types/layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBell, FaPowerOff } from "react-icons/fa";
import { getUnreadNotificationsCount } from "../../../../actions/notifications";

export const onSignOut = () => {
	window.location.href = "/api/auth/logout";
};

export default function Header({ title, user, hasBack }: HederType) {
	const fullName = `${user?.firstName} ${user?.lastName}`;
	const [count, setCount] = useState(0);

	// const onSignIn = () => {
	// 	// Where we came from (deep link safe)
	// 	const back = window.location.href;

	// 	// Build IdP sign-in URL with redirect_uri
	// 	const base = process.env.NEXT_PUBLIC_AUTH_BASE_URL!;
	// 	const path = process.env.NEXT_PUBLIC_AUTH_LOGIN_PATH || "/sign-in";
	// 	const authUrl = new URL(path, base);
	// 	authUrl.searchParams.set("redirect_uri", back);

	// 	window.location.href = authUrl.toString();
	// };

	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getUnreadNotificationsCount();
			if (data) {
				setCount(data);
			}
		};
		fetchData();
	}, []);

	return (
		<div className=" flex fixed z-50 w-full left-0 top-0 items-center justify-between px-[20px] py-[10px] bg-secondary">
			<div className=" flex gap-2 items-center">
				{hasBack && <BackButton className=" w-[18px] h-[18px]" />}
				<div className=" line-clamp-1 capitalize text-[12px]">
					{title === "GADA" ? (
						<p>{title}</p>
					) : (
						<p>{title.toLowerCase()}</p>
					)}
				</div>
			</div>

			<div className=" flex items-center gap-5">
				<div className=" relative">
					{count > 0 && (
						<div className=" rounded-full absolute right-0 bg-error w-3 h-3"></div>
					)}
					<FaBell
						onClick={() => {
							router.push("/user/events/notifications");
						}}
						className=" w-5 h-5"
					/>
				</div>
				<Sheet>
					<SheetTrigger asChild>
						<Image
							src={
								user?.displayPicture === ""
									? "/resources/no-profile.jpg"
									: user?.displayPicture!
							}
							width={"1000"}
							height={"1000"}
							alt="image"
							className=" w-[35px] h-[35px] object-cover rounded-full"
						/>
					</SheetTrigger>
					<SheetContent className=" border-0 flex justify-between flex-col bg-secondary py-[30px] px-[20px]">
						<div className="">
							<div className=" flex items-center gap-4">
								<Image
									src={
										user?.displayPicture === ""
											? "/resources/no-profile.jpg"
											: user?.displayPicture!
									}
									width={"1000"}
									height={"1000"}
									alt="image"
									className=" w-[50px] h-[50px] object-cover rounded-full"
								/>
								<div className=" text-[13px]">
									<p className=" font-semibold">{fullName}</p>
									<p className=" text-accent">
										{user?.email}
									</p>
								</div>
							</div>
							<div className=" mt-[20px] text-[15px] flex gap-6 flex-col">
								{HEADERITEMS.map((item, k) => (
									<Link
										href={item.path}
										key={k}
										className="  flex items-center gap-3"
									>
										{item.icon}
										<p>{item.title}</p>
									</Link>
								))}
								{user ? (
									<div
										onClick={onSignOut}
										className=" flex gap-4 items-center"
									>
										<FaPowerOff />
										<p>Sign out</p>
									</div>
								) : (
									<div
										onClick={onSignOut}
										className=" flex gap-4 items-center"
									>
										<FaPowerOff />
										<p>Sign out</p>
									</div>
								)}{" "}
							</div>
						</div>
						{/* <div className=" flex flex-col gap-3">
							<Link
								href={""}
								className=" py-[20px] flex items-center justify-between rounded-[12px] px-[20px] text-black bg-accent"
							>
								<p className=" font-semibold">Connect</p>
								<GoLinkExternal />
							</Link>
							<Link
								href={""}
								className=" py-[20px] flex items-center justify-between rounded-[12px] px-[20px] text-black bg-accent"
							>
								<p className=" font-semibold">Wallet</p>
								<GoLinkExternal />
							</Link>
						</div> */}

						<SheetTitle hidden>Display</SheetTitle>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}
