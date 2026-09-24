/* Poorna's Kitchen service worker — makes the app installable and open instantly, even on a weak connection.
   Live data sync is handled by Firebase (it keeps its own offline copy). Bump VERSION after changing app files. */
const VERSION = "pk-v2";
const SHELL = ["./", "index.html", "firebase-config.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "icons/favicon-32.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  // Never cache live database / login traffic
  if (/firestore\.googleapis|identitytoolkit|securetoken|googleapis\.com\/(v1|identity)/.test(url.href)) return;
  // App pages & config: network first (get updates), fall back to cache when offline
  if (url.origin === location.origin && (req.mode === "navigate" || url.pathname.endsWith("index.html") || url.pathname.endsWith("firebase-config.js"))) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(k => k.put(req, c)); return r; }).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
    return;
  }
  // Icons, fonts, Firebase library: cache first, refresh in background
  if (url.origin === location.origin || /gstatic\.com|fonts\.googleapis\.com/.test(url.host)) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(VERSION).then(k => k.put(req, c)); } return r; }).catch(() => hit);
      return hit || net;
    }));
  }
});
