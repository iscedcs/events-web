import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Event Highlights",
};

export default function HighLightsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className=" w-full">
			<div className="  relative w-full h-screen ">{children}</div>
		</div>
	);
}
