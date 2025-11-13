import DesktopView from "@/components/shared/layout/desktop-view";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const interTight = Inter_Tight({
  variable: "--inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Welcome to ISCE Events",
  description:
    "Your go to for hosting events and joining events of your choice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.className} antialiased`}>
        <NextTopLoader showSpinner={false} color="#FFFFFF" />
        <Toaster richColors />
        <div className="">
          <div className="hidden lg:inline xl:inline 2xl:inline">
            <DesktopView />
          </div>
          <div className=" md:hidden lg:hidden xl:hidden 2xl:hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
