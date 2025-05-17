 /*****************************************************************
 *
 * reveal.js-verticator for Reveal.js 
 * Version 1.3.0
 * 
 * @link
 * https://github.com/martinomagnifico/reveal.js-verticator
 * 
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/martinomagnifico
 *
 * @license 
 * MIT
 * 
 * Copyright (C) 2025 Martijn De Jongh (Martino)
 *
 ******************************************************************/


var J = Object.defineProperty;
var Q = (r, t, e) => t in r ? J(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var L = (r, t, e) => Q(r, typeof t != "symbol" ? t + "" : t, e);
const X = {
  themetag: "h1",
  color: "",
  inversecolor: "",
  skipuncounted: !1,
  clickable: !0,
  position: "auto",
  offset: "3vmin",
  autogenerate: !0,
  tooltip: !1,
  scale: 1,
  cssautoload: !0,
  csspath: "",
  plaintextonly: !1
};
function ee(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var P, j;
function te() {
  if (j) return P;
  j = 1;
  var r = function(u) {
    return t(u) && !e(u);
  };
  function t(l) {
    return !!l && typeof l == "object";
  }
  function e(l) {
    var u = Object.prototype.toString.call(l);
    return u === "[object RegExp]" || u === "[object Date]" || n(l);
  }
  var s = typeof Symbol == "function" && Symbol.for, i = s ? Symbol.for("react.element") : 60103;
  function n(l) {
    return l.$$typeof === i;
  }
  function o(l) {
    return Array.isArray(l) ? [] : {};
  }
  function a(l, u) {
    return u.clone !== !1 && u.isMergeableObject(l) ? m(o(l), l, u) : l;
  }
  function c(l, u, d) {
    return l.concat(u).map(function(b) {
      return a(b, d);
    });
  }
  function g(l, u) {
    if (!u.customMerge)
      return m;
    var d = u.customMerge(l);
    return typeof d == "function" ? d : m;
  }
  function v(l) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(l).filter(function(u) {
      return Object.propertyIsEnumerable.call(l, u);
    }) : [];
  }
  function S(l) {
    return Object.keys(l).concat(v(l));
  }
  function y(l, u) {
    try {
      return u in l;
    } catch {
      return !1;
    }
  }
  function C(l, u) {
    return y(l, u) && !(Object.hasOwnProperty.call(l, u) && Object.propertyIsEnumerable.call(l, u));
  }
  function E(l, u, d) {
    var b = {};
    return d.isMergeableObject(l) && S(l).forEach(function(f) {
      b[f] = a(l[f], d);
    }), S(u).forEach(function(f) {
      C(l, f) || (y(l, f) && d.isMergeableObject(u[f]) ? b[f] = g(f, d)(l[f], u[f], d) : b[f] = a(u[f], d));
    }), b;
  }
  function m(l, u, d) {
    d = d || {}, d.arrayMerge = d.arrayMerge || c, d.isMergeableObject = d.isMergeableObject || r, d.cloneUnlessOtherwiseSpecified = a;
    var b = Array.isArray(u), f = Array.isArray(l), Z = b === f;
    return Z ? b ? d.arrayMerge(l, u, d) : E(l, u, d) : a(u, d);
  }
  m.all = function(u, d) {
    if (!Array.isArray(u))
      throw new Error("first argument should be an array");
    return u.reduce(function(b, f) {
      return m(b, f, d);
    }, {});
  };
  var $ = m;
  return P = $, P;
}
var re = te();
const ie = /* @__PURE__ */ ee(re);
var se = Object.defineProperty, oe = (r, t, e) => t in r ? se(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e, p = (r, t, e) => oe(r, typeof t != "symbol" ? t + "" : t, e);
const ne = () => {
  const r = typeof window < "u", t = typeof document < "u", e = r && typeof location < "u" && /localhost|127\.0\.0\.1/.test(location.hostname);
  let s = !1;
  try {
    s = new Function('return typeof module !== "undefined" && !!module.hot')();
  } catch {
  }
  let i = !1;
  try {
    i = new Function('return typeof import.meta !== "undefined" && typeof import.meta.env !== "undefined" && import.meta.env.DEV === true')();
  } catch {
  }
  const n = r && typeof navigator < "u" && /vite|localhost|127\.0\.0\.1/.test(location.origin) && /AppleWebKit|Chrome|Vite/.test(navigator.userAgent), o = t && !!document.querySelector('script[type="module"]');
  let a = !1;
  try {
    a = new Function('return typeof process !== "undefined" && process.env && (process.env.ROLLUP_WATCH === "true" || process.env.NODE_ENV === "development")')();
  } catch {
  }
  let c = !1;
  try {
    c = new Function('return typeof define === "function" && !!define.amd')();
  } catch {
  }
  return {
    isDevServer: e,
    isWebpackHMR: s,
    isVite: i,
    isVitePreview: n,
    hasModuleScripts: o,
    isModuleBundler: a,
    isAMD: c,
    isBundlerEnvironment: s || i || n || o || a || c || e
  };
};
class le {
  // Create a new plugin instance
  constructor(t, e, s) {
    p(this, "defaultConfig"), p(this, "pluginInit"), p(this, "pluginId"), p(this, "mergedConfig", null), p(this, "userConfigData", null), p(this, "data", {}), p(this, "getEnvironmentInfo", () => ne()), typeof t == "string" ? (this.pluginId = t, this.pluginInit = e, this.defaultConfig = s || {}) : (this.pluginId = t.id, this.pluginInit = t.init, this.defaultConfig = t.defaultConfig || {});
  }
  // Initialize plugin configuration by merging default and user settings
  initializeConfig(t) {
    const e = this.defaultConfig, s = t.getConfig()[this.pluginId] || {};
    this.userConfigData = s, this.mergedConfig = ie(e, s, {
      arrayMerge: (i, n) => n,
      clone: !0
    });
  }
  // Get the current plugin configuration
  getCurrentConfig() {
    if (!this.mergedConfig)
      throw new Error("Plugin configuration has not been initialized");
    return this.mergedConfig;
  }
  // Get plugin data if any exists
  getData() {
    return Object.keys(this.data).length > 0 ? this.data : void 0;
  }
  get userConfig() {
    return this.userConfigData || {};
  }
  // Initialize the plugin
  init(t) {
    if (this.initializeConfig(t), this.pluginInit)
      return this.pluginInit(this, t, this.getCurrentConfig());
  }
  // Create the plugin interface containing all exports
  createInterface(t = {}) {
    return {
      id: this.pluginId,
      init: (e) => this.init(e),
      getConfig: () => this.getCurrentConfig(),
      getData: () => this.getData(),
      ...t
    };
  }
}
const ae = (r) => {
  const t = document.querySelector(
    `script[src$="${r}.js"], script[src$="${r}.min.js"], script[src$="${r}.mjs"]`
  );
  if (t != null && t.src) {
    const e = t.getAttribute("src") || "", s = e.lastIndexOf("/");
    if (s !== -1)
      return e.substring(0, s + 1);
  }
  try {
    if (typeof import.meta < "u" && import.meta.url)
      return import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);
  } catch {
  }
  return `plugin/${r}/`;
}, H = "data-css-id", ce = (r, t) => new Promise((e, s) => {
  const i = document.createElement("link");
  i.rel = "stylesheet", i.href = t, i.setAttribute(H, r);
  const n = setTimeout(() => {
    i.parentNode && i.parentNode.removeChild(i), s(new Error(`[${r}] Timeout loading CSS from: ${t}`));
  }, 5e3);
  i.onload = () => {
    clearTimeout(n), e();
  }, i.onerror = () => {
    clearTimeout(n), i.parentNode && i.parentNode.removeChild(i), s(new Error(`[${r}] Failed to load CSS from: ${t}`));
  }, document.head.appendChild(i);
}), U = (r) => document.querySelectorAll(`[${H}="${r}"]`).length > 0, ue = (r) => new Promise((t) => {
  if (e())
    return t(!0);
  setTimeout(() => {
    t(e());
  }, 50);
  function e() {
    if (U(r)) return !0;
    try {
      return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${r}`).trim() !== "";
    } catch {
      return !1;
    }
  }
}), x = async (r) => {
  const {
    id: t,
    cssautoload: e = !0,
    csspath: s = "",
    debug: i = !1
  } = r;
  if (e === !1 || s === !1) return;
  if (U(t)) {
    i && console.log(`[${t}] CSS already loaded, skipping`);
    return;
  }
  const n = [];
  typeof s == "string" && s.trim() !== "" && n.push(s);
  const o = ae(t);
  if (o) {
    const c = `${o}${t}.css`;
    n.push(c);
  }
  const a = `plugin/${t}/${t}.css`;
  n.push(a);
  for (const c of n)
    try {
      await ce(t, c);
      let g = "CSS";
      s && c === s ? g = "user-specified CSS" : o && c === `${o}${t}.css` ? g = "CSS (auto-detected from script location)" : g = "CSS (standard fallback)", i && console.log(`[${t}] ${g} loaded successfully from: ${c}`);
      return;
    } catch {
      i && console.log(`[${t}] Failed to load CSS from: ${c}`);
    }
  console.warn(`[${t}] Could not load CSS from any location`);
};
async function de(r, t) {
  if ("getEnvironmentInfo" in r && t) {
    const e = r, s = e.getEnvironmentInfo();
    if (await ue(e.pluginId)) {
      t.debug && console.log(`[${e.pluginId}] CSS already imported, skipping`);
      return;
    }
    if ("cssautoload" in e.userConfig ? t.cssautoload : !s.isBundlerEnvironment)
      return x({
        id: e.pluginId,
        cssautoload: !0,
        csspath: t.csspath,
        debug: t.debug
      });
    s.isBundlerEnvironment && console.warn(`[${e.pluginId}] CSS autoloading is disabled in bundler environments. Please import the CSS manually, using import.`);
    return;
  }
  return x(r);
}
class he {
  constructor() {
    p(this, "debugMode", !1), p(this, "label", "DEBUG"), p(this, "groupDepth", 0), p(this, "group", (...t) => {
      this.debugLog("group", ...t), this.groupDepth++;
    }), p(this, "groupCollapsed", (...t) => {
      this.debugLog("groupCollapsed", ...t), this.groupDepth++;
    }), p(this, "groupEnd", () => {
      this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"));
    }), p(this, "error", (...t) => {
      const e = this.debugMode;
      this.debugMode = !0, this.formatAndLog(console.error, t), this.debugMode = e;
    }), p(this, "table", (t, e, s) => {
      if (this.debugMode)
        try {
          typeof t == "string" && e !== void 0 && typeof e != "string" ? (this.groupDepth === 0 ? console.log(`[${this.label}]: ${t}`) : console.log(t), s ? console.table(e, s) : console.table(e)) : (this.groupDepth === 0 && console.log(`[${this.label}]: Table data`), typeof e == "object" && Array.isArray(e) ? console.table(t, e) : console.table(t));
        } catch (i) {
          console.error(`[${this.label}]: Error showing table:`, i), console.log(`[${this.label}]: Raw data:`, t);
        }
    }), p(this, "formatAndLog", (t, e) => {
      if (this.debugMode)
        try {
          this.groupDepth > 0 ? t.call(console, ...e) : e.length > 0 && typeof e[0] == "string" ? t.call(console, `[${this.label}]: ${e[0]}`, ...e.slice(1)) : t.call(console, `[${this.label}]:`, ...e);
        } catch (s) {
          console.error(`[${this.label}]: Error in logging:`, s), console.log(`[${this.label}]: Original log data:`, ...e);
        }
    });
  }
  // Initializes the debug utility with custom settings.
  initialize(t, e = "DEBUG") {
    this.debugMode = t, this.label = e;
  }
  // Core method that handles calling console methods with proper formatting.
  // - Adds label prefix to messages outside of groups
  // - Skips label prefix for messages inside groups to avoid redundancy
  // - Always adds label prefix to group headers
  // - Error messages are always shown regardless of debug mode
  // @param methodName - Name of the console method to call
  // @param args - Arguments to pass to the console method
  debugLog(t, ...e) {
    const s = console[t];
    if (!this.debugMode && t !== "error" || typeof s != "function") return;
    const i = s;
    if (t === "group" || t === "groupCollapsed") {
      e.length > 0 && typeof e[0] == "string" ? i.call(console, `[${this.label}]: ${e[0]}`, ...e.slice(1)) : i.call(console, `[${this.label}]:`, ...e);
      return;
    }
    if (t === "groupEnd") {
      i.call(console);
      return;
    }
    if (t === "table") {
      e.length === 1 ? this.table(e[0]) : e.length === 2 ? typeof e[0] == "string" ? this.table(e[0], e[1]) : this.table(e[0], e[1]) : e.length >= 3 && this.table(
        e[0],
        e[1],
        e[2]
      );
      return;
    }
    this.groupDepth > 0 ? i.call(console, ...e) : e.length > 0 && typeof e[0] == "string" ? i.call(console, `[${this.label}]: ${e[0]}`, ...e.slice(1)) : i.call(console, `[${this.label}]:`, ...e);
  }
}
const ge = (r) => new Proxy(r, {
  get: (t, e) => {
    if (e in t)
      return t[e];
    const s = e.toString();
    if (typeof console[s] == "function")
      return (...i) => {
        t.debugLog(s, ...i);
      };
  }
}), k = ge(new he()), q = (r) => {
  let [t, e] = [0, 0];
  r.on("slidechanged", (s) => {
    const { indexh: i, indexv: n, previousSlide: o, currentSlide: a } = s;
    i !== t && r.dispatchEvent({
      type: "slidechanged-h",
      data: { previousSlide: o, currentSlide: a, indexh: i, indexv: n }
    }), n !== e && i === t && r.dispatchEvent({
      type: "slidechanged-v",
      data: { previousSlide: o, currentSlide: a, indexh: i, indexv: n }
    }), [t, e] = [i, n];
  });
}, fe = q, pe = (r) => {
  const t = r.getViewportElement();
  if (!t)
    return console.warn("[verticator]: Could not find viewport element"), () => {
    };
  const e = () => t.classList.contains("reveal-scroll");
  let s = e(), i = !0;
  const n = new MutationObserver(() => {
    if (!i) return;
    const o = e();
    if (o !== s) {
      const a = r.getCurrentSlide(), c = r.getIndices(), g = c.h, v = c.v, S = o ? "scrollmode-enter" : "scrollmode-exit";
      r.dispatchEvent({
        type: S,
        data: {
          currentSlide: a,
          previousSlide: null,
          indexh: g,
          indexv: v
          // We can add stuff here if needed. Plugin-authors, just ask!
        }
      }), s = o;
    }
  });
  return n.observe(t, { attributes: !0, attributeFilter: ["class"] }), () => {
    i = !1, n.disconnect();
  };
}, D = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addDirectionEvents: q,
  addMoreDirectionEvents: fe,
  addScrollModeEvents: pe
}, Symbol.toStringTag, { value: "Module" }));
var G = /* @__PURE__ */ ((r) => (r.HORIZONTAL = "horizontal", r.STACK = "stack", r.VERTICAL = "vertical", r.INVALID = "invalid", r))(G || {});
const M = (r) => r instanceof HTMLElement && r.tagName === "SECTION", w = (r) => M(r) ? Array.from(r.children).some(
  (t) => t instanceof HTMLElement && t.tagName === "SECTION"
) : !1, I = (r) => M(r) ? r.parentElement instanceof HTMLElement && r.parentElement.tagName === "SECTION" : !1, me = (r) => M(r) && !I(r) && !w(r), ve = (r) => {
  if (!M(r)) return null;
  if (I(r)) {
    const t = r.parentElement;
    if (t instanceof HTMLElement && w(t))
      return t;
  }
  return null;
}, be = (r) => M(r) ? I(r) ? "vertical" : w(r) ? "stack" : "horizontal" : "invalid", K = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SectionType: G,
  getSectionType: be,
  getStack: ve,
  isHorizontal: me,
  isSection: M,
  isStack: w,
  isVertical: I
}, Symbol.toStringTag, { value: "Module" })), h = {
  lightClass: "has-light-background",
  darkClass: "has-dark-background",
  themeColorVar: "--c-theme-color",
  vertiColorVar: "--v-color",
  forceColorVar: "--v-forcecolor",
  activeclass: "active"
}, ye = (r, t) => {
  const e = {
    theme: "",
    regular: "",
    inverse: ""
  }, s = document.createElement("section"), i = document.createElement(t);
  return r.getElementsByClassName("slides")[0].appendChild(s).appendChild(i), e.regular = getComputedStyle(i).getPropertyValue("color"), s.classList.add(h.lightClass), e.inverse = getComputedStyle(i).getPropertyValue("color"), e.regular === e.inverse ? (e.theme = "light", s.classList.remove(h.lightClass), s.classList.add(h.darkClass), e.inverse = getComputedStyle(i).getPropertyValue("color")) : e.theme = "dark", s.remove(), e;
}, N = (r, t, e) => {
  const s = {
    theme: "",
    themeregular: "",
    themeinverse: "",
    verticatorregular: "",
    verticatorinverse: ""
  }, i = ye(
    t,
    e.themetag ? e.themetag : "section"
  );
  return s.theme = i.theme, s.themeregular = i.regular, s.themeinverse = i.inverse, s.verticatorregular = e.color ? e.color : i.regular, s.verticatorinverse = e.inversecolor ? e.inversecolor : e.oppositecolor ? e.oppositecolor : i.inverse, k.log(`Theme regular color is: "${s.themeregular}"`), k.log(`Theme inverse color is: "${s.themeinverse}"`), e.color && k.log(`Verticator regular color is: "${s.verticatorregular}"`), (e.inversecolor || e.oppositecolor) && k.log(`Verticator inverse color is: "${s.verticatorinverse}"`), e.color && r.style.setProperty(h.vertiColorVar, s.verticatorregular), s;
}, W = (r) => r.getConfig().hashOneBasedIndex ? 1 : 0, A = (r, t, e) => {
  const s = W(e), i = Array.from(t.querySelectorAll("li"));
  let n = s - 1;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    Number.parseInt(a.dataset.index || "0", 10) <= (r.indexv || 0) + s && (n = o), a.classList.remove(h.activeclass);
  }
  n >= 0 && n < i.length && i[n].classList.add(h.activeclass);
}, V = (r, t, e, s, i) => {
  const n = e.getRevealElement(), o = r.currentSlide.parentNode;
  o.classList.contains("stack") && (o.classList.contains(h.lightClass) ? n.classList.add("lightstack") : n.classList.remove("lightstack"), o.classList.contains(h.darkClass) ? n.classList.add("darkstack") : n.classList.remove("darkstack"));
  const a = r.currentSlide.dataset.verticator, c = o.dataset.verticator;
  if (a || c)
    if (a === "regular" || c === "regular")
      t.style.setProperty(h.forceColorVar, s.verticatorregular), i.debug && console.log(`Verticator forced to: "${s.verticatorregular}"`);
    else if (a === "inverse" || c === "inverse")
      t.style.setProperty(h.forceColorVar, s.verticatorinverse), i.debug && console.log(`Verticator forced to: "${s.verticatorinverse}"`);
    else {
      const g = a ?? c ?? "";
      t.style.setProperty(h.forceColorVar, g), i.debug && console.log(`Verticator forced to: "${g}"`);
    }
  else
    t.style.removeProperty(h.forceColorVar);
}, O = (r, t, e, s, i) => {
  r ? (s.style.setProperty(h.themeColorVar, e.themeinverse), t.inversecolor || t.oppositecolor ? i.style.setProperty(h.vertiColorVar, e.verticatorinverse) : i.style.removeProperty(h.vertiColorVar)) : (s.style.setProperty(h.themeColorVar, e.themeregular), t.color ? i.style.setProperty(h.vertiColorVar, e.verticatorregular) : i.style.removeProperty(h.vertiColorVar));
}, Se = (r, t, e, s) => {
  const i = t.getRevealElement(), n = t.getViewportElement(), o = {
    dark: i.classList.contains(h.darkClass),
    light: i.classList.contains(h.lightClass),
    darkParent: i.classList.contains("darkstack"),
    lightParent: i.classList.contains("lightstack")
  }, a = new MutationObserver((g) => {
    for (const v of g) {
      const { target: S } = v;
      if (v.attributeName === "class") {
        const y = (l) => S.classList.contains(l), C = y(h.lightClass), E = y(h.darkClass), m = y("lightstack"), $ = y("darkstack");
        C || E ? (o.dark !== E || o.light !== C) && (e.theme === "dark" && o.light !== C && (o.light = C, O(C, s, e, i, r)), e.theme === "light" && o.dark !== E && (o.dark = E, O(E, s, e, i, r))) : m || $ ? (o.darkParent !== $ || o.lightParent !== m) && (e.theme === "dark" && o.lightParent !== m && (o.lightParent = m, O(
          m,
          s,
          e,
          i,
          r
        )), e.theme === "light" && o.darkParent !== $ && (o.darkParent = $, O($, s, e, i, r))) : (o.dark = !1, o.light = !1, O(!1, s, e, i, r));
      }
    }
  });
  (() => {
    n.classList.contains("reveal-scroll") ? a.observe(n, {
      attributes: !0,
      attributeFilter: ["class"]
    }) : a.observe(i, {
      attributes: !0,
      attributeFilter: ["class"]
    });
  })();
}, Ce = (r, t) => {
  const e = r.getRevealElement();
  let s = e.querySelector("ul.verticator");
  return !s && t.autogenerate && (s = document.createElement("ul"), s.classList.add("verticator"), t.clickable || s.classList.add("no-click"), e.insertBefore(s, e.childNodes[0])), s;
}, _ = (r, t, e) => {
  let s = e.position;
  s === "auto" && (s = r.getConfig().rtl ? "left" : "right"), s === "left" ? (t.classList.add("left"), t.style.left = e.offset) : t.style.right = e.offset;
  let i = e.scale;
  i = i > 2 ? 2 : i < 0.5 ? 0.5 : i;
  let n = r.getScale(), o = n > 1 ? n * i : i;
  z(t, o), r.on("resize", (a) => {
    const c = a;
    a && typeof c.scale == "number" && (n = c.scale, o = n > 1 ? n * i : i, z(t, o));
  });
}, z = (r, t) => {
  r.style.setProperty("--verticator-scale", t.toFixed(2));
  const e = 1 / Math.sqrt(t);
  r.style.setProperty("--verticator-tooltip-scale", e.toFixed(2));
}, Ee = (r, t, e, s, i) => {
  k.log(i, `Creating ${e.length} bullets`);
  const n = W(s);
  t.classList.remove("visible");
  let o = "";
  for (const a of e) {
    const c = a[0], g = a[1], v = `href="#/${r.indexh + n}/${c + n}"`, S = g ? `data-name="${g}"` : "", y = g ? `<div class="tooltip"><span>${g}</span></div>` : "";
    o += `<li data-index="${c + n}"><a ${i.clickable ? v : ""}${S}></a>${y}</li>`;
  }
  t.innerHTML = `<div class="verticator-holder">${o}</div>`, A(r, t, s), setTimeout(() => {
    t.classList.add("visible");
  }, 300);
}, $e = K.getStack, B = (r) => {
  const t = ["data-verticator-tooltip", "data-name", "title"];
  for (const s of t) {
    const i = r.getAttribute(s);
    if (i)
      return i;
  }
  const e = ["h1", "h2", "h3", "h4"];
  for (const s of e) {
    const i = r.querySelector(s);
    if (i != null && i.textContent)
      return i.textContent;
  }
  return null;
}, ke = (r, t) => r.dataset.verticatorTooltip === "none" || r.dataset.verticatorTooltip === "false" || r.classList.contains("no-verticator-tooltip") ? null : t.tooltip === !0 ? B(r) : typeof t.tooltip == "string" ? t.tooltip === "auto" || t.tooltip === "true" ? B(r) : r.getAttribute(t.tooltip) || null : null, Le = (r, t) => {
  const e = $e(r);
  return e ? Array.from(e.children).map((a, c) => [c, a]).filter((a) => {
    const c = a[1];
    return !(t.skipuncounted === !0 && c.getAttribute("data-visibility") === "uncounted");
  }).map((a) => {
    const [c, g] = a;
    let v = null;
    return t.tooltip && (v = ke(g, t)), [c, v];
  }) : [];
}, F = K.getStack, R = (r, t, e, s) => {
  if (r.type === "resize") {
    r.currentSlide = t.getCurrentSlide();
    const c = t.getIndices();
    r.indexv = c.v;
  }
  const i = r.currentSlide, n = Le(i, s);
  if (n.length < 2) {
    e.classList.remove("visible"), e.innerHTML = "";
    return;
  }
  const o = F(i), a = r.previousSlide ? F(r.previousSlide) : null;
  !r.previousSlide || o !== a ? Ee(r, e, n, t, s) : A(r, e, t);
};
class T {
  constructor(t, e) {
    L(this, "deck");
    L(this, "config");
    L(this, "colors");
    L(this, "theVerticator", null);
    L(this, "currentSlide", null);
    this.deck = t, this.config = e, this.colors = {
      theme: "",
      themeregular: "",
      themeinverse: "",
      verticatorregular: "",
      verticatorinverse: ""
    };
  }
  static async create(t, e) {
    await new T(t, e).initialize();
  }
  async initialize() {
    this.setupVerticator(), this.theVerticator && (this.colors = N(
      this.theVerticator,
      this.deck.getRevealElement(),
      this.config
    ), _(this.deck, this.theVerticator, this.config), Se(this.theVerticator, this.deck, this.colors, this.config), D.addMoreDirectionEvents(this.deck), D.addScrollModeEvents(this.deck), this.addEventListeners());
  }
  setupVerticator() {
    this.theVerticator = Ce(this.deck, this.config);
    const t = this.deck.getRevealElement();
    this.theVerticator && (N(this.theVerticator, t, this.config), _(this.deck, this.theVerticator, this.config));
  }
  addEventListeners() {
    this.deck.on("slidechanged-h", (t) => {
      if (!this.theVerticator) return;
      const e = t;
      e.currentSlide !== this.currentSlide && (R(e, this.deck, this.theVerticator, this.config), V(e, this.theVerticator, this.deck, this.colors, this.config), this.currentSlide = e.currentSlide);
    }), this.deck.on("slidechanged-v", (t) => {
      if (!this.theVerticator) return;
      const e = t;
      e.currentSlide !== this.currentSlide && (A(e, this.theVerticator, this.deck), V(e, this.theVerticator, this.deck, this.colors, this.config), this.currentSlide = e.currentSlide);
    }), this.deck.on("scrollmode-exit", (t) => {
      if (!this.theVerticator) return;
      const e = t;
      R(e, this.deck, this.theVerticator, this.config), V(e, this.theVerticator, this.deck, this.colors, this.config), this.currentSlide = e.currentSlide;
    });
  }
}
const Y = "verticator", Me = async (r, t, e) => {
  k && e.debug && k.initialize(!0, Y), await de(r, e), await T.create(t, e);
}, we = () => new le(Y, Me, X).createInterface();
export {
  we as default
};
