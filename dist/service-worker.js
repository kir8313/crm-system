if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,n)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let u={};const c=s=>l(s,i),o={module:{uri:i},exports:u,require:c};e[i]=Promise.all(r.map((s=>o[s]||c(s)))).then((s=>(n(...s),u)))}}define(["./workbox-2d118ab0"],(function(s){"use strict";s.setCacheNameDetails({prefix:"crm-system"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/704.3571e30b.css",revision:null},{url:"/css/app.756b7197.css",revision:null},{url:"/css/chunk-vendors.110ee9f6.css",revision:null},{url:"/index.html",revision:"c333bf66ce4342ffdd1e222576cce8ca"},{url:"/js/121.cc7e232a.js",revision:null},{url:"/js/147.f4176040.js",revision:null},{url:"/js/175.2cc31997.js",revision:null},{url:"/js/311.67691407.js",revision:null},{url:"/js/388.5fb2d4ab.js",revision:null},{url:"/js/400.21792694.js",revision:null},{url:"/js/422.1721d70a.js",revision:null},{url:"/js/665.00535f45.js",revision:null},{url:"/js/704.efdcc404.js",revision:null},{url:"/js/997.605fd7cf.js",revision:null},{url:"/js/app.3e23d98e.js",revision:null},{url:"/js/chunk-vendors.387cd225.js",revision:null},{url:"/manifest.json",revision:"bbffb38cb0cf9c117c93257fffc9ff4d"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
