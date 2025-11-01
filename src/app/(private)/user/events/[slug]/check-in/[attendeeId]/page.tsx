import AttendeeCard from "@/components/pages/user/events/single-event/attendee-check-in/attendee-card";
import Header from "@/components/shared/layout/header";
import { SingleAttendeeProps } from "@/lib/types/event";
import {
  checkInAttendeeWithID,
  getAttendeeID,
} from "../../../../../../../../actions/attendee";
import { getAuthInfo } from "../../../../../../../../actions/auth";
import { getUserByID } from "../../../../../../../../actions/user";

type Params = { attendeeId: string };
type SearchParams = {
  checked?: string | string[] | undefined;
  [key: string]: string | string[] | undefined;
};

export default async function CheckIn({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { attendeeId } = params;
  const checked = searchParams.checked;
  const session = await getAuthInfo();
  const headerUser = await getUserByID(session.user?.id ?? "");

  const attendeeInfo: SingleAttendeeProps = await getAttendeeID(attendeeId);

  // const checkin

  console.log({ attendeeInfo });
  console.log({ checked });

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
