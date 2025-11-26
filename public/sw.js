if (!self.define) {
  let e,
    a = {};
  const s = (s, c) => (
    (s = new URL(s + ".js", c).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, t) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[i]) return;
    let n = {};
    const r = (e) => s(e, i),
      d = { module: { uri: i }, exports: n, require: r };
    a[i] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (t(...e), n));
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
          url: "/_next/app-build-manifest.json",
          revision: "797a4a6c83ead6e4689d8f4188bd14fe",
        },
        {
          url: "/_next/static/chunks/1159-d5d2ada0fc14affd.js",
          revision: "d5d2ada0fc14affd",
        },
        {
          url: "/_next/static/chunks/15a83e89-a7109435f1fc4ba4.js",
          revision: "a7109435f1fc4ba4",
        },
        {
          url: "/_next/static/chunks/1c5964cc-4d6bc0399e703c7b.js",
          revision: "4d6bc0399e703c7b",
        },
        {
          url: "/_next/static/chunks/1fc34c47-1cc89e831af5beca.js",
          revision: "1cc89e831af5beca",
        },
        {
          url: "/_next/static/chunks/2026-5dde060c38a05256.js",
          revision: "5dde060c38a05256",
        },
        {
          url: "/_next/static/chunks/3001-8b42c99ac00b3d23.js",
          revision: "8b42c99ac00b3d23",
        },
        {
          url: "/_next/static/chunks/3223-2abe27ef188ef1c2.js",
          revision: "2abe27ef188ef1c2",
        },
        {
          url: "/_next/static/chunks/3306-b3b8e3036c474a56.js",
          revision: "b3b8e3036c474a56",
        },
        {
          url: "/_next/static/chunks/33b75b42-3cbc0e0fed87c69c.js",
          revision: "3cbc0e0fed87c69c",
        },
        {
          url: "/_next/static/chunks/33e14e32-f15ff9b65a1c18f6.js",
          revision: "f15ff9b65a1c18f6",
        },
        {
          url: "/_next/static/chunks/36f8eb77-1a3aea69a9b96e88.js",
          revision: "1a3aea69a9b96e88",
        },
        {
          url: "/_next/static/chunks/3f731c04-90434ff02cf8f33f.js",
          revision: "90434ff02cf8f33f",
        },
        {
          url: "/_next/static/chunks/4352e4e9-dbd9d0b98cac2e67.js",
          revision: "dbd9d0b98cac2e67",
        },
        {
          url: "/_next/static/chunks/46c813c4-6dc377d0e99cfd81.js",
          revision: "6dc377d0e99cfd81",
        },
        {
          url: "/_next/static/chunks/5032-70ac4ecd658cf912.js",
          revision: "70ac4ecd658cf912",
        },
        {
          url: "/_next/static/chunks/52624530-4048b53346a30327.js",
          revision: "4048b53346a30327",
        },
        {
          url: "/_next/static/chunks/52ad4036-20b39d8b29993af4.js",
          revision: "20b39d8b29993af4",
        },
        {
          url: "/_next/static/chunks/539845e3-88ae17fc6eb35b5b.js",
          revision: "88ae17fc6eb35b5b",
        },
        {
          url: "/_next/static/chunks/5398b9db-89c7d4a2a571ee6f.js",
          revision: "89c7d4a2a571ee6f",
        },
        {
          url: "/_next/static/chunks/5794-e8044b10a28fbe27.js",
          revision: "e8044b10a28fbe27",
        },
        {
          url: "/_next/static/chunks/597.a41e27305059bfee.js",
          revision: "a41e27305059bfee",
        },
        {
          url: "/_next/static/chunks/6228-089944854ec12944.js",
          revision: "089944854ec12944",
        },
        {
          url: "/_next/static/chunks/6571-64157107b786019c.js",
          revision: "64157107b786019c",
        },
        {
          url: "/_next/static/chunks/6908-10fb8471c0001821.js",
          revision: "10fb8471c0001821",
        },
        {
          url: "/_next/static/chunks/6d60d248-ba48f8ec35f3689c.js",
          revision: "ba48f8ec35f3689c",
        },
        {
          url: "/_next/static/chunks/7095-49420ad7a6e0a2bb.js",
          revision: "49420ad7a6e0a2bb",
        },
        {
          url: "/_next/static/chunks/73233cf4-22d61da21bb15935.js",
          revision: "22d61da21bb15935",
        },
        {
          url: "/_next/static/chunks/7439-e5a0a9f3331ea35d.js",
          revision: "e5a0a9f3331ea35d",
        },
        {
          url: "/_next/static/chunks/7974-2421b0105294846b.js",
          revision: "2421b0105294846b",
        },
        {
          url: "/_next/static/chunks/8143-0be7ef1b6438c33d.js",
          revision: "0be7ef1b6438c33d",
        },
        {
          url: "/_next/static/chunks/8406-5f4821602d1b3e3b.js",
          revision: "5f4821602d1b3e3b",
        },
        {
          url: "/_next/static/chunks/9305-89fb619a7ad953e7.js",
          revision: "89fb619a7ad953e7",
        },
        {
          url: "/_next/static/chunks/9337-8336dfce9d5743d2.js",
          revision: "8336dfce9d5743d2",
        },
        {
          url: "/_next/static/chunks/9571-19e50ad8e38ad28a.js",
          revision: "19e50ad8e38ad28a",
        },
        {
          url: "/_next/static/chunks/9615-ca26cd3a0ff17284.js",
          revision: "ca26cd3a0ff17284",
        },
        {
          url: "/_next/static/chunks/965-bf9ca9541132f234.js",
          revision: "bf9ca9541132f234",
        },
        {
          url: "/_next/static/chunks/9808-c29af608d154227e.js",
          revision: "c29af608d154227e",
        },
        {
          url: "/_next/static/chunks/9856.e74ea3372e169c4b.js",
          revision: "e74ea3372e169c4b",
        },
        {
          url: "/_next/static/chunks/app/(auth)/auth/login/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/(auth)/auth/logout/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/(private)/business/events/page-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/attendees/page-5ddf15bee83cc227.js",
          revision: "5ddf15bee83cc227",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/chat/page-d6afb6d1c158467b.js",
          revision: "d6afb6d1c158467b",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/check-in/%5BattendeeId%5D/page-23b3fca9a1e14657.js",
          revision: "23b3fca9a1e14657",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/check-in/page-f8fe6f89fc6f0e8b.js",
          revision: "f8fe6f89fc6f0e8b",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/check-in/scan/page-fb29989be8b552b7.js",
          revision: "fb29989be8b552b7",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/check-in/token/%5BaccessToken%5D/page-23b3fca9a1e14657.js",
          revision: "23b3fca9a1e14657",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/edit/page-b7af7ca50e14ce8c.js",
          revision: "b7af7ca50e14ce8c",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/not-found-863b4eb2c0f7288b.js",
          revision: "863b4eb2c0f7288b",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/page-a4b46c3b97315340.js",
          revision: "a4b46c3b97315340",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/register/page-0ad57d2f940ee343.js",
          revision: "0ad57d2f940ee343",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/%5Bslug%5D/ticket/%5Bid%5D/page-a4b50b0bd589180c.js",
          revision: "a4b50b0bd589180c",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/all/page-a6225df15e3104bf.js",
          revision: "a6225df15e3104bf",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/events/page-d5e1cb102605f5cc.js",
          revision: "d5e1cb102605f5cc",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/layout-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/me/edit/page-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/me/my-bookmarks/page-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/me/my-chats/%5BchatroomId%5D/page-ba21e8c049c8e05e.js",
          revision: "ba21e8c049c8e05e",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/me/my-chats/page-9564a832855c793f.js",
          revision: "9564a832855c793f",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/me/my-events/page-d006bfddbb7c50b7.js",
          revision: "d006bfddbb7c50b7",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/me/my-tickets/page-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/(private)/user/me/page-601f0f604e90246d.js",
          revision: "601f0f604e90246d",
        },
        {
          url: "/_next/static/chunks/app/(public)/event/%5BcleanName%5D/page-bf3450be32f0200a.js",
          revision: "bf3450be32f0200a",
        },
        {
          url: "/_next/static/chunks/app/(public)/page-7adb15c4d0a1983b.js",
          revision: "7adb15c4d0a1983b",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-1499d9807ea11b7b.js",
          revision: "1499d9807ea11b7b",
        },
        {
          url: "/_next/static/chunks/app/api/attendee/new/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/auth/login/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/auth/logout/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/auth/request-verfication/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/auth/verify-code/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/chat/chatroom-with-attendee/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/chat/chatroom-with-host/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/chat/delete/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/chat/edit/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/event/delete/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/event/new/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/event/update/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/upload/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/api/watchlist/new/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/auth/callback/route-07e29d6abc55cadf.js",
          revision: "07e29d6abc55cadf",
        },
        {
          url: "/_next/static/chunks/app/layout-e892e48dbc34189e.js",
          revision: "e892e48dbc34189e",
        },
        {
          url: "/_next/static/chunks/c99dd624-9de22c657d86df10.js",
          revision: "9de22c657d86df10",
        },
        {
          url: "/_next/static/chunks/d4099a13-866073d219f53597.js",
          revision: "866073d219f53597",
        },
        {
          url: "/_next/static/chunks/f1534c21-5abc3a25fb0a74f6.js",
          revision: "5abc3a25fb0a74f6",
        },
        {
          url: "/_next/static/chunks/framework-65cade61ad5c0e6c.js",
          revision: "65cade61ad5c0e6c",
        },
        {
          url: "/_next/static/chunks/main-app-74566e0d0ad95d4f.js",
          revision: "74566e0d0ad95d4f",
        },
        {
          url: "/_next/static/chunks/main-d22c44ccb3136be9.js",
          revision: "d22c44ccb3136be9",
        },
        {
          url: "/_next/static/chunks/pages/_app-b6e21f571a218db5.js",
          revision: "b6e21f571a218db5",
        },
        {
          url: "/_next/static/chunks/pages/_error-f001a476f53e657b.js",
          revision: "f001a476f53e657b",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-70a6fe1926d067ba.js",
          revision: "70a6fe1926d067ba",
        },
        {
          url: "/_next/static/css/509a80ebe921d6b7.css",
          revision: "509a80ebe921d6b7",
        },
        {
          url: "/_next/static/css/dd5ca0f931a6bcd4.css",
          revision: "dd5ca0f931a6bcd4",
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
          url: "/_next/static/pvjDNpwBvpIELclq1Kuxo/_buildManifest.js",
          revision: "d2c3a5aa5b1e65c8785eb00aa6a51197",
        },
        {
          url: "/_next/static/pvjDNpwBvpIELclq1Kuxo/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
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
        { url: "/icon-192.png", revision: "819fb2b5162f51e1e5fa26cb2cf36bae" },
        { url: "/icon-512.png", revision: "6d5873be9c90a4a70e88126eb97dbf71" },
        { url: "/icon.png", revision: "819fb2b5162f51e1e5fa26cb2cf36bae" },
        { url: "/manifest.json", revision: "afb599c0370a635d72d43f7d35cf4fea" },
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
              response: a,
              event: s,
              state: c,
            }) =>
              a && "opaqueredirect" === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: "OK",
                    headers: a.headers,
                  })
                : a,
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
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
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
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
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
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith("/api/auth/") && !!a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
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
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
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
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
