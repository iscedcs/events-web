import { FaRegUser } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import { MdEventNote } from "react-icons/md";
import { HeaderItemsTypes } from "./types/layout";

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
    update: "/events/{id}/update",
    all: "/events/events",
    all_events_user: "/events/events",
    one: "/events/one/{id}",
    events_search: "/events/search",
    updelete: "/events/{id}/updelete",
    gallery: "/gallery/event/{event_id}",
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
    delete_message: "/chat/{id}/delete-message",
    harddelete_message: "/chat/{id}/harddelete-message",
  },
  attendees: {
    all: "/attendees/event/{id}",
    one: "/attendees/{id}/one",
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

export const CATEGORIES = [
  {
    name: "Featured",
    value: "featured",
  },
  {
    name: "Conferences",
    value: "conferences",
  },
  {
    name: "Seminars",
    value: "seminars",
  },
  {
    name: "Workshops",
    value: "workshops",
  },
  {
    name: "Trade Shows",
    value: "trade-shows",
  },
  {
    name: "Expos",
    value: "expos",
  },
  {
    name: "Product Launches",
    value: "product-launches",
  },
  {
    name: "Networking Events",
    value: "networking",
  },
  {
    name: "Corporate Retreats",
    value: "corporate-retreats",
  },
  {
    name: "Team Building",
    value: "team-building",
  },
  {
    name: "Award Ceremonies",
    value: "award-ceremonies",
  },
  {
    name: "Board Meetings",
    value: "board-meetings",
  },
  {
    name: "Shareholder Meetings",
    value: "shareholder-meetings",
  },
  {
    name: "Weddings",
    value: "weddings",
  },
  {
    name: "Engagement Parties",
    value: "engagement-parties",
  },
  {
    name: "Birthday Parties",
    value: "birthday-parties",
  },
  {
    name: "Anniversary Celebrations",
    value: "anniversaries",
  },
  {
    name: "Baby Showers",
    value: "baby-showers",
  },
  {
    name: "Family Reunions",
    value: "family-reunions",
  },
  {
    name: "Graduation Parties",
    value: "graduation-parties",
  },
  {
    name: "Memorial Services",
    value: "memorial-services",
  },
  {
    name: "Festivals",
    value: "festivals",
  },
  {
    name: "Cultural Celebrations",
    value: "cultural-celebrations",
  },
  {
    name: "Art Exhibitions",
    value: "art-exhibitions",
  },
  {
    name: "Performing Arts",
    value: "performing-arts",
  },
  {
    name: "Concerts",
    value: "concerts",
  },
  {
    name: "Film Screenings",
    value: "film-screenings",
  },
  {
    name: "Theater Performances",
    value: "theater-performances",
  },
  {
    name: "Literary Readings",
    value: "literary-readings",
  },
  {
    name: "Sporting Events",
    value: "sporting-events",
  },
  {
    name: "Marathons",
    value: "marathons",
  },
  {
    name: "Fitness Events",
    value: "fitness-events",
  },
  {
    name: "E-Sports Tournaments",
    value: "e-sports-tournaments",
  },
  {
    name: "Charity Galas",
    value: "charity-galas",
  },
  {
    name: "Fundraising Dinners",
    value: "fundraising-dinners",
  },
  {
    name: "Benefit Concerts",
    value: "benefit-concerts",
  },
  {
    name: "Charity Walks",
    value: "charity-walks",
  },
  {
    name: "Volunteer Drives",
    value: "volunteer-drives",
  },
  {
    name: "Academic Conferences",
    value: "academic-conferences",
  },
  {
    name: "Guest Lectures",
    value: "guest-lectures",
  },
  {
    name: "Webinars",
    value: "webinars",
  },
  {
    name: "Science Fairs",
    value: "science-fairs",
  },
  {
    name: "Career Fairs",
    value: "career-fairs",
  },
  {
    name: "Hackathons",
    value: "hackathons",
  },
  {
    name: "Research Symposia",
    value: "research-symposia",
  },
  {
    name: "Public Holidays",
    value: "public-holidays",
  },
  {
    name: "School Holidays",
    value: "school-holidays",
  },
  {
    name: "Religious Observances",
    value: "religious-observances",
  },
  {
    name: "Seasonal Celebrations",
    value: "seasonal-celebrations",
  },
  {
    name: "Political Rallies",
    value: "political-rallies",
  },
  {
    name: "Town Hall Meetings",
    value: "town-hall-meetings",
  },
  {
    name: "Community Fairs",
    value: "community-fairs",
  },
  {
    name: "Parades",
    value: "parades",
  },
  {
    name: "Public Lectures",
    value: "public-lectures",
  },
  {
    name: "Farmers Markets",
    value: "farmers-markets",
  },
  {
    name: "Food Festivals",
    value: "food-festivals",
  },
  {
    name: "Virtual Conferences",
    value: "virtual-conferences",
  },
  {
    name: "Virtual Trade Shows",
    value: "virtual-trade-shows",
  },
  {
    name: "Hybrid Events",
    value: "hybrid-events",
  },
  {
    name: "Virtual Reality Events",
    value: "virtual-reality-events",
  },
  {
    name: "Live Streams",
    value: "live-streams",
  },
  {
    name: "Severe Weather Alerts",
    value: "severe-weather",
  },
  {
    name: "Disaster Response",
    value: "disasters",
  },
  {
    name: "Health Warnings",
    value: "health-warnings",
  },
  {
    name: "Protests",
    value: "protests",
  },
  {
    name: "Live TV Events",
    value: "live-tv-events",
  },
  {
    name: "Fashion Shows",
    value: "fashion-shows",
  },
  {
    name: "Tech Summits",
    value: "tech-summits",
  },
  {
    name: "Startup Pitches",
    value: "startup-pitches",
  },
  {
    name: "Book Launches",
    value: "book-launches",
  },
  {
    name: "Pop-Up Shops",
    value: "pop-up-shops",
  },
  {
    name: "Craft Fairs",
    value: "craft-fairs",
  },
  {
    name: "Gaming Conventions",
    value: "gaming-conventions",
  },
  {
    name: "Car Shows",
    value: "car-shows",
  },
  {
    name: "Pet Adoption Events",
    value: "pet-adoption",
  },
  {
    name: "Environmental Cleanups",
    value: "environmental-cleanups",
  },
  {
    name: "Tree Planting Events",
    value: "tree-planting",
  },
  {
    name: "Health and Wellness Retreats",
    value: "health-wellness-retreats",
  },
  {
    name: "Meditation and Yoga Events",
    value: "meditation-yoga",
  },
  {
    name: "International Summits",
    value: "international-summits",
  },
  {
    name: "Diplomatic Events",
    value: "diplomatic-events",
  },
  {
    name: "Historical Reenactments",
    value: "historical-reenactments",
  },
  {
    name: "Science and Technology Exhibitions",
    value: "science-tech-exhibitions",
  },
  {
    name: "Agricultural Shows",
    value: "agricultural-shows",
  },
  {
    name: "Home and Garden Shows",
    value: "home-garden-shows",
  },
  {
    name: "Travel and Adventure Expos",
    value: "travel-adventure-expos",
  },
  {
    name: "Wine and Food Tastings",
    value: "wine-food-tastings",
  },
  {
    name: "Street Performances",
    value: "street-performances",
  },
  {
    name: "Flash Mobs",
    value: "flash-mobs",
  },
  {
    name: "Silent Discos",
    value: "silent-discos",
  },
  {
    name: "Escape Room Events",
    value: "escape-room-events",
  },
  {
    name: "Trivia Nights",
    value: "trivia-nights",
  },
  {
    name: "Open Mic Nights",
    value: "open-mic-nights",
  },
  {
    name: "Karaoke Nights",
    value: "karaoke-nights",
  },
  {
    name: "Astronomy Events",
    value: "astronomy-events",
  },
  {
    name: "Community Service Days",
    value: "community-service-days",
  },
  {
    name: "Cultural Exchange Events",
    value: "cultural-exchange",
  },
  {
    name: "Makerspaces and DIY Workshops",
    value: "makerspaces-diy",
  },
  {
    name: "Parenting Workshops",
    value: "parenting-workshops",
  },
  {
    name: "Youth Camps",
    value: "youth-camps",
  },
  {
    name: "Senior Citizen Events",
    value: "senior-citizen-events",
  },
  {
    name: "LGBTQ+ Pride Events",
    value: "lgbtq-pride",
  },
  {
    name: "Indigenous Cultural Events",
    value: "indigenous-cultural",
  },
  {
    name: "Accessibility-Focused Events",
    value: "accessibility-focused",
  },
  {
    name: "Mental Health Awareness Events",
    value: "mental-health-awareness",
  },
  {
    name: "Grassroots Campaigns",
    value: "grassroots-campaigns",
  },
];

export const HEADERITEMS: HeaderItemsTypes[] = [
  {
    icon: <FaRegUser className=" w-[16px] h-[16px]" />,
    path: "",
    title: "Your profile",
    value: "profile",
  },
  {
    icon: <MdEventNote className=" w-[16px] h-[16px]" />,
    path: "",
    title: "Your events",
    value: "events",
  },
  {
    icon: <LuMessageSquareText className=" w-[16px] h-[16px]" />,
    path: "",
    title: "Your chats",
    value: "events",
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
