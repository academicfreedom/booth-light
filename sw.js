/* Booth Light service worker, BUILD 88: keeps a copy of the app on the phone so it opens with no connection. It stores only the app's own files. It never sees or sends recordings. */
const C='booth-light-88';const F=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;}).catch(()=>r.mode==='navigate'?caches.match('./index.html'):undefined)));});
