"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { BiSolidDownload } from "react-icons/bi";

export default function WebAppDownload() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptEvent, setPromptEvent] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("a2hs-dismissed");
    if (stored) return;

    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptEvent(e);
      setOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onInstallClick = async () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    const choice = await promptEvent.userChoice;

    if (choice.outcome === "accepted") {
      console.log("User accepted A2HS.");
    }

    setOpen(false);
    localStorage.setItem("a2hs-dismissed", "true");
  };

  const onDismiss = () => {
    setOpen(false);
    localStorage.setItem("a2hs-dismissed", "true");
  };

  if (!supportsPWA || !open) return null;

  return (
    <div className=" fixed bottom-0 right-0 w-[70%] shadow mr-[10px] mb-[50px] py-[20px] px-[20px] rounded-[20px] bg-secondary z-[9999] ">
      <div className=" flex items-center gap-2">
        <BiSolidDownload className=" w-5 h-5" />
        <p className=" text-[20px] ">Install App</p>
      </div>
      <p className=" text-[13px] mt-[2px]">
        Install this app on your device for a better and faster experience.
      </p>
      <div className=" flex justify-start gap-3 w-full mt-[10px]">
        <Button
          onClick={onDismiss}
          className=" bg-secondary"
          variant={"outline"}
        >
          Not now
        </Button>
        <Button onClick={onInstallClick}>Install</Button>
      </div>
    </div>
  );
}
