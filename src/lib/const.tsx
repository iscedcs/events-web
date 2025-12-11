import {
	Bell,
	Bookmark,
	CircleUserRound,
	Crown,
	Headset,
	LogOut,
	Pencil,
	ReceiptText,
	ShieldAlert,
	Ticket,
	UserRoundPlus,
} from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { LuMessageSquareText, LuTickets } from "react-icons/lu";
import { MdEventNote } from "react-icons/md";
import { TrendingEventsProps } from "./types/event";
import { HeaderItemsTypes } from "./types/layout";
import { InitialTicketProps } from "./types/ticket";

export const AUTH_API = process.env.NEXT_PUBLIC_LIVE_ISCEAUTH_BACKEND_URL;
export const EVENTS_API = process.env.NEXT_PUBLIC_LIVE_EVENTS_BACKEND_URL;
export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const URLS = {
	auth: {
		sign_up: "/auth/signup",
		sign_in: "/auth/signin",
		sign_out: "/auth/signout",
		reset_token: "/auth/send-reset-token",
		reset_password: "/auth/reset-password",
		request_verification_code: "/auth/request-verify-email-code",
		verify_code: "/auth/verify-email-code",
	},
	user: {
		one: "/user/one/{id}",
		update_user: "/user/update/{id}",
	},
	events: {
		new: "/events/create",
		delete: "/events/{id}/delete",
		update: "/events/{id}/update",
		all: "/events/all",
		all_events_user: "/events/events",
		all_events_with_attendee: "/events/clean-name/attendees/{cleanName}",
		one: "/events/one/{id}",
		events_search: "/events/search",
		category: "/events/categories",
		updelete: "/events/{id}/updelete",
		one_slug: "/events/clean-name/{cleanName}",
		event_search: "/events/search",
		nearby_events: "/events/nearby",
		close_registration: "/events/{id}/close-registration",
	},
	chat: {
		create: "/chat/create",
		update_chatroom: "/chat/{id}/update-chatroom",
		event_chatroom: "/chat/event-chatroom/{eventId}",
		chatroom_one: "/chat/{id}/chatroom-one",
		all_chatroom_messages: "/chat/messages/{chatRoomId}",
		all: "/chat/all",
		all_deleted: "/chat/all/deleted",
		delete: "/chat/{id}/delete",
		harddelete: "/chat/{id}/harddelete",
		members_get: "/chat/{id}/members",
		members_post: "/chat/{id}/members",
		post_chatroom_messages: "/chat/{id}/messages",
		update_message: "/chat/{id}/update-message",
		search: "/chat/search",
		softdelete_message: "/chat/{id}/delete-message",
		harddelete_message: "/chat/{id}/harddelete-message",
		private_chatroom_user: "/chat/private-user-chatrooms/{userId}",
		create_private_room_attendees: "/chat/chatroom/private/attendee",
		create_private_room_host: "/chat/chatroom/private/creator",
	},
	gallery: {
		gallery: "/gallery/event/{event_id}",
	},
	attendees: {
		all: "/attendees/event/{id}",
		one: "/attendees/{id}/one",
		create: "/attendees/create",
		attendee_check: "/attendees/{cleanName}/with-attendee-check",
		check_in_with_attendeeId: "/attendees/{id}/check-in",
		check_in_with_token: "/attendees/check-in-by-token",
		one_token: "/attendees/get-by-token",
	},
	tickets: {
		all_ticket_for_event: "/tickets/event/{eventId}",
		ticket_by_id: "/tickets/{id}",
		all_ticket_user: "/tickets/user/{userId}",
		register_via_tickets: "/tickets/access",
	},
	watchlist: {
		add_watchlist: "/watchlist/add",
		remove_watchlist: "/watchlist/remove",
		all_watchlist: "/watchlist/my-watchlist",
		single_watchlist: "/watchlist/item/{eventId}",
		event_watchlist_check: "/watchlist/check/{eventId}",
	},
};

