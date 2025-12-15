import DesktopView from "@/components/shared/layout/desktop-view";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import WebAppDownload from "@/components/shared/layout/web-app-download";
import { RegisterDeviceAppShell } from "@/components/shared/layout/register-device-app-shell";
import { getAuthInfo } from "../../actions/auth";
import { NotificationsListener } from "@/components/shared/layout/notifications-listener";
import EnableNotificationsCard from "@/components/shared/layout/enable-notifications-card";

const interTight = Inter_Tight({
	variable: "--inter-tight",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	manifest: "/manifest.json",
	title: {
		default: "Welcome to GADA",
		template: "%s | GADA",
	},
	description:
		"Plan, organize, and track events with ease using GADA. A modern event management platform designed for seamless ticketing, promotion, and real-time analytics.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getAuthInfo();
	const access_token = session.accessToken ?? "";

	return (
		<html lang="en">
			<body className={`${interTight.className} antialiased`}>
				<RegisterDeviceAppShell>
					<NotificationsListener token={access_token} />
					<NextTopLoader showSpinner={false} color="#FFFFFF" />
					<Toaster richColors />
					<div className="">
						<div className="hidden lg:inline xl:inline 2xl:inline">
							<DesktopView />
						</div>
						<div className=" md:hidden lg:hidden xl:hidden 2xl:hidden">
							{children}
						</div>
						<WebAppDownload />
					</div>
				</RegisterDeviceAppShell>
			</body>
		</html>
	);
}
