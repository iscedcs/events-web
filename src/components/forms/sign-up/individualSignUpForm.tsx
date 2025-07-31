import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { signUpForIndividualSchema } from "@/lib/schema/signUpIndividual";
import { startFiveMinuteCountdown } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiRename } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { toast } from "sonner";
import z from "zod";

export default function IndividualSignUpForm({
  step,
  stepNumber,
  setStep,
  setStepNumber,
}: {
  stepNumber: number;
  setStepNumber: React.Dispatch<React.SetStateAction<number>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  //   const [step, setStep] = useState(15);
  const [userType, setUserType] = useState("USER");
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [time, setTime] = useState("00:00");
  const [resendOTP, setResendOTP] = useState(false);

  type signUpValues = z.infer<typeof signUpForIndividualSchema>;

  const form = useForm<signUpValues>({
    resolver: zodResolver(signUpForIndividualSchema),
    defaultValues: {
      otp: "",
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      passwordObj: {
        confirmPassword: "",
        password: "",
      },
    },
  });

  const email = form.getValues("email");
  const otpWatch = form.watch("otp");
  const code = form.getValues("otp");

  const handleNextStep = async () => {
    if (step < 45 || step > 45) {
      setStep(step + 15);
      setStepNumber(stepNumber + 1);
    }

    if (step === 15 * 3 && !isOtpScreen) {
      // const email = form.getValues("email");
      try {
        setIsLoading(true);
        const res = await fetch("/api/auth/request-verfication", {
          body: JSON.stringify({ email }),
          method: "POST",
        });
        const data = res.json();
        if (res.ok) {
          toast.success("Verification Code Sent", {
            description: "Check your email for the code.",
          });
          setIsOtpScreen(true);
          setIsLoading(false);
          setStepNumber(3);
          setStep(15 * 3);
          return data;
        }
        toast.error("Something went wrong", {
          description: "There was a problem getting the verification code.",
        });
        setIsLoading(false);
        setStepNumber(3);
        setStep(15 * 3);
        return null;
      } catch (e: any) {
        setIsLoading(false);
        console.log("Error sending OTP", e);
      }
    }
  };

  const handlePreviousStep = () => {
    // setStep(step - 15);
    setStepNumber(stepNumber - 1);
    setIsOtpScreen(false);
  };

  useEffect(() => {
    if (!isOtpScreen) {
      setTime("0:00");
      // return;
    }

    const stop = startFiveMinuteCountdown(
      (min, sec) => {
        setTime(
          `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
        );
      },
      () => {
        toast.error("The verifiction code has expired", {
          description:
            "Enter your email address again for a new verfication code.",
        });
        setIsOtpScreen(false);
        console.log("Countdown finished!");
      }
    );

    return stop;
  }, [isOtpScreen, resendOTP]);

  const handleResendOTP = async () => {
    try {
      setResendOTP(true);
      setIsLoading(true);
      const res = await fetch("/api/auth/request-verfication", {
        body: JSON.stringify({ email }),
        method: "POST",
      });
      const data = res.json();
      if (res.ok) {
        toast.success("Verification Code Resent", {
          description: "Check your email for the code.",
        });
        setIsLoading(false);
        setResendOTP(false);
        return data;
      }
      toast.error("Something went wrong", {
        description: "There was a problem getting the verification code.",
      });
      setIsLoading(false);
      setIsLoading(false);

      return null;
    } catch (e: any) {
      setIsLoading(false);
      setIsLoading(false);

      console.log("Error resending OTP Code", e);
    }
  };

  useEffect(() => {
    const verifyOTP = async () => {
      if (otpWatch.length === 6) {
        const isValid = await form.trigger("otp");
        if (!isValid) return;
        try {
          setIsLoading(true);
          const res = await fetch("/api/auth/verify-code", {
            body: JSON.stringify({ email, code }),
            method: "POST",
          });
          console.log({ email, code });
          const data = await res.json();
          if (res.ok) {
            setIsLoading(false);
            setIsOtpScreen(false);
            toast.success("Email verified successfully", {
              description: "Your email has been verified successfully",
            });
            setStep(step + 15);
            setStepNumber(stepNumber + 1);
            return data;
          }
          setIsLoading(false);
          setStepNumber(3);
          setStep(15 * 3);
          toast.error("Something went wrong", {
            description:
              "There was a problem verifying your email address please try again",
          });
        } catch (e) {
          setIsLoading(false);
          console.log("Problem verifying email address", e);
        }
      }
    };
    verifyOTP();
  }, [otpWatch]);

  const handleSubmit = (data: signUpValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div
          className={` ${
            step === 15 * 2
              ? " inline translate-x-0 "
              : " hidden -translate-x-full  "
          } hidden transition-all w-full mt-[20px]`}
        >
          <BiRename className=" w-[32px] h-[32px]" />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" mt-[10px] font-extrabold text-[24px]">
                  Enter your first name*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // placeholder=" Enter your first name"
                    className=" mt-[15px] py-[20px] text-[20px] outline-0 rounded-none border-l-0 placeholder:text-[24px] placeholder:font-extrabold border-r-0 border-t-0 "
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className=" mt-[20px]">
                <FormLabel className=" mt-[10px] font-extrabold text-[24px]">
                  Enter your last name*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // placeholder=" Enter your last name"
                    className=" mt-[15px] py-[20px] text-[20px] outline-0 rounded-none border-l-0 placeholder:text-[24px] placeholder:font-extrabold border-r-0 border-t-0 "
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div
          className={` ${
            step === 15 * 3 && isOtpScreen === false
              ? " inline translate-x-0 "
              : " hidden -translate-x-full  "
          } hidden transition-all w-full mt-[20px]`}
        >
          <MdEmail className=" w-[32px] h-[32px]" />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" mt-[10px] font-extrabold text-[24px]">
                  What’s your email?
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // placeholder="What’s your email?"
                    className=" mt-[15px] py-[20px] text-[20px] outline-0 rounded-none border-l-0 placeholder:text-[24px] placeholder:font-extrabold border-r-0 border-t-0 "
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div
          className={`${
            isOtpScreen == true
              ? " inline translate-x-0 "
              : " hidden -translate-x-full  "
          } hidden transition-all w-full mt-[20px]`}
        >
          <GoArrowLeft
            onClick={handlePreviousStep}
            className=" w-[32px] h-[32px]"
          />
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" mt-[10px] font-extrabold text-[24px]">
                  Enter OTP code*
                </FormLabel>
                <FormControl>
                  <div className=" relative">
                    <Input
                      {...field}
                      maxLength={6}
                      // onChange={handleVerifyOTP}
                      // placeholder="Enter OTP code"
                      className=" mt-[15px] py-[20px] text-[20px] outline-0 rounded-none border-l-0 placeholder:text-[24px] placeholder:font-extrabold border-r-0 border-t-0 "
                    />
                    <p className=" right-0 top-1/2 text-[12px] absolute">
                      {time}
                    </p>
                  </div>
                </FormControl>
                <FormDescription className=" text-[12px]">
                  You only have to enter an OTP code we sent to your email
                  address - {email}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div
          className={` ${
            step === 15 * 4
              ? " inline translate-x-0 "
              : " hidden -translate-x-full  "
          } hidden transition-all w-full mt-[20px]`}
        >
          <FaPhoneAlt className=" w-[32px] h-[32px]" />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" w-[70%] mt-[10px] font-extrabold text-[24px]">
                  What’s your phone number?
                </FormLabel>
                <FormControl>
                  <div className=" mt-[15px] items-center flex gap-5">
                    <Select>
                      <SelectTrigger className=" text-[24px] font-extrabold text-white border-t-0 border-l-0 rounded-none border-r-0">
                        <SelectValue placeholder="+234" />
                      </SelectTrigger>
                      <SelectContent className=" border-0 focus:bg-secondary rounded-[20px] text-white bg-secondary">
                        <SelectItem value="+234">+234</SelectItem>
                        <SelectItem value="+224">+224</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      {...field}
                      // placeholder=" Enter ssyour first name"
                      className="  text-[20px] outline-0 rounded-none border-l-0 placeholder:text-[24px] placeholder:font-extrabold border-r-0 border-t-0 "
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div
          className={` ${
            step === 15 * 5
              ? " inline translate-x-0 "
              : " hidden -translate-x-full  "
          } hidden transition-all w-full mt-[20px]`}
        >
          <p>Page 5</p>
        </div>
        <div
          className={` ${
            step === 15 * 6
              ? " inline translate-x-0 "
              : " hidden  -translate-x-full "
          } hidden transition-all w-full mt-[20px]`}
        >
          <p>Page 6</p>
        </div>
        <div
          className={` ${
            step === 15 * 7
              ? " inline translate-x-0 "
              : " hidden -translate-x-full "
          } hidden transition-all w-full mt-[20px]`}
        >
          <p>Page 7</p>
        </div>
        <div className="  absolute bottom-0 mb-[30px] w-full">
          <p className=" text-center">{userType}</p>
          {isOtpScreen ? (
            <Button
              onClick={handleResendOTP}
              type="button"
              disabled={loading}
              className="  w-full rounded-[12px] font-semibold py-[24px] "
            >
              Resend OTP
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              type="button"
              disabled={loading}
              className="  w-full rounded-[12px] font-semibold py-[24px] "
            >
              Continue
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
