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

export interface SingleTicketProps {
  id: string;
  title: string;
  eventId: string;
  quantity: number;
  available: boolean; //confirm this
  ticketStatus: string; //confirm this
  isFree: boolean;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  event?: SingleEventProps;
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
  displayPicture: Date;
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
