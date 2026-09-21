const CACHE_NAME = "tractum-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./styles.css",
    "./script.js",
    "./icon.svg",
    "./PixelDice_White 1.png",
    "./PixelDice_White 2.png",
    "./PixelDice_White 3.png",
    "./PixelDice_White 4.png",
    "./PixelDice_White 5.png",
    "./PixelDice_White 6.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});