export const PASSWORDCHECK = [
	{
		key: "lowercase",
		message: "At least one lowercase letter",
		state: false,
	},
	{
		key: "length",
		message: "Minimum of 8 characters",
		state: false,
	},
	{
		key: "uppercase",
		message: "At least one uppercase letter",
		state: false,
	},
	{
		key: "number",
		message: "At least one number",
		state: false,
	},
];

// export const CATEGORIES = [
//   {
//     name: "Featured",
//     value: "featured",
//   },
//   {
//     name: "Conferences",
//     value: "conferences",
//   },
//   {
//     name: "Seminars",
//     value: "seminars",
//   },
//   {
//     name: "Workshops",
//     value: "workshops",
//   },
//   {
//     name: "Trade Shows",
//     value: "trade-shows",
//   },
//   {
//     name: "Expos",
//     value: "expos",
//   },
//   {
//     name: "Product Launches",
//     value: "product-launches",
//   },
//   {
//     name: "Networking Events",
//     value: "networking",
//   },
//   {
//     name: "Corporate Retreats",
//     value: "corporate-retreats",
//   },
//   {
//     name: "Team Building",
//     value: "team-building",
//   },
//   {
//     name: "Award Ceremonies",
//     value: "award-ceremonies",
//   },
//   {
//     name: "Board Meetings",
//     value: "board-meetings",
//   },
//   {
//     name: "Shareholder Meetings",
//     value: "shareholder-meetings",
//   },
//   {
//     name: "Weddings",
//     value: "weddings",
//   },
//   {
//     name: "Engagement Parties",
//     value: "engagement-parties",
//   },
//   {
//     name: "Birthday Parties",
//     value: "birthday-parties",
//   },
//   {
//     name: "Anniversary Celebrations",
//     value: "anniversaries",
//   },
//   {
//     name: "Baby Showers",
//     value: "baby-showers",
//   },
//   {
//     name: "Family Reunions",
//     value: "family-reunions",
//   },
//   {
//     name: "Graduation Parties",
//     value: "graduation-parties",
//   },
//   {
//     name: "Memorial Services",
//     value: "memorial-services",
//   },
//   {
//     name: "Festivals",
//     value: "festivals",
//   },
//   {
//     name: "Cultural Celebrations",
//     value: "cultural-celebrations",
//   },
//   {
//     name: "Art Exhibitions",
//     value: "art-exhibitions",
//   },
//   {
//     name: "Performing Arts",
//     value: "performing-arts",
//   },
//   {
//     name: "Concerts",
//     value: "concerts",
//   },
//   {
//     name: "Film Screenings",
//     value: "film-screenings",
//   },
//   {
//     name: "Theater Performances",
//     value: "theater-performances",
//   },
//   {
//     name: "Literary Readings",
//     value: "literary-readings",
//   },
//   {
//     name: "Sporting Events",
//     value: "sporting-events",
//   },
//   {
//     name: "Marathons",
//     value: "marathons",
//   },
//   {
//     name: "Fitness Events",
//     value: "fitness-events",
//   },
//   {
//     name: "E-Sports Tournaments",
//     value: "e-sports-tournaments",
//   },
//   {
//     name: "Charity Galas",
//     value: "charity-galas",
//   },
//   {
//     name: "Fundraising Dinners",
//     value: "fundraising-dinners",
//   },
//   {
//     name: "Benefit Concerts",
//     value: "benefit-concerts",
//   },
//   {
//     name: "Charity Walks",
//     value: "charity-walks",
//   },
//   {
//     name: "Volunteer Drives",
//     value: "volunteer-drives",
//   },
//   {
//     name: "Academic Conferences",
//     value: "academic-conferences",
//   },
//   {
//     name: "Guest Lectures",
//     value: "guest-lectures",
//   },
//   {
//     name: "Webinars",
//     value: "webinars",
//   },
//   {
//     name: "Science Fairs",
//     value: "science-fairs",
//   },
//   {
//     name: "Career Fairs",
//     value: "career-fairs",
//   },
//   {
//     name: "Hackathons",
//     value: "hackathons",
//   },
//   {
//     name: "Research Symposia",
//     value: "research-symposia",
//   },
//   {
//     name: "Public Holidays",
//     value: "public-holidays",
//   },
//   {
//     name: "School Holidays",
//     value: "school-holidays",
//   },
//   {
//     name: "Religious Observances",
//     value: "religious-observances",
//   },
//   {
//     name: "Seasonal Celebrations",
//     value: "seasonal-celebrations",
//   },
//   {
//     name: "Political Rallies",
//     value: "political-rallies",
//   },
//   {
//     name: "Town Hall Meetings",
//     value: "town-hall-meetings",
//   },
//   {
//     name: "Community Fairs",
//     value: "community-fairs",
//   },
//   {
//     name: "Parades",
//     value: "parades",
//   },
//   {
//     name: "Public Lectures",
//     value: "public-lectures",
//   },
//   {
//     name: "Farmers Markets",
//     value: "farmers-markets",
//   },
//   {
//     name: "Food Festivals",
//     value: "food-festivals",
//   },
//   {
//     name: "Virtual Conferences",
//     value: "virtual-conferences",
//   },
//   {
//     name: "Virtual Trade Shows",
//     value: "virtual-trade-shows",
//   },
//   {
//     name: "Hybrid Events",
//     value: "hybrid-events",
//   },
//   {
//     name: "Virtual Reality Events",
//     value: "virtual-reality-events",
//   },
//   {
//     name: "Live Streams",
//     value: "live-streams",
//   },
//   {
//     name: "Severe Weather Alerts",
//     value: "severe-weather",
//   },
//   {
//     name: "Disaster Response",
//     value: "disasters",
//   },
//   {
//     name: "Health Warnings",
//     value: "health-warnings",
//   },
//   {
//     name: "Protests",
//     value: "protests",
//   },
//   {
//     name: "Live TV Events",
//     value: "live-tv-events",
//   },
//   {
//     name: "Fashion Shows",
//     value: "fashion-shows",
//   },
//   {
//     name: "Tech Summits",
//     value: "tech-summits",
//   },
//   {
//     name: "Startup Pitches",
//     value: "startup-pitches",
//   },
//   {
//     name: "Book Launches",
//     value: "book-launches",
//   },
//   {
//     name: "Pop-Up Shops",
//     value: "pop-up-shops",
//   },
//   {
//     name: "Craft Fairs",
//     value: "craft-fairs",
//   },
//   {
//     name: "Gaming Conventions",
//     value: "gaming-conventions",
//   },
//   {
//     name: "Car Shows",
//     value: "car-shows",
//   },
//   {
//     name: "Pet Adoption Events",
//     value: "pet-adoption",
//   },
//   {
//     name: "Environmental Cleanups",
//     value: "environmental-cleanups",
//   },
//   {
//     name: "Tree Planting Events",
//     value: "tree-planting",
//   },
//   {
//     name: "Health and Wellness Retreats",
//     value: "health-wellness-retreats",
//   },
//   {
//     name: "Meditation and Yoga Events",
//     value: "meditation-yoga",
//   },
//   {
//     name: "International Summits",
//     value: "international-summits",
//   },
//   {
//     name: "Diplomatic Events",
//     value: "diplomatic-events",
//   },
//   {
//     name: "Historical Reenactments",
//     value: "historical-reenactments",
//   },
//   {
//     name: "Science and Technology Exhibitions",
//     value: "science-tech-exhibitions",
//   },
//   {
//     name: "Agricultural Shows",
//     value: "agricultural-shows",
//   },
//   {
//     name: "Home and Garden Shows",
//     value: "home-garden-shows",
//   },
//   {
//     name: "Travel and Adventure Expos",
//     value: "travel-adventure-expos",
//   },
//   {
//     name: "Wine and Food Tastings",
//     value: "wine-food-tastings",
//   },
//   {
//     name: "Street Performances",
//     value: "street-performances",
//   },
//   {
//     name: "Flash Mobs",
//     value: "flash-mobs",
//   },
//   {
//     name: "Silent Discos",
//     value: "silent-discos",
//   },
//   {
//     name: "Escape Room Events",
//     value: "escape-room-events",
//   },
//   {
//     name: "Trivia Nights",
//     value: "trivia-nights",
//   },
//   {
//     name: "Open Mic Nights",
//     value: "open-mic-nights",
//   },
//   {
//     name: "Karaoke Nights",
//     value: "karaoke-nights",
//   },
//   {
//     name: "Astronomy Events",
//     value: "astronomy-events",
//   },
//   {
//     name: "Community Service Days",
//     value: "community-service-days",
//   },
//   {
//     name: "Cultural Exchange Events",
//     value: "cultural-exchange",
//   },
//   {
//     name: "Makerspaces and DIY Workshops",
//     value: "makerspaces-diy",
//   },
//   {
//     name: "Parenting Workshops",
//     value: "parenting-workshops",
//   },
//   {
//     name: "Youth Camps",
//     value: "youth-camps",
//   },
//   {
//     name: "Senior Citizen Events",
//     value: "senior-citizen-events",
//   },
//   {
//     name: "LGBTQ+ Pride Events",
//     value: "lgbtq-pride",
//   },
//   {
//     name: "Indigenous Cultural Events",
//     value: "indigenous-cultural",
//   },
//   {
//     name: "Accessibility-Focused Events",
//     value: "accessibility-focused",
//   },
//   {
//     name: "Mental Health Awareness Events",
//     value: "mental-health-awareness",
//   },
//   {
//     name: "Grassroots Campaigns",
//     value: "grassroots-campaigns",
//   },
// ];

