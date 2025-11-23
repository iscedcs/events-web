import AttendeeCard from "@/components/pages/user/events/single-event/attendee-check-in/attendee-card";
import Header from "@/components/shared/layout/header";
import { SingleAttendeeProps } from "@/lib/types/event";
import { getAttendeeID } from "../../../../../../../../actions/attendee";
import { getAuthInfo } from "../../../../../../../../actions/auth";
import { getUserByID } from "../../../../../../../../actions/user";

type Params = Promise<{ attendeeId: string }>;
type SearchParams = Promise<{
  checked?: string | string[] | undefined;
  [key: string]: string | string[] | undefined;
}>;

export default async function CheckIn(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const attendeeId = params.attendeeId;
  const checked = searchParams.checked;
  const session = await getAuthInfo();
  const headerUser = await getUserByID(session.user?.id ?? "");

  const attendeeInfo: SingleAttendeeProps = await getAttendeeID(attendeeId);

  // const checkin

  // console.log({ attendeeInfo });
  // console.log({ checked });

  return (
    <div className=" px-[10px] ">
      <Header title={"Check In"} user={headerUser} />

      <AttendeeCard
        attendeeInfo={checked === "error" ? null : attendeeInfo}
        isCheckedBefore={checked === "true"}
      />
    </div>
  );
}
