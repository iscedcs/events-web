"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INITIALTICKETS } from "@/lib/const";
import { SETTINGS } from "@/lib/settings-config";
import { CreateTicketProps, InitialTicketProps } from "@/lib/types/ticket";
import {
  ArrowRight,
  Banknote,
  Check,
  ChevronRight,
  Crown,
  Sparkles,
  Ticket,
  Trash2,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import { LuTicket } from "react-icons/lu";

export default function TicketTypeField() {
  const [freeTicket, setFreeTicket] = useState(true);
  const [customTicket, setCustomTicket] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<{
    tickets: CreateTicketProps[];
  }>();

  const { fields, append, remove, update } = useFieldArray<{
    tickets: CreateTicketProps[];
  }>({
    control: control,
    name: "tickets",
  });

  const [ticketInfo, setTicketInfo] = useState<CreateTicketProps>({
    title: "",
    amount: 0,
    quantity: 0,
    currency: "NGN",
    isFree: false,
  });

  const [customTicketData, setCustomTicketData] = useState<CreateTicketProps>({
    title: "",
    amount: 0,
    quantity: 0,
    currency: "NGN",
    isFree: freeTicket,
  });

  const [existingInitialTicketInfo, setExistingInitialTicketInfo] =
    useState<InitialTicketProps[]>(INITIALTICKETS);

  // console.log({ step });
  // console.log({ ticketInfo });
  // console.log({ fields });
  // console.log({ existingInitialTicketInfo });
  // console.log({ customTicketData });
  // console.log({ customTicket });

  const watchedTickets = watch("tickets");

  const handleSelectTicketInfo = (ticket: CreateTicketProps, index: number) => {
    append({
      ...ticket,
      amount: ticket.amount,
      currency: ticket.currency,
      isFree: ticket.isFree,
      title: ticket.title,
      quantity: ticket.quantity,
    });
    setSelectedTicketIndex(index);
    const isCustom = !INITIALTICKETS.some((t) => t.title === ticket.title);
    if (isCustom) {
      setCustomTicket(true);
      setTicketInfo(ticket);
    } else {
      setCustomTicket(false);
      setTicketInfo(ticket);
    }
    setStep(2);
  };

  // const handleCustomTIcketCreation = ({
  //   amount,
  //   currency,
  //   isFree,
  //   quantity,
  //   title,
  // }: CreateTicketProps) => {
  //   if (fields.some((f) => f.title === title)) return;

  //   const alreadyHasCustom = fields.some((f) => f.title === "");
  //   if (!alreadyHasCustom) {
  //     append({
  //       title: "",
  //       amount: 0,
  //       quantity: 0,
  //       currency: "NGN",
  //       isFree: freeTicket,
  //     });
  //   }
  //   setStep(2);
  // };
  // const ticketWatch: InitialTicketProps[] = watch("tickets");

  const handleTicketChange = (field: keyof CreateTicketProps, value: any) => {
    if (selectedTicketIndex === null) return;

    const updatedTicket = {
      ...fields[selectedTicketIndex],
      [field]: value,
      // Automatically set isFree if the amount changes
      ...(field === "amount" ? { isFree: Number(value) === 0 } : {}),
    };

    // Update local state
    setTicketInfo(updatedTicket);

    // Update the ticket in the field array
    update(selectedTicketIndex, updatedTicket);
  };

  const handleTicketEditInfo = (ticket: CreateTicketProps, index: number) => {
    setIsEditing(true);
    setSelectedTicketIndex(index);
    setTicketInfo(ticket);
    setCustomTicket(false);
    setStep(2);
  };
  useEffect(() => {
    if (step === 1) {
      fields.forEach((_, k) => remove(k));
    }
  }, [step, remove, fields]);

  useEffect(() => {
    if (step === 4) {
      setCustomTicketData({
        title: "",
        amount: 0,
        quantity: 0,
        currency: "NGN",
        isFree: freeTicket,
      });
    }
  }, [step]);

  useEffect(() => {
    setCustomTicketData((prev) => ({
      ...prev,
      isFree: prev.amount === 0,
    }));
  }, [customTicketData.amount]);

  useEffect(() => {
    if (!Array.isArray(fields)) return;

    fields.forEach((ticket, index) => {
      if (!ticket || typeof ticket.amount !== "number") return;

      const shouldBeFree = ticket.amount === 0;
      if (ticket.isFree !== shouldBeFree) {
        setTimeout(() => {
          update(index, { ...ticket, isFree: shouldBeFree });
        }, 0);
      }
    });
  }, [fields, update]);

  useEffect(() => {
    if (fields.length > 0) {
      setStep(3);
    }
  }, [fields.length]);

  const renderIcon = (title: string) => {
    switch (title) {
      case "Regular Ticket":
        return <Ticket className=" w-5 h-5" />;
      case "VIP Ticket":
        return <Crown className=" w-5 h-5" />;
      default:
        return <Sparkles className=" w-5 h-5" />;
    }
  };

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
              <p>{fields.length} tickets</p>
              <AiOutlineEdit />
            </div>
          </DialogTrigger>
          <DialogContent className=" bg-secondary border-0">
            <DialogTitle hidden>Content</DialogTitle>
            {step !== 2 ? (
              <p>Ticketing Type</p>
            ) : (
              <p className=" capitalize">
                {ticketInfo.title && !customTicket
                  ? ticketInfo.title
                  : "Custom"}{" "}
                Settings
              </p>
            )}

            {/* STEP 0: Free/Paid Select */}
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
                  SETTINGS.payment.allow_payment && setFreeTicket(false);
                }}
                className={` flex mt-[20px] gap-3 items-start ${
                  SETTINGS.payment.allow_payment
                    ? " text-white"
                    : " text-accent"
                }`}
              >
                <Banknote />
                <div className=" flex items-center gap-3">
                  <div className="">
                    <p>Paid ticket</p>
                    <p className=" text-[12px] text-accent">
                      Setup a custom ticketing access to your event.
                    </p>
                  </div>
                  {!freeTicket ? <Check /> : <ArrowRight />}
                </div>
              </div>
            </div>

            {/* STEP 1: Initial Ticket Data */}
            <div
              className={`${
                step === 1
                  ? " inline translate-x-0"
                  : " hidden -translate-x-full "
              }`}
            >
              <div className=" ">
                {fields.length > 0 ? (
                  <div className=" flex flex-col gap-3 ">
                    {fields.map((item, k) => (
                      <div
                        onClick={() => handleSelectTicketInfo(item, k)}
                        key={k}
                        className=" flex gap-3 items-start"
                      >
                        <div className="">{renderIcon(item.title)}</div>
                        <div className="flex w-full justify-between  items-center gap-3">
                          <div className="">
                            <p>{item.title}</p>
                            <p className=" text-[12px] text-accent">
                              ₦{item.amount}
                            </p>
                          </div>
                          <ChevronRight />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className=" flex flex-col gap-3 ">
                    {existingInitialTicketInfo.map((item, k) => (
                      <div
                        onClick={() => handleSelectTicketInfo(item, k)}
                        key={k}
                        className=" flex gap-3 items-start"
                      >
                        <div className="">{item.icon}</div>
                        <div className="flex w-full justify-between  items-center gap-3">
                          <div className="">
                            <p>{item.title}</p>
                            <p className=" text-[12px] text-accent">
                              ₦{item.amount}
                            </p>
                          </div>
                          <ChevronRight />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <hr className=" border-dashed my-[20px] border-accent" />

                <div
                  onClick={() => {
                    setStep(2);
                    setCustomTicket(true);
                  }}
                  className=" flex gap-3 items-start"
                >
                  <Sparkles />
                  <div className="flex w-full justify-between items-center gap-3">
                    <div className="">
                      <p>Create a custom ticket</p>
                      <p className=" text-[12px] text-accent">
                        Setup a custom ticketing access to your event.
                      </p>
                    </div>
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: Ticket Detail Fields - Custom/Existing */}
            <div
              className={`${
                step === 2 ? "inline translate-x-0" : "hidden -translate-x-full"
              }`}
            >
              <div className="flex flex-col gap-3">
                {customTicket ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <Label className="text-accent">
                        What should we call this ticket?
                      </Label>
                      <Input
                        type="text"
                        placeholder="e.g. Backstage Pass"
                        value={customTicketData.title}
                        onChange={(e) =>
                          setCustomTicketData({
                            ...customTicketData,
                            title: e.target.value,
                          })
                        }
                        className="bg-[#151515] rounded-[8px] px-[15px]"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <Label className="text-accent">
                        Price (₦) - Leave at 0 for free tickets
                      </Label>
                      <Input
                        type="number"
                        placeholder="0"
                        disabled={!SETTINGS.payment.allow_payment}
                        value={customTicketData.amount || ""}
                        onChange={(e) =>
                          setCustomTicketData({
                            ...customTicketData,
                            amount: Number(e.target.value),
                          })
                        }
                        className="bg-[#151515] rounded-[8px] px-[15px]"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <Label className="text-accent">Quantity</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={customTicketData.quantity || ""}
                        onChange={(e) =>
                          setCustomTicketData({
                            ...customTicketData,
                            quantity: Number(e.target.value),
                          })
                        }
                        className="bg-[#151515] rounded-[8px] px-[15px]"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <Label className="text-accent">Currency</Label>
                      <Input
                        type="text"
                        placeholder="NGN"
                        disabled
                        value={customTicketData.currency}
                        onChange={(e) =>
                          setCustomTicketData({
                            ...customTicketData,
                            currency: e.target.value.toUpperCase(),
                          })
                        }
                        className="bg-[#151515] rounded-[8px] px-[15px]"
                      />
                    </div>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        setStep(3);
                        setCustomTicket(false);
                        setCustomTicketData({
                          title: "",
                          amount: 0,
                          quantity: 0,
                          currency: "NGN",
                          isFree: freeTicket,
                        });
                      }}
                      className=" bg-error text-white rounded-[12px] font-semibold py-[24px]"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="">
                    {ticketInfo.amount === 0
                      ? ticketInfo.isFree === true
                      : ticketInfo.isFree === false}
                    {selectedTicketIndex !== null && (
                      <div className="flex flex-col gap-3">
                        <Controller
                          control={control}
                          name={`tickets.${selectedTicketIndex}.title`}
                          render={({ field }) => (
                            <div className="flex gap-3 flex-col">
                              <Label className="text-accent">
                                What should we call this ticket?
                              </Label>
                              <Input
                                {...field}
                                type="text"
                                // disabled={customTicket || isEditing}
                                value={ticketInfo.title}
                                onChange={(e) =>
                                  handleTicketChange("title", e.target.value)
                                }
                                className={`bg-[#151515] rounded-[8px] px-[15px] ${
                                  errors.tickets?.[selectedTicketIndex]?.title
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : ""
                                }`}
                              />
                              {errors.tickets?.[selectedTicketIndex]?.title
                                ?.message && (
                                <p className="text-error text-sm">
                                  {
                                    errors.tickets[selectedTicketIndex]?.title
                                      ?.message
                                  }
                                </p>
                              )}
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name={`tickets.${selectedTicketIndex}.amount`}
                          render={({ field }) => (
                            <div className="flex flex-col gap-2">
                              <Label className="text-accent">
                                Price (₦) - Leave at 0 for free tickets
                              </Label>
                              <Input
                                {...field}
                                type="number"
                                disabled={freeTicket || isEditing}
                                value={ticketInfo.amount}
                                onChange={(e) =>
                                  handleTicketChange(
                                    "amount",
                                    Number(e.target.value)
                                  )
                                }
                                className={`bg-[#151515] rounded-[8px] px-[15px] ${
                                  errors.tickets?.[selectedTicketIndex]?.amount
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : ""
                                }`}
                              />
                              {errors.tickets?.[selectedTicketIndex]?.amount
                                ?.message && (
                                <p className="text-error text-sm">
                                  {
                                    errors.tickets[selectedTicketIndex]?.amount
                                      ?.message
                                  }
                                </p>
                              )}
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name={`tickets.${selectedTicketIndex}.quantity`}
                          render={({ field }) => (
                            <div className="flex flex-col gap-2">
                              <Label className="text-accent">Quantity</Label>
                              <Input
                                {...field}
                                type="number"
                                value={ticketInfo.quantity}
                                onChange={(e) =>
                                  handleTicketChange(
                                    "quantity",
                                    Number(e.target.value)
                                  )
                                }
                                className={`bg-[#151515] rounded-[8px] px-[15px] ${
                                  errors.tickets?.[selectedTicketIndex]
                                    ?.quantity
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : ""
                                }`}
                              />
                              {errors.tickets?.[selectedTicketIndex]?.quantity
                                ?.message && (
                                <p className="text-error text-sm">
                                  {
                                    errors.tickets[selectedTicketIndex]
                                      ?.quantity?.message
                                  }
                                </p>
                              )}
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name={`tickets.${selectedTicketIndex}.currency`}
                          render={({ field }) => (
                            <div className="flex flex-col gap-2">
                              <Label className="text-accent">Currency</Label>
                              <Input
                                {...field}
                                type="text"
                                disabled
                                value={field.value ?? ""}
                                className={`bg-[#151515] rounded-[8px] px-[15px] ${
                                  errors.tickets?.[selectedTicketIndex]
                                    ?.currency
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : ""
                                }`}
                              />
                              {errors.tickets?.[selectedTicketIndex]?.currency
                                ?.message && (
                                <p className="text-error text-sm">
                                  {
                                    errors.tickets[selectedTicketIndex]
                                      ?.currency?.message
                                  }
                                </p>
                              )}
                            </div>
                          )}
                        />

                        <Button
                          onClick={() => {
                            remove(selectedTicketIndex);
                            setSelectedTicketIndex(null);
                            // if (customTicket) {
                            //   setStep(3);
                            // }
                            setStep(3);
                          }}
                          className=" bg-error text-white rounded-[12px] font-semibold py-[24px]"
                        >
                          <span className="flex items-center flex-row gap-3">
                            <Trash2 />
                            <p>Delete Ticket</p>
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* STEP 3: Selected Ticket Data */}
            <div
              className={`${
                step === 3
                  ? " inline translate-x-0"
                  : " hidden -translate-x-full "
              }`}
            >
              <div className=" ">
                <div className="  ">
                  {fields.length !== 0 &&
                  existingInitialTicketInfo.length !== 0 ? (
                    <div className="flex flex-col gap-3">
                      {fields.map((item, k) => (
                        <div
                          onClick={() => handleTicketEditInfo(item, k)}
                          key={k}
                          className=" flex gap-3 items-start"
                        >
                          <div className="">{renderIcon(item.title)}</div>
                          <div className="flex w-full justify-between  items-center gap-3">
                            <div className="">
                              <p>{item.title}</p>
                              <p className=" text-[12px] text-accent">
                                ₦{item.amount}
                              </p>
                            </div>
                            <ChevronRight />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="  text-[12px] text-accent">
                      No tickets created
                    </p>
                  )}
                </div>

                {/* <div className="">
                  {ticketWatch.map((item, k) => (
                    <div className="">{item.icon}</div>
                  ))}
                </div> */}

                <hr className=" border-dashed my-[20px] border-accent" />

                <div
                  onClick={() => {
                    setStep(2);
                    setCustomTicket(true);
                  }}
                  className=" flex gap-3 items-start"
                >
                  <Sparkles />
                  <div className="flex w-full justify-betw  een items-center gap-3">
                    <div className="">
                      <p>Create a custom ticket</p>
                      <p className=" text-[12px] text-accent">
                        Setup a custom ticketing access to your event.
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
                  disabled={step === 3}
                  onClick={() => {
                    setStep(step - 1);

                    if (step === 3) {
                      setStep(1);
                    }

                    // if (step === 4) {
                    //   setStep(0);
                    // }

                    if (step === 2 && fields.length === 0) {
                      remove(
                        Number(
                          fields.find(
                            (title) => title.title === ticketInfo.title
                          )?.id
                        )
                      );
                    } else {
                      setStep(3);
                    }

                    if (customTicket && step === 2) {
                      setCustomTicket(false);
                    }

                    if (step === 1) {
                      setStep(step - 1);
                    }
                  }}
                  className="  w-[50%]  rounded-[12px] font-semibold py-[24px]"
                >
                  Back
                </Button>
              )}

              <div className={` w-full`}>
                {step === 3 ? (
                  <DialogClose asChild>
                    <Button
                      className={` w-[100%] rounded-[12px] bg-white border-0 text-black font-semibold py-[24px]`}
                      variant="outline"
                    >
                      Close
                    </Button>
                  </DialogClose>
                ) : (
                  <Button
                    disabled={fields.length === 0 && step === 1}
                    onClick={async () => {
                      // CASE 1: Custom ticket being created
                      if (customTicket && step === 2) {
                        if (customTicketData.title.trim() === "") return;

                        append(customTicketData);

                        // Reset local state
                        setCustomTicketData({
                          title: "",
                          amount: 0,
                          quantity: 0,
                          currency: "NGN",
                          isFree: freeTicket,
                        });

                        setCustomTicket(false);
                        setStep(3);
                        return;
                      }

                      // CASE 2: Step 0 → 1 (ticket type selection)
                      if (step === 0) {
                        setStep(1);
                        return;
                      }

                      // CASE 3: Step 1 → 2 (after selecting a ticket)
                      if (step === 1 && ticketInfo.title) {
                        setStep(2);
                        return;
                      }

                      // CASE 4: Step 2 → 3 (if not custom ticket)
                      // if (step === 2 && !customTicket) {
                      //   const isValid = await trigger("tickets");

                      //   // if (!isValid) {
                      //   //   console.log("Ticket validation failed");
                      //   //   return; // stops progression if invalid
                      //   // }

                      //   setStep(3);
                      //   return;
                      // }

                      // CASE 5: Default fallback (if something unexpected)
                      setStep((prev) => prev + 1);
                    }}
                    className={`${
                      step === 0 ? "w-[100%]" : "w-[50%]"
                    } w-full rounded-[12px] font-semibold py-[24px]`}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <hr className=" mt-[10px] border-accent" />
    </div>
  );
}
