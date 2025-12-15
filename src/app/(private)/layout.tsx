import EnableNotificationsCard from "@/components/shared/layout/enable-notifications-card";

export default function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className=" w-full">
			<div className="  relative w-full h-screen ">{children}</div>
			<EnableNotificationsCard />
		</div>
	);
}
