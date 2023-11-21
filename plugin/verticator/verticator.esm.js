/*****************************************************************
 *
 * Verticator for Reveal.js 
 * Version 1.2.4
 * 
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/martinomagnifico
 *
 * @license 
 * MIT licensed
 * 
 * Copyright (C) 2023 Martijn De Jongh (Martino)
 *
 ******************************************************************/
var e={lightClass:"has-light-background",darkClass:"has-dark-background",themeColorVar:"--c-theme-color",vertiColorVar:"--v-color",forceColorVar:"--v-forcecolor",activeclass:"active",eventNames:["ready","slidechanged"]};const t=e=>e&&"object"==typeof e&&!Array.isArray(e),r=(e,...o)=>{if(!o.length)return e;const a=o.shift();if(t(e)&&t(a))for(const o in a)t(a[o])?(e[o]||Object.assign(e,{[o]:{}}),r(e[o],a[o])):Object.assign(e,{[o]:a[o]});return r(e,...o)},o=(e,t,r)=>{let o,a=document.querySelector("head"),s=!1;if("script"===t?document.querySelector(`script[src="${e}"]`)?s=!0:(o=document.createElement("script"),o.type="text/javascript",o.src=e):"stylesheet"===t&&(document.querySelector(`link[href="${e}"]`)?s=!0:(o=document.createElement("link"),o.rel="stylesheet",o.href=e)),!s){const e=()=>{"function"==typeof r&&(r.call(),r=null)};o.onload=e,o.onreadystatechange=function(){"loaded"===this.readyState&&e()},a.appendChild(o)}},a=e=>{let t,r=document.querySelector(`script[src$="${e}"]`);return t=r?r.getAttribute("src").slice(0,-1*e.length):import.meta.url.slice(0,import.meta.url.lastIndexOf("/")+1),t},s=(t,r,o,a,s)=>{t?(a.style.setProperty(e.themeColorVar,o.themeinverse),r.inversecolor||r.oppositecolor?s.style.setProperty(e.vertiColorVar,o.verticatorinverse):s.style.removeProperty(e.vertiColorVar)):(a.style.setProperty(e.themeColorVar,o.themeregular),r.color?s.style.setProperty(e.vertiColorVar,o.verticatorregular):s.style.removeProperty(e.vertiColorVar))},i=(t,r,o,a)=>{const s=((t,r)=>{const o={},a=document.createElement("section"),s=document.createElement(r);return t.getElementsByClassName("slides")[0].appendChild(a).appendChild(s),o.regular=getComputedStyle(s).getPropertyValue("color"),a.classList.add(e.lightClass),o.inverse=getComputedStyle(s).getPropertyValue("color"),o.regular==o.inverse?(o.theme="light",a.classList.remove(e.lightClass),a.classList.add(e.darkClass),o.inverse=getComputedStyle(s).getPropertyValue("color")):o.theme="dark",a.remove(),o})(r,a.themetag?a.themetag:"section");o.theme=s.theme,o.themeregular=s.regular,o.themeinverse=s.inverse,o.verticatorregular=a.color?a.color:s.regular,o.verticatorinverse=a.inversecolor?a.inversecolor:a.oppositecolor?a.oppositecolor:s.inverse,a.debug&&(console.log(`Theme regular color is: "${o.themeregular}"`),console.log(`Theme inverse color is: "${o.themeinverse}"`),a.color&&console.log(`Verticator regular color is: "${o.verticatorregular}"`),(a.inversecolor||a.oppositecolor)&&console.log(`Verticator inverse color is: "${o.verticatorinverse}"`)),a.color&&t.style.setProperty(e.vertiColorVar,o.verticatorregular)},l=(t,r,o)=>{let a=Array.from(r.querySelectorAll("li"));var s=o.indexbase-1;a.forEach((function(r,a){parseInt(r.dataset.index)<=t.indexv+o.indexbase&&(s=a),r.classList.remove(e.activeclass)})),s>=0&&a[s].classList.add(e.activeclass)},c=(e,t,r,o)=>{((e,t)=>{e.debug&&console.log(t)})(o,`Creating ${r.length} bullets`),t.classList.remove("visible");let a="";r.forEach((function(t){let r=t[0],s=t[1],i=`href="#/${e.indexh+o.indexbase}/${r+o.indexbase}"`,l=s?`data-name="${s}"`:"",c=s?`<div class="tooltip"><span>${s}</span></div>`:"";a+=`<li data-index="${r+o.indexbase}"><a ${o.clickable?i:""}${l}></a>${c}</li>`})),t.innerHTML=`<div class="verticator-holder">${a}</div>`,l(e,t,o),setTimeout((function(){t.classList.add("visible")}),300)},n=(e,t)=>{let r=e.parentNode;return Array.from(r.children).map((function(e,t){return[t,e]})).filter((function(e){let r="SECTION"==e[1].tagName&&"SECTION"==e[1].parentNode.tagName,o=t.skipuncounted&&"uncounted"==e[1].getAttribute("data-visibility");return r&&!o})).map((function(e){let r="";return t.tooltip&&(r=(e=>{if((!e.dataset.verticatorTooltip||"none"!=e.dataset.verticatorTooltip&&"false"!=e.dataset.verticatorTooltip)&&!e.classList.contains("no-verticator-tooltip")){if("auto"!=t.tooltip&&e.getAttribute(`${t.tooltip}`))return e.getAttribute(`${t.tooltip}`);if("auto"!=t.tooltip)return!1;for(const t of["data-verticator-tooltip","data-name","title"])if(e.getAttribute(t))return e.getAttribute(t);for(const t of["h1","h2","h3","h4"])if(e.querySelector(t))return e.querySelector(t).textContent}})(e[1])),[e[0],r]}))},d=(e,t,r,o)=>{"resize"==e.type&&(e.currentSlide=t.getCurrentSlide(),e.indexv=t.getIndices().v);let a=e.currentSlide,s=a.parentNode,i=n(a,o);if(i&&i.length)if(i.length<2)r.classList.remove("visible"),r.innerHTML="";else{if(e.previousSlide){s!=e.previousSlide.parentNode&&c(e,r,i,o)}else c(e,r,i,o);l(e,r,o)}else r.classList.remove("visible"),r.innerHTML=""},u=()=>{let t={};const l={},c=function(t,r){let o,a,c=t.getRevealElement(),n=c.querySelector("ul.verticator");if(!n){if(!r.autogenerate)return;let e=document.createElement("ul");e.className+="verticator",c.insertBefore(e,c.childNodes[0]),n=c.querySelector("ul.verticator")}r.clickable||n.classList.add("no-click"),i(n,c,l,r),((e,t,r)=>{"auto"==r.position&&(r.position=e.getConfig().rtl?"left":"right"),"left"==r.position?(t.classList.add("left"),t.style.left=r.offset):t.style.right=r.offset;let o=r.scale;o=o>2?2:o<.5?.5:o;let a=e.getScale(),s=a>1?a*o:o;t.style.setProperty("--verticator-scale",s.toFixed(2));let i=1/Math.sqrt(s);t.style.setProperty("--verticator-tooltip-scale",i.toFixed(2)),e.on("resize",(e=>{a=e.scale,s=a>1?a*o:o,t.style.setProperty("--verticator-scale",s.toFixed(2))}))})(t,n,r),((t,r,o,a)=>{let i=r.getRevealElement(),l=r.getViewportElement(),c={};c.dark=i.classList.contains(e.darkClass),c.light=i.classList.contains(e.lightClass),c.darkParent=i.classList.contains("darkstack"),c.lightParent=i.classList.contains("lightstack");const n=new MutationObserver((r=>{r.forEach((r=>{if("class"===r.attributeName){const l=e=>r.target.classList.contains(e);let n=l(e.lightClass),d=l(e.darkClass),u=l("lightstack"),g=l("darkstack");n||d?c.dark===d&&c.light===n||("dark"==o.theme&&c.light!==n&&(c.light=n,s(n,a,o,i,t)),"light"==o.theme&&c.dark!==d&&(c.dark=d,s(d,a,o,i,t))):u||g?c.dark===g&&c.light===u||("dark"==o.theme&&c.light!==u&&(c.light=u,s(u,a,o,i,t)),"light"==o.theme&&c.dark!==g&&(c.dark=g,s(g,a,o,i,t))):(c.dark=!1,c.light=!1,s(!1,a,o,i,t))}}))}));l.classList.contains("reveal-scroll")?n.observe(l,{attributes:!0,attributeFilter:["class"]}):n.observe(i,{attributes:!0,attributeFilter:["class"]})})(n,t,l,r),t.on("slidechanged",(o=>((t,r,o,a,s)=>{let i=o.getRevealElement();t.currentSlide.parentNode.classList.contains("stack")&&(t.currentSlide.parentNode.classList.contains(e.lightClass)?i.classList.add("lightstack"):i.classList.remove("lightstack"),t.currentSlide.parentNode.classList.contains(e.darkClass)?i.classList.add("darkstack"):i.classList.remove("darkstack")),t.currentSlide.dataset.verticator||t.currentSlide.parentNode.dataset.verticator?"regular"==t.currentSlide.dataset.verticator||"regular"==t.currentSlide.parentNode.dataset.verticator?(r.style.setProperty(e.forceColorVar,a.verticatorregular),s.debug&&console.log(`Verticator forced to: "${a.verticatorregular}"`)):"inverse"==t.currentSlide.dataset.verticator||"inverse"==t.currentSlide.parentNode.dataset.verticator?(r.style.setProperty(e.forceColorVar,a.verticatorinverse),s.debug&&console.log(`Verticator forced to: "${a.verticatorinverse}"`)):(r.style.setProperty(e.forceColorVar,o.getCurrentSlide().dataset.verticator||o.getCurrentSlide().parentNode.dataset.verticator),s.debug&&console.log(`Verticator forced to: "${o.getCurrentSlide().dataset.verticator||o.getCurrentSlide().parentNode.dataset.verticator}"`)):r.style.removeProperty(e.forceColorVar)})(o,n,t,l,r))),e.eventNames.forEach((e=>t.on(e,(e=>{e.currentSlide!==o&&(d(e,t,n,r),o=e.currentSlide)})))),t.on("resize",(e=>{n.classList.add("resizing"),a&&clearTimeout(a),a=setTimeout((()=>{t.getCurrentSlide()!==o&&d(e,t,n,r),n.classList.remove("resizing"),a=null}),500)})),t.getConfig().embedded&&t.on("click",(e=>{((e,t)=>{if(e.target.matches(".verticator li a")){let o=t.getIndices().h,a=t.getIndices().v;e.preventDefault();let s=[...(r=e.target.parentNode).parentNode.children].indexOf(r);t.slide(o,s,a)}var r})(e,t)}))};return{id:"verticator",init:function(e){t=r({themetag:"h1",color:"",inversecolor:"",skipuncounted:!1,clickable:!0,position:"auto",offset:"3vmin",autogenerate:!0,tooltip:!1,scale:1,csspath:"",debug:!1},e.getConfig().verticator||{}),t.indexbase=e.getConfig().hashOneBasedIndex?1:0;let s=t.csspath.verticator?t.csspath.verticator:t.csspath?t.csspath:`${a()}verticator.css`||"plugin/verticator/verticator.css";t.debug&&(console.log(`Plugin path = ${a()}`),console.log(`Verticator CSS path = ${s}`));const i=document.querySelector("[name=generator]");i&&i.content.includes("quarto")||o(s,"stylesheet"),c(e,t)}}};export{u as default};
