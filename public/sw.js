const staticCacheName = 'ikemws';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll([
                // js
                'js/maps.js',
                'js/register_sw.js',
                'js/calculator.js',

                // css
                'css/calculator.css',
                'css/cssgrid_style.css',

                //public
                'index.html',
                '404.html',
                
                // project2 maps
                'project2/index.html',
                'project2/maps.css',
                'project2/maps.js',

                // images
                'images/offline_img.png',


            ]).catch(error => {
                console.log('Caches open failed: ' + error);
            });
        })
    );
});


// intercept all requests
// either return cached asset or fetch from network
self.addEventListener('fetch', event => {
    event.respondWith(
        // Add cache.put to cache images on each fetch
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                return caches.open(staticCacheName).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(error => {
            if (event.request.url.includes('.png')) {
                return caches.match('/images/offline_img.png');
            }
            return new Response('Not connected to the internet', {
                status: 404,
                statusText: "Not connected to the internet"
            });
        })
    );
});

// delete old/unused static caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('ikemws-') && cacheName !== staticCacheName;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});