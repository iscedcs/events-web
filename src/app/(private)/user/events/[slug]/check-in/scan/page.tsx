"use client";

import Header from "@/components/shared/layout/header";
import React, { use, useEffect, useState } from "react";
import { QrScanner } from "react-qrcode-scanner-mi";
import { getUserByID } from "../../../../../../../../actions/user";
import { useAuthInfo } from "@/hooks/use-auth-info";
import { UserProps } from "@/lib/types/user";
import { SingleEventProps } from "@/lib/types/event";
import { getEventsByCleanName } from "../../../../../../../../actions/events";
import { redirect } from "next/navigation";

type Params = Promise<{ slug: string }>;
export default function QrCodeScanner(props: { params: Params }) {
  const params = use(props.params);
  const slug = params.slug;
  //   const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps>();
  const [event, setEvent] = useState<SingleEventProps>();

  const auth = useAuthInfo();
  const userId = auth.auth?.user.id;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const fetchUserDate = async () => {
      const headerUser = await getUserByID(userId ?? "");
      setUser(headerUser);
    };
    fetchUserDate();
  }, [userId]);

  useEffect(() => {
    const fetchEventDate = async () => {
      const eventData: SingleEventProps = await getEventsByCleanName(slug);
      setEvent(eventData);
    };
    fetchEventDate();
  }, []);

  //   const headerUser = userId ? await getUserByID(userId) : null;

  const handleScan = (data: string | null) => {
    if (data) {
      //   setScannedData(data);
      setError(null);
      redirect(
        `${baseUrl}/user/events/${event?.cleanName.toLowerCase()}/check-in/${data}`
      );
    }
  };

  const handleError = (err: any) => {
    console.error("Error scanning QR Code:", err);
    setError("Failed to access camera or scan QR code.");
  };

  console.log({ eventname: event?.cleanName });

  return (
    <>
      <Header hasBack title={event?.title ?? ""} user={user} />

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl mb-4">Check In Attendee</h1>

        <div className="relative w-[300px] h-[300px] border-2 border-secondary rounded-lg overflow-hidden">
          <QrScanner
            onScan={handleScan}
            onError={handleError}
            facingMode="environment"
            className="w-full h-full object-cover"
          />

          {/* Optional scanning overlay animation */}
          {/* <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 animate-pulse" />
        </div> */}
        </div>

        <div className="mt-6 text-center">
          <p className="text-accent text-sm">
            Point your camera at the ticket QR code
          </p>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </>
  );
}
