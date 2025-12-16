if (!self.define) {
	let e,
		s = {};
	const a = (a, t) => (
		(a = new URL(a + ".js", t).href),
		s[a] ||
			new Promise((s) => {
				if ("document" in self) {
					const e = document.createElement("script");
					(e.src = a), (e.onload = s), document.head.appendChild(e);
				} else (e = a), importScripts(a), s();
			}).then(() => {
				let e = s[a];
				if (!e)
					throw new Error(`Module ${a} didn’t register its module`);
				return e;
			})
	);
	self.define = (t, i) => {
		const c =
			e ||
			("document" in self ? document.currentScript.src : "") ||
			location.href;
		if (s[c]) return;
		let n = {};
		const r = (e) => a(e, c),
			u = { module: { uri: c }, exports: n, require: r };
		s[c] = Promise.all(t.map((e) => u[e] || r(e))).then(
			(e) => (i(...e), n)
		);
	};
}
define(["./workbox-e9849328"], function (e) {
	"use strict";
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: "/_next/static/chunks/080e0dd7-bd70fc350120f74b.js",
					revision: "bd70fc350120f74b",
				},
				{
					url: "/_next/static/chunks/102-c51b573924c874d2.js",
					revision: "c51b573924c874d2",
				},
				{
					url: "/_next/static/chunks/1073-8065abe276126614.js",
					revision: "8065abe276126614",
				},
				{
					url: "/_next/static/chunks/1359-4c8d74dab9b5d500.js",
					revision: "4c8d74dab9b5d500",
				},
				{
					url: "/_next/static/chunks/1400-d1cbc85866a6eaab.js",
					revision: "d1cbc85866a6eaab",
				},
				{
					url: "/_next/static/chunks/1581-5cd83fdf5a57dce5.js",
					revision: "5cd83fdf5a57dce5",
				},
				{
					url: "/_next/static/chunks/1765-3d96317825f3cc54.js",
					revision: "3d96317825f3cc54",
				},
				{
					url: "/_next/static/chunks/1829-5c1888f90eeaa1fe.js",
					revision: "5c1888f90eeaa1fe",
				},
				{
					url: "/_next/static/chunks/1905-0d753b851e22f71b.js",
					revision: "0d753b851e22f71b",
				},
				{
					url: "/_next/static/chunks/2150-59498adfb5e54cac.js",
					revision: "59498adfb5e54cac",
				},
				{
					url: "/_next/static/chunks/2188-e7abba284b060e43.js",
					revision: "e7abba284b060e43",
				},
				{
					url: "/_next/static/chunks/273acdc0-6f8f9f0f5115ed53.js",
					revision: "6f8f9f0f5115ed53",
				},
				{
					url: "/_next/static/chunks/3899.fd4e0f414f3d6f20.js",
					revision: "fd4e0f414f3d6f20",
				},
				{
					url: "/_next/static/chunks/3927-3fba1b198fba5c54.js",
					revision: "3fba1b198fba5c54",
				},
				{
					url: "/_next/static/chunks/3968-90e71f22941f8231.js",
					revision: "90e71f22941f8231",
				},
				{
					url: "/_next/static/chunks/3af9ff6b-683929f027e60836.js",
					revision: "683929f027e60836",
				},
				{
					url: "/_next/static/chunks/4062.6281af9d1d1b892b.js",
					revision: "6281af9d1d1b892b",
				},
				{
					url: "/_next/static/chunks/4412-5c8026772685d42e.js",
					revision: "5c8026772685d42e",
				},
				{
					url: "/_next/static/chunks/46c813c4-1d9a94269e1a6760.js",
					revision: "1d9a94269e1a6760",
				},
				{
					url: "/_next/static/chunks/5790-1154396fa515303a.js",
					revision: "1154396fa515303a",
				},
				{
					url: "/_next/static/chunks/5b02cea5-31fc72ac353e47ad.js",
					revision: "31fc72ac353e47ad",
				},
				{
					url: "/_next/static/chunks/5dfcf1de-33133dfafce1fe19.js",
					revision: "33133dfafce1fe19",
				},
				{
					url: "/_next/static/chunks/6012-65a3e1779b050305.js",
					revision: "65a3e1779b050305",
				},
				{
					url: "/_next/static/chunks/6441-0af1341951c6d067.js",
					revision: "0af1341951c6d067",
				},
				{
					url: "/_next/static/chunks/6607-727bb6fc7bda9dc5.js",
					revision: "727bb6fc7bda9dc5",
				},
				{
					url: "/_next/static/chunks/6826.5e1cbf9a15cae3f0.js",
					revision: "5e1cbf9a15cae3f0",
				},
				{
					url: "/_next/static/chunks/69543acc-84b86e56acc99fad.js",
					revision: "84b86e56acc99fad",
				},
				{
					url: "/_next/static/chunks/778.aa9d7f5938c7ed4f.js",
					revision: "aa9d7f5938c7ed4f",
				},
				{
					url: "/_next/static/chunks/804921b5-be387bc0845ad1b0.js",
					revision: "be387bc0845ad1b0",
				},
				{
					url: "/_next/static/chunks/8502-3d3020d7506f0174.js",
					revision: "3d3020d7506f0174",
				},
				{
					url: "/_next/static/chunks/8763-61ba1d87045e9d38.js",
					revision: "61ba1d87045e9d38",
				},
				{
					url: "/_next/static/chunks/8892-2f9fda359f22f776.js",
					revision: "2f9fda359f22f776",
				},
				{
					url: "/_next/static/chunks/8954-1f0a1d42c3a1ae8f.js",
					revision: "1f0a1d42c3a1ae8f",
				},
				{
					url: "/_next/static/chunks/919c507c-8bae91b81d457de3.js",
					revision: "8bae91b81d457de3",
				},
				{
					url: "/_next/static/chunks/9357-d8186b217cbc5e20.js",
					revision: "d8186b217cbc5e20",
				},
				{
					url: "/_next/static/chunks/9376-f670ecb26c719e53.js",
					revision: "f670ecb26c719e53",
				},
				{
					url: "/_next/static/chunks/9397-669f651b34131b3a.js",
					revision: "669f651b34131b3a",
				},
				{
					url: "/_next/static/chunks/9477-0c7f88908733ee98.js",
					revision: "0c7f88908733ee98",
				},
				{
					url: "/_next/static/chunks/97a5ec36-e2a26d2744efd938.js",
					revision: "e2a26d2744efd938",
				},
				{
					url: "/_next/static/chunks/9906-076779b8d1696d19.js",
					revision: "076779b8d1696d19",
				},
				{
					url: "/_next/static/chunks/9980-4d87a1b069ba1e70.js",
					revision: "4d87a1b069ba1e70",
				},
				{
					url: "/_next/static/chunks/9b1a1e4b-1d10fe16d6d6ebf4.js",
					revision: "1d10fe16d6d6ebf4",
				},
				{
					url: "/_next/static/chunks/a1caa899-f5716fe6aba6ae20.js",
					revision: "f5716fe6aba6ae20",
				},
				{
					url: "/_next/static/chunks/ae00f86e-cfe62bee90935811.js",
					revision: "cfe62bee90935811",
				},
				{
					url: "/_next/static/chunks/app/(auth)/auth/login/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/(auth)/auth/logout/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/(private)/business/events/page-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/(private)/layout-7cd130d438e4ce3d.js",
					revision: "7cd130d438e4ce3d",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/attendees/page-b8df9569501a79da.js",
					revision: "b8df9569501a79da",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/chat/page-dc9df0504e097ba8.js",
					revision: "dc9df0504e097ba8",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/check-in/%5BattendeeId%5D/page-9f8c197437dffabb.js",
					revision: "9f8c197437dffabb",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/check-in/page-e0c4665daaacca97.js",
					revision: "e0c4665daaacca97",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/check-in/scan/page-da94135a4c08d3d6.js",
					revision: "da94135a4c08d3d6",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/check-in/token/%5BaccessToken%5D/page-9f8c197437dffabb.js",
					revision: "9f8c197437dffabb",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/edit/page-73f1c326acabfecc.js",
					revision: "73f1c326acabfecc",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/highlights/page-9e05ee9d4be6994f.js",
					revision: "9e05ee9d4be6994f",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/not-found-d5f2055329370562.js",
					revision: "d5f2055329370562",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/page-76f3e9d898bed778.js",
					revision: "76f3e9d898bed778",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/register/page-766dcc5dd238a923.js",
					revision: "766dcc5dd238a923",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/ticket/%5Bid%5D/page-367230c71f2fb49f.js",
					revision: "367230c71f2fb49f",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/categories/page-ca52329e398a971e.js",
					revision: "ca52329e398a971e",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/nearby-events/page-9e05ee9d4be6994f.js",
					revision: "9e05ee9d4be6994f",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/notifications/page-fe1eddfc10aac881.js",
					revision: "fe1eddfc10aac881",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/page-ada9fee898afa964.js",
					revision: "ada9fee898afa964",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/trending/page-0b0fcc1b824cab3e.js",
					revision: "0b0fcc1b824cab3e",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/events/upcoming/page-4b580b1c972281f4.js",
					revision: "4b580b1c972281f4",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/layout-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/account-settings/page-ca52329e398a971e.js",
					revision: "ca52329e398a971e",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/account-settings/reset-password/page-7a81f57003a77a60.js",
					revision: "7a81f57003a77a60",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/edit-profile/layout-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/edit-profile/page-96cf9c75711d9da3.js",
					revision: "96cf9c75711d9da3",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/layout-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/my-bookmarks/layout-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/my-bookmarks/page-9e05ee9d4be6994f.js",
					revision: "9e05ee9d4be6994f",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/my-chats/%5BchatroomId%5D/page-9512403d8c33b857.js",
					revision: "9512403d8c33b857",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/my-chats/layout-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/my-chats/page-710873f75339a6bc.js",
					revision: "710873f75339a6bc",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/my-events/layout-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/my-events/page-2c80ba53bd194b8a.js",
					revision: "2c80ba53bd194b8a",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/my-tickets/layout-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/my-tickets/page-9e05ee9d4be6994f.js",
					revision: "9e05ee9d4be6994f",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/notifications-settings/page-30cc341c66063ff9.js",
					revision: "30cc341c66063ff9",
				},
				{
					url: "/_next/static/chunks/app/(private)/user/me/page-7c10143d8c624a2b.js",
					revision: "7c10143d8c624a2b",
				},
				{
					url: "/_next/static/chunks/app/(public)/event/%5BcleanName%5D/page-a3f425efb5ac8055.js",
					revision: "a3f425efb5ac8055",
				},
				{
					url: "/_next/static/chunks/app/(public)/page-608a81f9495ab4f1.js",
					revision: "608a81f9495ab4f1",
				},
				{
					url: "/_next/static/chunks/app/_global-error/page-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/_not-found/page-c1ca2f2f28302427.js",
					revision: "c1ca2f2f28302427",
				},
				{
					url: "/_next/static/chunks/app/api/attendee/new/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/auth/login/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/auth/logout/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/auth/request-verfication/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/auth/reset-password/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/auth/send-reset-token/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/auth/verify-code/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/chat/chatroom-with-attendee/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/chat/chatroom-with-host/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/chat/delete/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/chat/edit/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/event/delete/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/event/new/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/event/update/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/notifications/mark-all-as-read/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/notifications/mark-read/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/notifications/register/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/notifications/update/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/ticket/register/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/upload/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/user/update/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/api/watchlist/new/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/auth/callback/route-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/app/layout-c2fc4ee34505cef0.js",
					revision: "c2fc4ee34505cef0",
				},
				{
					url: "/_next/static/chunks/b59c0c5a-db9df442d6725ada.js",
					revision: "db9df442d6725ada",
				},
				{
					url: "/_next/static/chunks/badf541d.53f09135c9e8820f.js",
					revision: "53f09135c9e8820f",
				},
				{
					url: "/_next/static/chunks/bd84db0a-ffdea52d9e6f9d3d.js",
					revision: "ffdea52d9e6f9d3d",
				},
				{
					url: "/_next/static/chunks/c132bf7d-c55171682586046d.js",
					revision: "c55171682586046d",
				},
				{
					url: "/_next/static/chunks/dd79e14b-01a31803b76d20cc.js",
					revision: "01a31803b76d20cc",
				},
				{
					url: "/_next/static/chunks/e4284f95-ff2d259eddd25953.js",
					revision: "ff2d259eddd25953",
				},
				{
					url: "/_next/static/chunks/e823231b-7357ee41d9bbe4cf.js",
					revision: "7357ee41d9bbe4cf",
				},
				{
					url: "/_next/static/chunks/ebfd98ee-c3aabf4b7c225376.js",
					revision: "c3aabf4b7c225376",
				},
				{
					url: "/_next/static/chunks/f9a5ee2b-986254edcfa4d5b1.js",
					revision: "986254edcfa4d5b1",
				},
				{
					url: "/_next/static/chunks/framework-b875f5d68be5ef0c.js",
					revision: "b875f5d68be5ef0c",
				},
				{
					url: "/_next/static/chunks/main-16b26c9d451b665f.js",
					revision: "16b26c9d451b665f",
				},
				{
					url: "/_next/static/chunks/main-app-5dd6cb8aba8acf48.js",
					revision: "5dd6cb8aba8acf48",
				},
				{
					url: "/_next/static/chunks/next/dist/client/components/builtin/app-error-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/next/dist/client/components/builtin/forbidden-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/next/dist/client/components/builtin/global-error-155ab00e39baeca0.js",
					revision: "155ab00e39baeca0",
				},
				{
					url: "/_next/static/chunks/next/dist/client/components/builtin/not-found-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/next/dist/client/components/builtin/unauthorized-4781a6002410534e.js",
					revision: "4781a6002410534e",
				},
				{
					url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
					revision: "846118c33b2c0e922d7b3a7676f81f6f",
				},
				{
					url: "/_next/static/chunks/webpack-d80c709604e7111b.js",
					revision: "d80c709604e7111b",
				},
				{
					url: "/_next/static/css/509a80ebe921d6b7.css",
					revision: "509a80ebe921d6b7",
				},
				{
					url: "/_next/static/css/8afd466312a7c704.css",
					revision: "8afd466312a7c704",
				},
				{
					url: "/_next/static/gh4m9QWRyOw-J-sh4cvmo/_buildManifest.js",
					revision: "38ec0522a950479d0cd1507e68827638",
				},
				{
					url: "/_next/static/gh4m9QWRyOw-J-sh4cvmo/_ssgManifest.js",
					revision: "b6652df95db52feb4daf4eca35380933",
				},
				{
					url: "/_next/static/media/103fc5fac08dcb15-s.p.woff2",
					revision: "239e3c121b9f93f650289374acbf6288",
				},
				{
					url: "/_next/static/media/10735954b8957dce-s.woff2",
					revision: "d2ec0e63a71b8e0df83c59b76a4df343",
				},
				{
					url: "/_next/static/media/32ec8d161d520037-s.woff2",
					revision: "20e85716ef3eabc59aa5594aadeaabb9",
				},
				{
					url: "/_next/static/media/69c8297e91a203ed-s.woff2",
					revision: "93e07d2ef36b2ab4db42ddde4176ed79",
				},
				{
					url: "/_next/static/media/84792440f5374347-s.woff2",
					revision: "b3ffb77daf1ddd24172ec70dea9af7d9",
				},
				{
					url: "/_next/static/media/c95a17d6aa1ccc69-s.woff2",
					revision: "cf9060e338211dea20a93490cbac6770",
				},
				{
					url: "/_next/static/media/ceda3e828136e1b8-s.woff2",
					revision: "0ac2f562e942403cf3fac6ba41831b88",
				},
				{
					url: "/dummy-images/cover.png",
					revision: "05f6ce71cd874bab685c97730f21fb20",
				},
				{
					url: "/dummy-images/map.png",
					revision: "099660208ab6e6d6745b9a4df47e0f02",
				},
				{
					url: "/dummy-images/qrcode.png",
					revision: "b7e4a1797832766f8b34140cf665c8c5",
				},
				{
					url: "/firebase-messaging-sw.js",
					revision: "bf89350decdceddd57d5a4f98bc64437",
				},
				{
					url: "/icon-192.png",
					revision: "489b20af4aa3d7c63a6e04959c666e6d",
				},
				{
					url: "/icon-512.png",
					revision: "38d1752499c891788c74164b45315cd5",
				},
				{
					url: "/icon.png",
					revision: "819fb2b5162f51e1e5fa26cb2cf36bae",
				},
				{
					url: "/manifest.json",
					revision: "a4ef0c5aacdd29987854a0f4a0b67f14",
				},
				{
					url: "/resources/3d-notification-bell.png",
					revision: "f34e1269cbccb6432403a5c4ab1eaf4a",
				},
				{
					url: "/resources/3d-pin-location.png",
					revision: "4cb8af8bd98ce7e3bc80b0e2976d5cab",
				},
				{
					url: "/resources/background-screen.gif",
					revision: "a980d92fbd2d38d3225b5bb84bcaaf71",
				},
				{
					url: "/resources/loading-screen.gif",
					revision: "41d0e1af0110b87a3cc369526592c408",
				},
				{
					url: "/resources/no-image.png",
					revision: "bbbce8ff02c754c9eae058e3cfb0ba95",
				},
				{
					url: "/resources/no-profile.jpg",
					revision: "8ff081b04500e5fbd9cfa154a75f927f",
				},
				{
					url: "/resources/notification.mp3",
					revision: "875834d629e2d0e43d8b69f88410ed59",
				},
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			"/",
			new e.NetworkFirst({
				cacheName: "start-url",
				plugins: [
					{
						cacheWillUpdate: async ({
							request: e,
							response: s,
							event: a,
							state: t,
						}) =>
							s && "opaqueredirect" === s.type
								? new Response(s.body, {
										status: 200,
										statusText: "OK",
										headers: s.headers,
								  })
								: s,
					},
				],
			}),
			"GET"
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: "google-fonts-webfonts",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 4,
						maxAgeSeconds: 31536e3,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: "google-fonts-stylesheets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 4,
						maxAgeSeconds: 604800,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-font-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 4,
						maxAgeSeconds: 604800,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-image-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 64,
						maxAgeSeconds: 86400,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-image",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 64,
						maxAgeSeconds: 86400,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: "static-audio-assets",
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: "static-video-assets",
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-js-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-style-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-data",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: "static-data-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				const s = e.pathname;
				return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
			},
			new e.NetworkFirst({
				cacheName: "apis",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 16,
						maxAgeSeconds: 86400,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith("/api/");
			},
			new e.NetworkFirst({
				cacheName: "others",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: "cross-origin",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 3600,
					}),
				],
			}),
			"GET"
		);
});
