var APP_PREFIX = 'ApplicationName_'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
  '/{repository}/',                     // If you have separate JS/CSS files,
  '/{repository}/index.html'            // add path to those files here
]

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.2/workbox-sw.js');
workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.NetworkFirst()
);