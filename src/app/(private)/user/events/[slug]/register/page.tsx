import EventRegistrationForm from "@/components/forms/event-register/register";
import Header from "@/components/shared/layout/header";
import { SingleEventProps } from "@/lib/types/event";
import { format } from "date-fns";
import Image from "next/image";
import { redirect } from "next/navigation";
import { checkEventAttendee } from "../../../../../../../actions/attendee";
import { getCurrentUser } from "../../../../../../../actions/auth";
import { getEventsByCleanName } from "../../../../../../../actions/events";
import { getUserByID } from "../../../../../../../actions/user";

type Params = Promise<{ slug: string }>;

export default async function Register(props: { params: Params }) {
  const params = await props.params;

  const me = await getCurrentUser(); // null if not logged in
  const user = await getUserByID(me?.id ?? "");

  // console.log({ user });

  // console.log({ me });

  const event: SingleEventProps = await getEventsByCleanName(params.slug ?? "");
  const check = await checkEventAttendee(me?.id ?? "", params.slug);

  if (check?.check) {
    redirect(`/user/events/${params.slug}`);
  }

  return (
    <div className="">
      <Header hasBack title={event?.title.toLowerCase()} user={user} />
      <div className=" mt-[55px]">
        <div className="  w-full px-[15px] py-[10px] bg-secondary">
          <p className=" text-[18px] font-extrabold">Registration</p>
          <div className=" flex mt-[10px] items-center gap-2">
            <Image
              src={
                event.image?.startsWith("http") || event.image?.startsWith("/")
                  ? event.image
                  : "/no-image.png"
              }
              alt="image"
              width={"1000"}
              height={"1000"}
              className=" w-[60px] h-[60px] rounded-[12px] object-cover"
            />
            <div className="">
              <p className=" text-[16px] capitalize">
                {event.title.toLowerCase()}
              </p>
              <p className=" text-[14px] text-accent">
                {format(event.startDate, "MMMM dd")}, {event.time}
              </p>
            </div>
          </div>
        </div>
        <div className=" px-[15px]">
          <EventRegistrationForm
            slug={params.slug ?? ""}
            user={user ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}
