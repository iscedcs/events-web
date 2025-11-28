import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Your Bookmarks",
};


export default function ProfileLayout({
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