export const CATEGORIES = [
	{
		name: "Featured",
		value: "featured",
	},
	{
		name: "Concerts",
		value: "concerts",
	},
	{
		name: "Workshops",
		value: "workshops",
	},
	{
		name: "Festivals",
		value: "festivals",
	},
	{
		name: "Exhibitions",
		value: "exhibitions",
	},
	{
		name: "Conferences",
		value: "conferences",
	},
	{
		name: "Sports",
		value: "sports",
	},
	{
		name: "Networking",
		value: "networking",
	},
	{
		name: "Theater",
		value: "theater",
	},
	{
		name: "Wellness",
		value: "wellness",
	},
	{
		name: "Charity",
		value: "charity",
	},
	{
		name: "Parties",
		value: "parties",
	},
	{
		name: "Seminars",
		value: "seminars",
	},
	{
		name: "Markets",
		value: "markets",
	},
	{
		name: "Tours",
		value: "tours",
	},
];

export const HEADERITEMS: HeaderItemsTypes[] = [
	{
		icon: <FaRegUser className=" w-[16px] h-[16px]" />,
		path: "/user/me",
		title: "Your profile",
		value: "profile",
	},
	{
		icon: <MdEventNote className=" w-[16px] h-[16px]" />,
		path: "/user/me/my-events",
		title: "Your events",
		value: "events",
	},
	{
		icon: <LuTickets className=" w-[16px] h-[16px]" />,
		path: "/user/me/my-tickets",
		title: "Your tickets",
		value: "tickets",
	},
	{
		icon: <LuMessageSquareText className=" w-[16px] h-[16px]" />,
		path: "/user/me/my-chats",
		title: "Your chats",
		value: "chats",
	},
	{
		icon: <Bookmark className=" w-[16px] h-[16px]" />,
		path: "/user/me/my-bookmarks",
		title: "Your bookmarks",
		value: "bookmarks",
	},
];

