// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// importScripts('/__/firebase/8.0.1/firebase-app.js');
// importScripts('/__/firebase/8.0.1/firebase-messaging.js');
// importScripts('/__/firebase/init.js');
//
// const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.*/

 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here. Other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js');

 const {
   core: coreConfig,
   auth: authConf,
   emulators,
 } = process.env.app.firebase;

 const appConfig = {
   apiKey: coreConfig.api_key,
   authDomain: authConf.domain,
   databaseURL: coreConfig.database_url,
   projectId: coreConfig.project_id,
   storageBucket: coreConfig.storage_bucket,
   messagingSenderId: coreConfig.messaging_sender_id,
   appId: coreConfig.id,
   measurementId: coreConfig.measurement_id
 };

 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp(appConfig);

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START on_background_message]
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { notification: { title, body, image } } = payload;

  // api docs https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
  self.registration.showNotification(title, { body, icon: image });
});
// [END on_background_message]


//browser push notification "onClick" event heandler
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();

/**
 * if exists open browser tab with matching url just set focus to it,
 * otherwise open new tab/window with sw root scope url
 */
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i];
      if (client.url == self.registration.scope && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));
});



/*
    Service Worker (PWA)

    Scope:
    - load initial data
    - setup network proxy for "offline" experience
*/

const cacheName = 'ak9App-v1';
const dataCacheName = 'ak9Data-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/wind.png',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  // e.waitUntil(caches.open(cacheName).then(function(cache) {
  //   console.log('[ServiceWorker] Caching app shell');
  //   return cache.addAll(filesToCache);
  // }));
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  // e.waitUntil(caches.keys().then(function(keyList) {
  //   return Promise.all(keyList.map(function(key) {
  //     if (key !== cacheName && key !== dataCacheName) {
  //       // only purge old app shell caches
  //       console.log('[ServiceWorker] Removing old cache', key);
  //       return caches.delete(key);
  //     }
  //   }));
  // }));
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  const dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
      App is asking for fresh weather data. Network => cache response offline strategy
    */
    e.respondWith(caches.open(dataCacheName).then(function(cache) {
      return fetch(e.request).then(function(response) {
        cache.put(e.request.url, response.clone());
        return response;
      });
    }));
  } else {
    /*
      App is asking for app shell files. Cache => fallback to network offline strategy
    */
    e.respondWith(caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    }));
  }
});


// app bootstrap code
// TODO add cache logic here
// if ('caches' in window) {
//   // load fastest data first => while latest data fetched
//   caches.match(url).then(function(response) {
//     if (response) {
//       response.json().then(function updateFromCache(json) {
//         const results = json.query.results;
//         results.key = key;
//         results.label = label;
//         results.created = json.query.created;
//         app.updateForecastCard(results);
//       });
//     }
//   });
// }
