/* global self, firebase */

importScripts(
	"https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

const firebaseConfig = {
	apiKey: "AIzaSyAFNiuqi3TJJ7Q8eexaDd2VfBGjmaxZAyE",
	authDomain: "gada-8b3c8.firebaseapp.com",
	projectId: "gada-8b3c8",
	storageBucket: "gada-8b3c8.firebasestorage.app",
	messagingSenderId: "552827325072",
	appId: "1:552827325072:web:e7b453093439f1b5d6e615",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);

	const notificationTitle = payload.notification?.title || "New notification";
	const notificationOptions = {
		body: payload.notification?.body,
		icon: "/icons/icon-192x192.png", // optional
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
