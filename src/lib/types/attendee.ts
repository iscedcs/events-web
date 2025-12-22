export interface SingleAttendeeProps {
    id: string;
    eventId: string;
    eventName: string;
    image: string;
    name: string;
    email: string;
    phone: string;
    link: string;
    token: string;
    thankyouMail: boolean;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
    ticketId: string;
    userId: string;
    checkedOut: Date;
    checkedIn: Date;
    displayPicture: string;
}

export interface MiniSingleAttendeeProps
    extends Pick<SingleAttendeeProps, "name"> {
    image: string;
}