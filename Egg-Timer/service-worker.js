self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('egg-timer-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/static/icons/timer-idle.png',
          '/static/icons/timer-running.png',
          '/static/sounds/beep.mp3',
          '/static/sounds/alarmclock.mp3',
          '/static/manifest.json',
          // Add any other assets like CSS, JS, etc.
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  });
  