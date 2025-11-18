import Edit from "@/components/forms/edit-event/edit";
import { SingleEventProps } from "@/lib/types/event";
import React from "react";

export default function EditEvents({ event }: { event: SingleEventProps }) {
  return (
    <div>
      <Edit event={event} />
    </div>
  );
}
