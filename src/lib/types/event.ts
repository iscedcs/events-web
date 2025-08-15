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
  categories: any[];
  hasFreeTickets: boolean;
  platformLink: string;
  platformName: string;
  galleries: SingleGallaryProps[];
  tickets: SingleTicketProps[];
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
