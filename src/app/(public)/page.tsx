import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div className="">
      <div className=" flex justify-between p-3 items-center">
        <p>Events</p>
        <div className=" flex gap-2 ">
          <Button>
            <Link href={"/sign-up"}>Get Started</Link>
          </Button>
          <Button>
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
        </div>
      </div>

      <div className=" p-3">
        <p className=" text-5xl font-bold">
          Discover And Host The Best Events.
        </p>
        <Button className=" mt-[20px] ">
          <Link href={"/sign-in"}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
