import DesktopView from "@/components/shared/layout/desktop-view";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import WebAppDownload from "@/components/shared/layout/web-app-download";

const interTight = Inter_Tight({
  variable: "--inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    default: "Welcome to ISCE Events",
    template: "%s | ISCE Events",
  },
  description:
    "Plan, organize, and track events with ease using ISCE Events. A modern event management platform designed for seamless ticketing, promotion, and real-time analytics.",
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
          <WebAppDownload />
        </div>
      </body>
    </html>
  );
}
