const CACHE_NAME = 'swaed-uae-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/static/js/bundle.js',
  '/static/css/main.css',
  'https://public-frontend-cos.metadl.com/mgx/img/favicon.png'
];

// API endpoints to cache
const API_CACHE_URLS = [
  '/api/volunteer/profile',
  '/api/opportunities',
  '/api/volunteer/events',
  '/api/volunteer/certificates',
  '/api/volunteer/hours'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Serve cached page or offline page
          return caches.match(request)
            .then((cachedResponse) => {
              return cachedResponse || caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.status === 200 && request.method === 'GET') {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Serve cached API response if available
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                // Add offline indicator to cached response
                const response = cachedResponse.clone();
                return response.json()
                  .then((data) => {
                    data._offline = true;
                    data._cachedAt = new Date().toISOString();
                    return new Response(JSON.stringify(data), {
                      status: 200,
                      statusText: 'OK (Cached)',
                      headers: {
                        'Content-Type': 'application/json',
                        'X-Served-By': 'ServiceWorker-Cache'
                      }
                    });
                  });
              }
              // Return offline response for uncached API requests
              return new Response(JSON.stringify({
                error: 'Offline',
                message: 'This feature requires an internet connection',
                _offline: true
              }), {
                status: 503,
                statusText: 'Service Unavailable',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            });
        })
    );
    return;
  }

  // Handle static assets
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request)
          .then((response) => {
            // Cache successful responses for static assets
            if (response.status === 200 && 
                (request.destination === 'script' || 
                 request.destination === 'style' || 
                 request.destination === 'image')) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            // Return offline page for failed requests
            if (request.destination === 'document') {
              return caches.match(OFFLINE_URL);
            }
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'volunteer-checkin') {
    event.waitUntil(syncVolunteerCheckin());
  } else if (event.tag === 'volunteer-checkout') {
    event.waitUntil(syncVolunteerCheckout());
  } else if (event.tag === 'event-registration') {
    event.waitUntil(syncEventRegistration());
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const options = {
    body: 'You have new volunteer opportunities available!',
    icon: 'https://public-frontend-cos.metadl.com/mgx/img/favicon.png',
    badge: 'https://public-frontend-cos.metadl.com/mgx/img/favicon.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/opportunities'
    },
    actions: [
      {
        action: 'view',
        title: 'View Opportunities',
        icon: 'https://public-frontend-cos.metadl.com/mgx/img/favicon.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  if (event.data) {
    const data = event.data.json();
    options.title = data.title || 'SwaedUAE';
    options.body = data.body || options.body;
    options.data.url = data.url || options.data.url;
  }

  event.waitUntil(
    self.registration.showNotification('SwaedUAE', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  } else if (event.action !== 'dismiss') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sync functions
async function syncVolunteerCheckin() {
  try {
    const checkinData = await getStoredData('pending-checkins');
    if (checkinData && checkinData.length > 0) {
      for (const checkin of checkinData) {
        await fetch('/api/volunteer/checkin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(checkin)
        });
      }
      await clearStoredData('pending-checkins');
      console.log('Volunteer check-ins synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync volunteer check-ins:', error);
  }
}

async function syncVolunteerCheckout() {
  try {
    const checkoutData = await getStoredData('pending-checkouts');
    if (checkoutData && checkoutData.length > 0) {
      for (const checkout of checkoutData) {
        await fetch('/api/volunteer/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(checkout)
        });
      }
      await clearStoredData('pending-checkouts');
      console.log('Volunteer check-outs synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync volunteer check-outs:', error);
  }
}

async function syncEventRegistration() {
  try {
    const registrationData = await getStoredData('pending-registrations');
    if (registrationData && registrationData.length > 0) {
      for (const registration of registrationData) {
        await fetch('/api/events/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registration)
        });
      }
      await clearStoredData('pending-registrations');
      console.log('Event registrations synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync event registrations:', error);
  }
}

// Helper functions for IndexedDB operations
async function getStoredData(key) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SwaedUAE-OfflineDB', 1);
    
    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['offline-data'], 'readonly');
      const store = transaction.objectStore('offline-data');
      const getRequest = store.get(key);
      
      getRequest.onsuccess = () => {
        resolve(getRequest.result ? getRequest.result.data : null);
      };
      
      getRequest.onerror = () => reject(getRequest.error);
    };
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('offline-data')) {
        db.createObjectStore('offline-data', { keyPath: 'key' });
      }
    };
  });
}

async function clearStoredData(key) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SwaedUAE-OfflineDB', 1);
    
    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['offline-data'], 'readwrite');
      const store = transaction.objectStore('offline-data');
      const deleteRequest = store.delete(key);
      
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    };
  });
}

// Periodic background sync for data updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-volunteer-data') {
    event.waitUntil(updateVolunteerData());
  }
});

async function updateVolunteerData() {
  try {
    // Update volunteer profile
    const profileResponse = await fetch('/api/volunteer/profile');
    if (profileResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put('/api/volunteer/profile', profileResponse.clone());
    }

    // Update opportunities
    const opportunitiesResponse = await fetch('/api/opportunities');
    if (opportunitiesResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put('/api/opportunities', opportunitiesResponse.clone());
    }

    console.log('Volunteer data updated successfully');
  } catch (error) {
    console.error('Failed to update volunteer data:', error);
  }
}