export const DUMMYTRENDINGEVENTS: TrendingEventsProps[] = [
	{
		image: "/dummy-images/cover.png",
		title: "Test Event 01",
		day: new Date(),
		location: "Test Location, test place,",
		path: "",
	},
	{
		image: "/dummy-images/cover.png",
		title: "Test Event 01",
		day: new Date(),
		location: "Test Location, test place,",
		path: "",
	},
	{
		image: "/dummy-images/cover.png",
		title: "Test Event 01",
		day: new Date(),
		location: "Test Location, test place,",
		path: "",
	},
	{
		image: "/dummy-images/cover.png",
		title: "Test Event 01",
		day: new Date(),
		location: "Test Location, test place,",
		path: "",
	},
	{
		image: "/dummy-images/cover.png",
		title: "Test Event 01",
		day: new Date(),
		location: "Test Location, test place,",
		path: "",
	},
	{
		image: "/dummy-images/cover.png",
		title: "Test Event 01",
		day: new Date(),
		location: "Test Location, test place,",
		path: "",
	},
	{
		image: "/dummy-images/cover.png",
		title: "Test Event 01",
		day: new Date(),
		location: "Test Location, test place,",
		path: "",
	},
	{
		image: "/dummy-images/cover.png",
		title: "Test Event 01",
		day: new Date(),
		location: "Test Location, test place,",
		path: "",
	},
	{
		image: "/dummy-images/cover.png",
		title: "Test Event 01",
		day: new Date(),
		location: "Test Location, test place,",
		path: "",
	},
];

