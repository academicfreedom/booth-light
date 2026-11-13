/* Booth Light service worker, BUILD 119: keeps a copy of the app on the phone so it opens with no connection. It stores only the app's own files. It does not keep the withdrawn list or the Earlier seasons shelf: those always come from the network. It never sees or sends recordings. */
const C='booth-light-119';const F=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;const u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin||u.pathname.indexOf('/shelf/')!==-1||u.pathname.endsWith('/revoked.json'))return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;}).catch(()=>r.mode==='navigate'?caches.match('./index.html'):undefined)));});
