/* global self, firebase */

// importScripts(
// 	"https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
// );
// importScripts(
// 	"https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
// );

// firebase.initializeApp({
// 	apiKey: "AIzaSyAFNiuqi3TJJ7Q8eexaDd2VfBGjmaxZAyE",
// 	authDomain: "gada-8b3c8.firebaseapp.com",
// 	projectId: "gada-8b3c8",
// 	storageBucket: "gada-8b3c8.firebasestorage.app",
// 	messagingSenderId: "552827325072",
// 	appId: "1:552827325072:web:e7b453093439f1b5d6e615",
// });

// firebase.messaging();

self.addEventListener("push", (event) => {
	const data = event.data?.json();
	if (!data) return;

	event.waitUntil(
		self.registration.showNotification(data.title, {
			body: data.body,
			icon: "/icon-192.png",
			data: { url: data.url },
		})
	);
});

self.addEventListener("notificationclick", (event) => {
	event.notification.close();

	const url = event.notification.data?.url || "/";
	event.waitUntil(clients.openWindow(url));
});
