"use client";

import { useRouter } from "next/navigation";
import { FaPowerOff } from "react-icons/fa";
import { toast } from "sonner";
import { signout } from "../../../../actions/auth";

export default function SignOutButton() {
  const router = useRouter();

  const handleLogOut = async () => {
    await signout();
    router.push("/sign-in");
    toast.success("Account Logged Out", {
      description: "This account has successfully been logged out",
    });
  };
  return (
    <div onClick={handleLogOut} className=" flex gap-4 items-center">
      <FaPowerOff />
      <p>Sign out</p>
    </div>
  );
}
