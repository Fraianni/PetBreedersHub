const CACHE_NAME = 'v1';
const manifest = self.__WB_MANIFEST;
if (manifest) {
  // do nothing
}


const urlsToCache = [
    '/static/media/logo.png',
];

// Installazione del Service Worker
self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return Promise.all(
                urlsToCache.map((url) => {
                    return cache.add(url).catch(err => {
                        console.error('Failed to cache:', url, err);
                    });
                })
            );
        })
    );
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// self.addEventListener("fetch", (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             // Se la risposta è presente nella cache, restituiscila
//             if (response) {
//                 return response;
//             }

//             // Altrimenti, effettua la fetch e gestisci la risposta
//             return fetch(event.request).then((fetchResponse) => {
//                 // Controlla se la risposta è un reindirizzamento
//                 if (fetchResponse.redirected) {
//                     // Se la risposta è un reindirizzamento, puoi decidere di seguire il reindirizzamento o meno
//                     return fetch(fetchResponse.url).then((finalResponse) => {
//                         return caches.open(CACHE_NAME).then((cache) => {
//                             cache.put(event.request, finalResponse.clone());
//                             return finalResponse;
//                         });
//                     });
//                 }

//                 // Se non è un reindirizzamento, memorizza la risposta nella cache
//                 return caches.open(CACHE_NAME).then((cache) => {
//                     cache.put(event.request, fetchResponse.clone());
//                     return fetchResponse;
//                 });
//             });
//         })
//     );
// });


// Gestione delle notifiche push
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    console.log('Push Received...', data);

    const options = {
        body: data.body || 'Default body message', // Messaggio di default
        icon: '/static/icons/icon-192x192.png',
        badge: '/static/icons/icon-192x192.png',
        // Puoi aggiungere ulteriori opzioni come 'data' se vuoi
    };

    const title = data.title || 'Default Title';
    
    // Personalizza il messaggio con i dati del profilo utente
    if (data.first_name && data.last_name) {
        options.body = `${data.first_name} ${data.last_name}: ${options.body}`;
    }

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});


self.addEventListener('notificationclick', function(event) {
    console.log('Notification clicked:', event);
    event.notification.close(); // Close the notification
    const isLocal = self.location.hostname === '127.0.0.1' || self.location.hostname === 'localhost';
    const baseUrl = isLocal ? 'https://127.0.0.1:8000' : 'https://asfaltizaccardi.horaceweb.it/';
    
    const urlToOpen = `${baseUrl}/home/`; 

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            const client = windowClients.find(c => c.url === urlToOpen && 'focus' in c);
            if (client) {
                console.log('Focusing existing window:', client.url);
                return client.focus();
            }
            console.log('Opening new window:', urlToOpen);
            return self.clients.openWindow(urlToOpen); // Usa self.clients
        })
    );
});