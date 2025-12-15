// src/lib/firebase.ts
"use client";

import { initializeApp, getApps } from "firebase/app";
import {
	getMessaging,
	getToken,
	isSupported,
	Messaging,
} from "firebase/messaging";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export async function getMessagingInstance(): Promise<Messaging | null> {
	const supported = await isSupported();
	if (!supported) return null;
	return getMessaging(app);
}

export async function requestFcmToken(
	vapidKey: string
): Promise<string | null> {
	if (typeof window === "undefined") return null;

	const messaging = await getMessagingInstance();
	if (!messaging) return null;

	// const registration = await navigator.serviceWorker.register(
	// 	"/firebase-messaging-sw.js"
	// );
	const registration = await navigator.serviceWorker.ready;

	const token = await getToken(messaging, {
		vapidKey,
		serviceWorkerRegistration: registration,
	});

	return token ?? null;
}
