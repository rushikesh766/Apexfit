const CACHE_VERSION = "v2";
const STATIC_CACHE = `apexfit-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `apexfit-dynamic-${CACHE_VERSION}`;

// Core assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/offline.html"
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("apexfit-") && key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== "GET") return;
  
  // Skip chrome-extension and other non-http(s) requests
  if (!request.url.startsWith("http")) return;
  
  // Handle navigation requests
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Try cache first, then offline page
          return caches.match(request)
            .then((cached) => cached || caches.match("/offline.html"));
        })
    );
    return;
  }
  
  // Handle static assets (JS, CSS, images)
  if (request.destination === "script" || 
      request.destination === "style" || 
      request.destination === "image" ||
      request.destination === "font") {
    event.respondWith(
      caches.match(request)
        .then((cached) => {
          // Return cached version and update in background
          const fetchPromise = fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE).then((cache) => {
                  cache.put(request, responseClone);
                });
              }
              return response;
            })
            .catch(() => cached);
          
          return cached || fetchPromise;
        })
    );
    return;
  }
  
  // Default: network first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Push notification handling
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {
    title: "APEXFIT",
    body: "You have a new notification",
    icon: "/icons/icon-192x192.png"
  };

  const options = {
    body: data.body,
    icon: data.icon || "/icons/icon-192x192.png",
    badge: "/icons/icon-96x96.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/"
    },
    actions: data.actions || []
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  
  const targetUrl = event.notification.data?.url || "/";
  
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        // Check if there's already a window open
        for (const client of clients) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        // Open new window if none exists
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      })
  );
});

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-attendance") {
    event.waitUntil(syncAttendance());
  }
});

async function syncAttendance() {
  // Placeholder for syncing offline attendance records
  // This would read from IndexedDB and POST to the server
  console.log("[SW] Syncing attendance data...");
}
