GADA

A modern, scalable event management and discovery platform built as part of the ISCE Ecosystem. GADA enables individuals, communities, and organizations to create, discover, manage, and attend events seamlessly — with real-time interactions, notifications, and a clean user experience.

Overview

GADA is designed to power the full event lifecycle:

Event creation and publishing

Event discovery and registration

Ticketing and attendee management

Real-time chat and notifications

Secure check-in and engagement tools

This application is built with scalability and extensibility in mind and integrates cleanly with other ISCE products such as ISCE CONNECT.

 Key Features

Event Creation & ManagementCreate, edit, publish, and manage events with flexible configurations.

Event DiscoveryBrowse and search events by category, location, or popularity.

Registration & TicketingSeamless attendee registration with ticket support.

Real-Time Chat & MessagingPublic and private messaging for event discussions and engagement.

Push & In-App NotificationsReal-time updates using sockets and push notifications.

QR Code / Check-In SupportFast attendee verification and check-in at events.

Admin & Organizer DashboardsManage events, attendees, and analytics from a centralized dashboard.

Progressive Web App (PWA)Installable experience with offline support and push notifications.

Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

UI: Tailwind CSS

Forms & Validation: React Hook Form + Zod

State & Realtime: WebSockets

Architecture: Polyrepo

Notifications: Push Notifications (PWA + Firebase)

Authentication: Next Auth 

Project Structure (High-Level)

src/
  app/            # Main Next.js application

Getting Started

Prerequisites

Node.js (v18+ recommended)

pnpm / yarn / npm

Installation

# Install dependencies
pnpm install

Development

# Start development server
pnpm dev

Build

pnpm build

Environment Variables

Create a .env file and configure the required environment variables:

NEXT_PUBLIC_LIVE_EVENTS_BACKEND_URL = 
NEXT_PUBLIC_LIVE_ISCEAUTH_BACKEND_URL =
DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_AUTH_BASE_URL=
NEXT_PUBLIC_AUTH_LOGIN_PATH=
NEXT_PUBLIC_URL=

⚠️ Do not commit environment variables to the repository.

ISCE Ecosystem

GADA is part of the ISCE Ecosystem, a suite of products focused on empowering:

Student entrepreneurs

Professionals

Communities

Businesses and creators

Related products:

ISCE CONNECT – Professional and community networking

ISCE STORE – Digital commerce (coming soon)

ISCE WALLET – Payments & digital assets (planned)

Contributing

Contributions are welcome!

Fork the repository

Create a new feature branch

Commit your changes

Open a pull request

Please ensure code follows the existing structure and conventions.

Roadmap

Advanced event analytics

Paid ticketing & payouts

Organizer verification

Event recommendations

Deeper ISCE CONNECT integration

License

This project is proprietary to ISCE Digital Concept. Unauthorized distribution or commercial use is not permitted.

Contact

For questions, feedback, or partnerships:

ISCE Digital ConceptWebsite: https://www.isce.tech/Email: isceofficial@gmail.com

Built by the ISCE Engineering Team

