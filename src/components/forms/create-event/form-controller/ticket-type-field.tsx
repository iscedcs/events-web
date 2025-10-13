"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Banknote,
  Check,
  ChevronRight,
  Crown,
  Sparkles,
  Ticket,
  Trash,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { LuTicket } from "react-icons/lu";

export default function TicketTypeField() {
  const [freeTicket, setFreeTicket] = useState(true);
  const [step, setStep] = useState(0);

  const [ticketInfo, setTicketInfo] = useState({
    title: "",
    amount: "",
    currency: "NGN",
    isFree: false,
  });

  return (
    <div className="">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <LuTicket />
          <p className=" text-white">Tickets</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className=" flex items-center gap-2">
              <p>Free</p>
              <AiOutlineEdit />
            </div>
          </DialogTrigger>
          <DialogContent className=" bg-secondary border-0">
            <DialogTitle hidden>Content</DialogTitle>
            <p>Ticketing Type</p>

            <div
              className={`${
                step === 0
                  ? " inline translate-x-0"
                  : " hidden -translate-x-full "
              } flex flex-col gap-5`}
            >
              <div
                onClick={() => {
                  setFreeTicket(true);
                }}
                className=" flex gap-3 items-start"
              >
                <Zap />
                <div className="flex items-center gap-3">
                  <div className="">
                    <p>Free ticket</p>
                    <p className=" text-[12px] text-accent">
                      This makes access to your event free of charge.
                    </p>
                  </div>
                  {freeTicket ? <Check /> : <ArrowRight />}
                </div>
              </div>
              <div
                onClick={() => {
                  setFreeTicket(false);
                }}
                className=" flex mt-[20px] gap-3 items-start"
              >
                <Banknote />
                <div className=" flex items-center gap-3">
                  <div className="">
                    <p>Paid ticket</p>
                    <p className=" text-[12px] text-accent">
                      Setup a paid ticketing access to your event.
                    </p>
                  </div>
                  {!freeTicket ? <Check /> : <ArrowRight />}
                </div>
              </div>
            </div>

            <div
              className={`${
                step === 1
                  ? " inline translate-x-0"
                  : " hidden -translate-x-full "
              }`}
            >
              <div className=" flex flex-col gap-3 ">
                <div className=" flex gap-3 items-start">
                  <Ticket />
                  <div className="flex w-full justify-between  items-center gap-3">
                    <div className="">
                      <p>Regular ticket</p>
                      <div className=" flex items-center gap-2">
                        <div className=" w-[20px] h-[20px] bg-error rounded-[5px]">
                          <Trash className=" w-3 h-3" />
                        </div>
                        <p className=" text-[12px] text-accent">₦0</p>
                      </div>
                    </div>
                    <ChevronRight />
                  </div>
                </div>
                <div className=" flex gap-3 items-start">
                  <Crown />
                  <div className="flex w-full justify-between items-center gap-3">
                    <div className="">
                      <p>VIP ticket</p>
                      <p className=" text-[12px] text-accent">₦0</p>
                    </div>
                    <ChevronRight />
                  </div>
                </div>

                <hr className=" border-dashed my-[20px] border-accent" />

                <div className=" flex gap-3 items-start">
                  <Sparkles />
                  <div className="flex w-full justify-between items-center gap-3">
                    <div className="">
                      <p>Create a custom ticket</p>
                      <p className=" text-[12px] text-accent">
                        Setup a paid ticketing access to your event.
                      </p>
                    </div>
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full flex gap-3">
              {step > 0 && (
                <Button
                  onClick={() => {
                    setStep(step - 1);
                  }}
                  className=" mt-[30px] w-[50%]  rounded-[12px] font-semibold py-[24px]"
                >
                  Back
                </Button>
              )}

              <Button
                onClick={() => {
                  setStep(step + 1);
                }}
                className={`${
                  step > 0 ? "w-[50%] " : "  w-[100%]"
                } mt-[30px]  rounded-[12px] font-semibold py-[24px]`}
              >
                Next
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <hr className=" mt-[10px] border-accent" />
    </div>
  );
}
