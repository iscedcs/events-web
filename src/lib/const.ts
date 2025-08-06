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
