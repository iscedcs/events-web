import React from "react";
import { SingleTicketProps } from "./ticket";

export interface TrendingEventsProps {
  image: string;
  title: string;
  day: Date;
  location: string;
  path: string;
}

export interface SingleEventProps {
  id: string;
  title: string;
  description: string;
  location: string;
  latitude: string;
  longitude: string;
  town: string;
  image: string;
  cleanName: string;
  startDate: Date;
  endDate: string;
  time: string;
  host: string;
  userId: string;
  qrCode: string;
  qrCodeUrl: string;
  isPublic: boolean;
  galleryLink: string;
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  audienceSize: number;
  capacity: number;
  categories: string[];
  hasFreeTickets: boolean;
  platformLink: string;
  platformName: string;
  galleries: SingleGallaryProps[];
  tickets: SingleTicketProps[];
  attendees: SingleAttendeeProps[];
}

export interface SingleGallaryProps {
  id: string;
  eventId: string;
  name: string;
  image: string;
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
}

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

export interface SingleUserWatchlistProps {
  id: string;
  userId: string;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  event: SingleEventProps;
}

export interface EventSearchItemProps {
  time: string;
  image: string;
  title: string;
  host: string;
  location: string;
  cleanName: string;
  attendeeImages?: string[];
  attendeeNumber?: string;
}

export interface EventCardProps
  extends Pick<
    SingleEventProps,
    "id" | "title" | "startDate" | "time" | "image" | "host"
  > {
  cardType: "going" | "hosting" | "interested" | "past";
  link: string;
  isClicked?: boolean;
  showBookmarkButton?: boolean;
}

export interface ExternalFieldsProps {
  value?: string | number | undefined | boolean;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

export interface LocationFieldsProps
  extends Omit<ExternalFieldsProps, "onChange"> {
  onChange: (value: string, town: string, lat?: number, lng?: number) => void;
}

export interface DateTimeFieldsProps
  extends Omit<ExternalFieldsProps, "onChange" | "value"> {
  onChange: (value: string, startDate: Date, endDate: Date) => void;
  startDateProps: {
    startDate: Date | undefined;
    setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  };
  endDateProps: {
    endDate: Date | undefined;
    setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  };
}