export const TICKETTANDC = [
	"Tickets must be purchased only through authorized sellers. Unauthorized tickets may be invalidated without refund.",
	"All ticket sales are final. Refunds, exchanges, or cancellations are only permitted if the event is canceled or postponed.",
	"Attendees must present a valid ticket and, where required, a government-issued ID for entry. Re-entry is not allowed unless specified.",
	"The event organizer reserves the right to refuse entry or remove any attendee who does not comply with the event's rules or policies.",
	"By purchasing a ticket, attendees agree to comply with all applicable venue regulations, safety protocols, and local laws.",
	"Tickets may not be resold, transferred, or offered for commercial purposes without prior written consent from the event organizer.",
	"The event organizer is not responsible for lost, stolen, or damaged tickets.",
	"Photography, videography, or recording may be restricted or prohibited. Attendees must comply with all media policies communicated by the organizer.",
	"Personal belongings are the responsibility of the attendee. The organizer is not liable for any loss or damage.",
	"The event schedule, performers, or venue may be subject to change. Every effort will be made to notify ticket holders of significant changes.",
	"By attending the event, attendees consent to the use of their images or recordings by the organizer for promotional purposes unless explicitly opted out.",
];

export const INITIALTICKETS: InitialTicketProps[] = [
	{
		icon: <Ticket className=" w-5 h-5" />,
		amount: 0,
		currency: "NGN",
		isFree: true,
		title: "Regular Ticket",
		quantity: 0,
	},
	{
		icon: <Crown className=" w-5 h-5" />,
		amount: 0,
		currency: "NGN",
		isFree: true,
		title: "VIP Ticket",
		quantity: 0,
	},
];

export const DUMMYATTENDEES = [
	{
		image: "/resources/no-profile.jpg",
		name: "John Doe",
	},
	{
		image: "/resources/no-profile.jpg",
		name: "John Doe 1",
	},
	{
		image: "/resources/no-profile.jpg",
		name: "John Doe 2",
	},
];

export const ACCOUNTSETTINGS = [
	{
		icon: <Pencil />,
		label: "Edit profile",
		path: "me/edit-profile",
	},
	{
		icon: <CircleUserRound />,
		label: "Account settings",
		path: "me/account-settings",
	},
	{
		icon: <Bell />,
		label: "Notification settings",
		path: "",
	},
	{
		icon: <UserRoundPlus />,
		label: "Invite a friend",
		path: "",
	},
	{
		icon: <Headset />,
		label: "Contact support",
		path: "",
	},
	{
		icon: <ReceiptText />,
		label: "Terms of service",
		path: "",
	},
	{
		icon: <ShieldAlert />,
		label: "Privacy policy",
		path: "",
	},
	{
		icon: <LogOut />,
		label: "Sign out from this device",
		path: "",
	},
];
