const cacheName = 'piac-pwa-v1';

const filesToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/inators.html',
    '/css/style.css',
    '/js/main.js',
    '/manifest.json',
    '/images/favicon.ico',
    '/images/wielkoinator.jpg',
    '/images/weather-inator.png',
    '/images/teleport-inator.jpg',
    '/images/self-destruction-inator.png',
    '/images/mind-control-inator.png',
    '/images/invisi-nator.jpg',
    '/images/dundersztyc-2.jpeg',
    '/images/dunder.jpg',
    '/images/doofenshmirtz_evil_trap.png',
    '/images/doofenshmirtz_evil_lab.png',
    '/images/doofenshmirtz_evil_inc.png',
    '/images/doofenshmirtz_evil_balcony.png',
    '/images/destruction-inator.png',
    '/images/apple-splash-640-1136.jpg',
    '/images/apple-splash-750-1334.jpg',
    '/images/apple-splash-828-1792.jpg',
    '/images/apple-splash-1125-2436.jpg',
    '/images/apple-splash-1242-2688.jpg',
    '/images/apple-splash-1536-2048.jpg',
    '/images/apple-splash-1668-2224.jpg',
    '/images/apple-splash-1668-2388.jpg',
    '/images/apple-splash-2048-2732.jpg',
    '/images/apple-icon-180.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                if (event.request.method === 'GET') {
                    return caches.open(cacheName).then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                }
                return fetchResponse;
            });
        }).catch(() => {
            if (event.request.mode === 'navigate') {
                return caches.match('/index.html');
            }
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhiteList = [cacheName];

    event.waitUnitl(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if(!cacheWhiteList.includes(cache)) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
