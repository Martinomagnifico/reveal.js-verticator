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


var Y = Object.defineProperty;
var J = (r, t, e) => t in r ? Y(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var k = (r, t, e) => J(r, typeof t != "symbol" ? t + "" : t, e);
function Q(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var I, T;
function X() {
  if (T) return I;
  T = 1;
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
  var i = typeof Symbol == "function" && Symbol.for, s = i ? Symbol.for("react.element") : 60103;
  function n(l) {
    return l.$$typeof === s;
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
    var b = Array.isArray(u), f = Array.isArray(l), K = b === f;
    return K ? b ? d.arrayMerge(l, u, d) : E(l, u, d) : a(u, d);
  }
  m.all = function(u, d) {
    if (!Array.isArray(u))
      throw new Error("first argument should be an array");
    return u.reduce(function(b, f) {
      return m(b, f, d);
    }, {});
  };
  var $ = m;
  return I = $, I;
}
var Z = X();
const ee = /* @__PURE__ */ Q(Z);
var te = Object.defineProperty, re = (r, t, e) => t in r ? te(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e, p = (r, t, e) => re(r, typeof t != "symbol" ? t + "" : t, e);
const se = () => {
  const r = typeof window < "u", t = typeof document < "u", e = r && typeof location < "u" && /localhost|127\.0\.0\.1/.test(location.hostname);
  let i = !1;
  try {
    i = new Function('return typeof module !== "undefined" && !!module.hot')();
  } catch {
  }
  let s = !1;
  try {
    s = new Function('return typeof import.meta !== "undefined" && typeof import.meta.env !== "undefined" && import.meta.env.DEV === true')();
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
    isWebpackHMR: i,
    isVite: s,
    isVitePreview: n,
    hasModuleScripts: o,
    isModuleBundler: a,
    isAMD: c,
    isBundlerEnvironment: i || s || n || o || a || c || e
  };
};
class ie {
  // Create a new plugin instance
  constructor(t, e, i) {
    p(this, "defaultConfig"), p(this, "pluginInit"), p(this, "pluginId"), p(this, "mergedConfig", null), p(this, "userConfigData", null), p(this, "data", {}), p(this, "getEnvironmentInfo", () => se()), typeof t == "string" ? (this.pluginId = t, this.pluginInit = e, this.defaultConfig = i || {}) : (this.pluginId = t.id, this.pluginInit = t.init, this.defaultConfig = t.defaultConfig || {});
  }
  // Initialize plugin configuration by merging default and user settings
  initializeConfig(t) {
    const e = this.defaultConfig, i = t.getConfig()[this.pluginId] || {};
    this.userConfigData = i, this.mergedConfig = ee(e, i, {
      arrayMerge: (s, n) => n,
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
const oe = (r) => {
  const t = document.querySelector(
    `script[src$="${r}.js"], script[src$="${r}.min.js"], script[src$="${r}.mjs"]`
  );
  if (t != null && t.src) {
    const e = t.getAttribute("src") || "", i = e.lastIndexOf("/");
    if (i !== -1)
      return e.substring(0, i + 1);
  }
  try {
    if (typeof import.meta < "u" && import.meta.url)
      return import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);
  } catch {
  }
  return `plugin/${r}/`;
}, H = "data-css-id", ne = (r, t) => new Promise((e, i) => {
  const s = document.createElement("link");
  s.rel = "stylesheet", s.href = t, s.setAttribute(H, r);
  const n = setTimeout(() => {
    s.parentNode && s.parentNode.removeChild(s), i(new Error(`[${r}] Timeout loading CSS from: ${t}`));
  }, 5e3);
  s.onload = () => {
    clearTimeout(n), e();
  }, s.onerror = () => {
    clearTimeout(n), s.parentNode && s.parentNode.removeChild(s), i(new Error(`[${r}] Failed to load CSS from: ${t}`));
  }, document.head.appendChild(s);
}), U = (r) => document.querySelectorAll(`[${H}="${r}"]`).length > 0, le = (r) => new Promise((t) => {
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
}), D = async (r) => {
  const {
    id: t,
    cssautoload: e = !0,
    csspath: i = "",
    debug: s = !1
  } = r;
  if (e === !1 || i === !1) return;
  if (U(t)) {
    s && console.log(`[${t}] CSS already loaded, skipping`);
    return;
  }
  const n = [];
  typeof i == "string" && i.trim() !== "" && n.push(i);
  const o = oe(t);
  if (o) {
    const c = `${o}${t}.css`;
    n.push(c);
  }
  const a = `plugin/${t}/${t}.css`;
  n.push(a);
  for (const c of n)
    try {
      await ne(t, c);
      let g = "CSS";
      i && c === i ? g = "user-specified CSS" : o && c === `${o}${t}.css` ? g = "CSS (auto-detected from script location)" : g = "CSS (standard fallback)", s && console.log(`[${t}] ${g} loaded successfully from: ${c}`);
      return;
    } catch {
      s && console.log(`[${t}] Failed to load CSS from: ${c}`);
    }
  console.warn(`[${t}] Could not load CSS from any location`);
};
async function ae(r, t) {
  if ("getEnvironmentInfo" in r && t) {
    const e = r, i = e.getEnvironmentInfo();
    if (await le(e.pluginId)) {
      t.debug && console.log(`[${e.pluginId}] CSS already imported, skipping`);
      return;
    }
    if ("cssautoload" in e.userConfig ? t.cssautoload : !i.isBundlerEnvironment)
      return D({
        id: e.pluginId,
        cssautoload: !0,
        csspath: t.csspath,
        debug: t.debug
      });
    i.isBundlerEnvironment && console.warn(`[${e.pluginId}] CSS autoloading is disabled in bundler environments. Please import the CSS manually, using import.`);
    return;
  }
  return D(r);
}
class ce {
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
    }), p(this, "table", (t, e, i) => {
      if (this.debugMode)
        try {
          typeof t == "string" && e !== void 0 && typeof e != "string" ? (this.groupDepth === 0 ? console.log(`[${this.label}]: ${t}`) : console.log(t), i ? console.table(e, i) : console.table(e)) : (this.groupDepth === 0 && console.log(`[${this.label}]: Table data`), typeof e == "object" && Array.isArray(e) ? console.table(t, e) : console.table(t));
        } catch (s) {
          console.error(`[${this.label}]: Error showing table:`, s), console.log(`[${this.label}]: Raw data:`, t);
        }
    }), p(this, "formatAndLog", (t, e) => {
      if (this.debugMode)
        try {
          this.groupDepth > 0 ? t.call(console, ...e) : e.length > 0 && typeof e[0] == "string" ? t.call(console, `[${this.label}]: ${e[0]}`, ...e.slice(1)) : t.call(console, `[${this.label}]:`, ...e);
        } catch (i) {
          console.error(`[${this.label}]: Error in logging:`, i), console.log(`[${this.label}]: Original log data:`, ...e);
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
    const i = console[t];
    if (!this.debugMode && t !== "error" || typeof i != "function") return;
    const s = i;
    if (t === "group" || t === "groupCollapsed") {
      e.length > 0 && typeof e[0] == "string" ? s.call(console, `[${this.label}]: ${e[0]}`, ...e.slice(1)) : s.call(console, `[${this.label}]:`, ...e);
      return;
    }
    if (t === "groupEnd") {
      s.call(console);
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
    this.groupDepth > 0 ? s.call(console, ...e) : e.length > 0 && typeof e[0] == "string" ? s.call(console, `[${this.label}]: ${e[0]}`, ...e.slice(1)) : s.call(console, `[${this.label}]:`, ...e);
  }
}
const ue = (r) => new Proxy(r, {
  get: (t, e) => {
    if (e in t)
      return t[e];
    const i = e.toString();
    if (typeof console[i] == "function")
      return (...s) => {
        t.debugLog(i, ...s);
      };
  }
}), x = ue(new ce()), q = (r) => {
  let [t, e] = [0, 0];
  r.on("slidechanged", (i) => {
    const { indexh: s, indexv: n, previousSlide: o, currentSlide: a } = i;
    s !== t && r.dispatchEvent({
      type: "slidechanged-h",
      data: { previousSlide: o, currentSlide: a, indexh: s, indexv: n }
    }), n !== e && s === t && r.dispatchEvent({
      type: "slidechanged-v",
      data: { previousSlide: o, currentSlide: a, indexh: s, indexv: n }
    }), [t, e] = [s, n];
  });
}, de = q, he = (r) => {
  const t = r.getViewportElement();
  if (!t)
    return console.warn("[verticator]: Could not find viewport element"), () => {
    };
  const e = () => t.classList.contains("reveal-scroll");
  let i = e(), s = !0;
  const n = new MutationObserver(() => {
    if (!s) return;
    const o = e();
    if (o !== i) {
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
      }), i = o;
    }
  });
  return n.observe(t, { attributes: !0, attributeFilter: ["class"] }), () => {
    s = !1, n.disconnect();
  };
}, L = (r) => r instanceof HTMLElement && r.tagName === "SECTION", P = (r) => L(r) ? Array.from(r.children).some(
  (t) => t instanceof HTMLElement && t.tagName === "SECTION"
) : !1, O = (r) => L(r) ? r.parentElement instanceof HTMLElement && r.parentElement.tagName === "SECTION" : !1, ge = (r) => L(r) && !O(r) && !P(r), fe = (r) => {
  if (!L(r)) return null;
  if (O(r)) {
    const t = r.parentElement;
    if (t instanceof HTMLElement && P(t))
      return t;
  }
  return null;
}, pe = (r) => L(r) ? O(r) ? "vertical" : P(r) ? "stack" : "horizontal" : "invalid", w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addDirectionEvents: q,
  addMoreDirectionEvents: de,
  addScrollModeEvents: he,
  getSectionType: pe,
  getStack: fe,
  isHorizontal: ge,
  isSection: L,
  isStack: P,
  isVertical: O
}, Symbol.toStringTag, { value: "Module" })), me = {
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
}, h = {
  lightClass: "has-light-background",
  darkClass: "has-dark-background",
  themeColorVar: "--c-theme-color",
  vertiColorVar: "--v-color",
  forceColorVar: "--v-forcecolor",
  activeclass: "active"
}, ve = (r, t) => {
  const e = {
    theme: "",
    regular: "",
    inverse: ""
  }, i = document.createElement("section"), s = document.createElement(t);
  return r.getElementsByClassName("slides")[0].appendChild(i).appendChild(s), e.regular = getComputedStyle(s).getPropertyValue("color"), i.classList.add(h.lightClass), e.inverse = getComputedStyle(s).getPropertyValue("color"), e.regular === e.inverse ? (e.theme = "light", i.classList.remove(h.lightClass), i.classList.add(h.darkClass), e.inverse = getComputedStyle(s).getPropertyValue("color")) : e.theme = "dark", i.remove(), e;
}, N = (r, t, e) => {
  const i = {
    theme: "",
    themeregular: "",
    themeinverse: "",
    verticatorregular: "",
    verticatorinverse: ""
  }, s = ve(
    t,
    e.themetag ? e.themetag : "section"
  );
  return i.theme = s.theme, i.themeregular = s.regular, i.themeinverse = s.inverse, i.verticatorregular = e.color ? e.color : s.regular, i.verticatorinverse = e.inversecolor ? e.inversecolor : e.oppositecolor ? e.oppositecolor : s.inverse, e.debug && (console.log(`Theme regular color is: "${i.themeregular}"`), console.log(`Theme inverse color is: "${i.themeinverse}"`), e.color && console.log(`Verticator regular color is: "${i.verticatorregular}"`), (e.inversecolor || e.oppositecolor) && console.log(`Verticator inverse color is: "${i.verticatorinverse}"`)), e.color && r.style.setProperty(h.vertiColorVar, i.verticatorregular), i;
}, G = (r) => r.getConfig().hashOneBasedIndex ? 1 : 0, A = (r, t, e) => {
  const i = G(e), s = Array.from(t.querySelectorAll("li"));
  let n = i - 1;
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    Number.parseInt(a.dataset.index || "0", 10) <= (r.indexv || 0) + i && (n = o), a.classList.remove(h.activeclass);
  }
  n >= 0 && n < s.length && s[n].classList.add(h.activeclass);
}, V = (r, t, e, i, s) => {
  const n = e.getRevealElement(), o = r.currentSlide.parentNode;
  o.classList.contains("stack") && (o.classList.contains(h.lightClass) ? n.classList.add("lightstack") : n.classList.remove("lightstack"), o.classList.contains(h.darkClass) ? n.classList.add("darkstack") : n.classList.remove("darkstack"));
  const a = r.currentSlide.dataset.verticator, c = o.dataset.verticator;
  if (a || c)
    if (a === "regular" || c === "regular")
      t.style.setProperty(h.forceColorVar, i.verticatorregular), s.debug && console.log(`Verticator forced to: "${i.verticatorregular}"`);
    else if (a === "inverse" || c === "inverse")
      t.style.setProperty(h.forceColorVar, i.verticatorinverse), s.debug && console.log(`Verticator forced to: "${i.verticatorinverse}"`);
    else {
      const g = a ?? c ?? "";
      t.style.setProperty(h.forceColorVar, g), s.debug && console.log(`Verticator forced to: "${g}"`);
    }
  else
    t.style.removeProperty(h.forceColorVar);
}, M = (r, t, e, i, s) => {
  r ? (i.style.setProperty(h.themeColorVar, e.themeinverse), t.inversecolor || t.oppositecolor ? s.style.setProperty(h.vertiColorVar, e.verticatorinverse) : s.style.removeProperty(h.vertiColorVar)) : (i.style.setProperty(h.themeColorVar, e.themeregular), t.color ? s.style.setProperty(h.vertiColorVar, e.verticatorregular) : s.style.removeProperty(h.vertiColorVar));
}, be = (r, t, e, i) => {
  const s = t.getRevealElement(), n = t.getViewportElement(), o = {
    dark: s.classList.contains(h.darkClass),
    light: s.classList.contains(h.lightClass),
    darkParent: s.classList.contains("darkstack"),
    lightParent: s.classList.contains("lightstack")
  }, a = new MutationObserver((g) => {
    for (const v of g) {
      const { target: S } = v;
      if (v.attributeName === "class") {
        const y = (l) => S.classList.contains(l), C = y(h.lightClass), E = y(h.darkClass), m = y("lightstack"), $ = y("darkstack");
        C || E ? (o.dark !== E || o.light !== C) && (e.theme === "dark" && o.light !== C && (o.light = C, M(C, i, e, s, r)), e.theme === "light" && o.dark !== E && (o.dark = E, M(E, i, e, s, r))) : m || $ ? (o.darkParent !== $ || o.lightParent !== m) && (e.theme === "dark" && o.lightParent !== m && (o.lightParent = m, M(
          m,
          i,
          e,
          s,
          r
        )), e.theme === "light" && o.darkParent !== $ && (o.darkParent = $, M($, i, e, s, r))) : (o.dark = !1, o.light = !1, M(!1, i, e, s, r));
      }
    }
  });
  (() => {
    n.classList.contains("reveal-scroll") ? a.observe(n, {
      attributes: !0,
      attributeFilter: ["class"]
    }) : a.observe(s, {
      attributes: !0,
      attributeFilter: ["class"]
    });
  })();
}, ye = (r, t) => {
  const e = r.getRevealElement();
  let i = e.querySelector("ul.verticator");
  return !i && t.autogenerate && (i = document.createElement("ul"), i.classList.add("verticator"), t.clickable || i.classList.add("no-click"), e.insertBefore(i, e.childNodes[0])), i;
}, B = (r, t, e) => {
  let i = e.position;
  i === "auto" && (i = r.getConfig().rtl ? "left" : "right"), i === "left" ? (t.classList.add("left"), t.style.left = e.offset) : t.style.right = e.offset;
  let s = e.scale;
  s = s > 2 ? 2 : s < 0.5 ? 0.5 : s;
  let n = r.getScale(), o = n > 1 ? n * s : s;
  z(t, o), r.on("resize", (a) => {
    const c = a;
    a && typeof c.scale == "number" && (n = c.scale, o = n > 1 ? n * s : s, z(t, o));
  });
}, z = (r, t) => {
  r.style.setProperty("--verticator-scale", t.toFixed(2));
  const e = 1 / Math.sqrt(t);
  r.style.setProperty("--verticator-tooltip-scale", e.toFixed(2));
}, Se = (r, t, e, i, s) => {
  x.log(s, `Creating ${e.length} bullets`);
  const n = G(i);
  t.classList.remove("visible");
  let o = "";
  for (const a of e) {
    const c = a[0], g = a[1], v = `href="#/${r.indexh + n}/${c + n}"`, S = g ? `data-name="${g}"` : "", y = g ? `<div class="tooltip"><span>${g}</span></div>` : "";
    o += `<li data-index="${c + n}"><a ${s.clickable ? v : ""}${S}></a>${y}</li>`;
  }
  t.innerHTML = `<div class="verticator-holder">${o}</div>`, A(r, t, i), setTimeout(() => {
    t.classList.add("visible");
  }, 300);
}, Ce = w.getStack, F = (r) => {
  const t = ["data-verticator-tooltip", "data-name", "title"];
  for (const i of t) {
    const s = r.getAttribute(i);
    if (s)
      return s;
  }
  const e = ["h1", "h2", "h3", "h4"];
  for (const i of e) {
    const s = r.querySelector(i);
    if (s != null && s.textContent)
      return s.textContent;
  }
  return null;
}, Ee = (r, t) => r.dataset.verticatorTooltip === "none" || r.dataset.verticatorTooltip === "false" || r.classList.contains("no-verticator-tooltip") ? null : t.tooltip === !0 ? F(r) : typeof t.tooltip == "string" ? t.tooltip === "auto" || t.tooltip === "true" ? F(r) : r.getAttribute(t.tooltip) || null : null, $e = (r, t) => {
  const e = Ce(r);
  return e ? Array.from(e.children).map((a, c) => [c, a]).filter((a) => {
    const c = a[1];
    return !(t.skipuncounted === !0 && c.getAttribute("data-visibility") === "uncounted");
  }).map((a) => {
    const [c, g] = a;
    let v = null;
    return t.tooltip && (v = Ee(g, t)), [c, v];
  }) : [];
}, R = w.getStack, _ = (r, t, e, i) => {
  if (r.type === "resize") {
    r.currentSlide = t.getCurrentSlide();
    const c = t.getIndices();
    r.indexv = c.v;
  }
  const s = r.currentSlide, n = $e(s, i);
  if (n.length < 2) {
    e.classList.remove("visible"), e.innerHTML = "";
    return;
  }
  const o = R(s), a = r.previousSlide ? R(r.previousSlide) : null;
  !r.previousSlide || o !== a ? Se(r, e, n, t, i) : A(r, e, t);
};
class j {
  constructor(t, e) {
    k(this, "deck");
    k(this, "config");
    k(this, "colors");
    k(this, "theVerticator", null);
    k(this, "currentSlide", null);
    this.deck = t, this.config = e, this.colors = {
      theme: "",
      themeregular: "",
      themeinverse: "",
      verticatorregular: "",
      verticatorinverse: ""
    };
  }
  static async create(t, e) {
    await new j(t, e).initialize();
  }
  async initialize() {
    this.setupVerticator(), this.theVerticator && (this.colors = N(
      this.theVerticator,
      this.deck.getRevealElement(),
      this.config
    ), B(this.deck, this.theVerticator, this.config), be(this.theVerticator, this.deck, this.colors, this.config), w.addMoreDirectionEvents(this.deck), w.addScrollModeEvents(this.deck), this.addEventListeners());
  }
  setupVerticator() {
    this.theVerticator = ye(this.deck, this.config);
    const t = this.deck.getRevealElement();
    this.theVerticator && (N(this.theVerticator, t, this.config), B(this.deck, this.theVerticator, this.config));
  }
  addEventListeners() {
    this.deck.on("slidechanged-h", (t) => {
      if (!this.theVerticator) return;
      const e = t;
      e.currentSlide !== this.currentSlide && (_(e, this.deck, this.theVerticator, this.config), V(e, this.theVerticator, this.deck, this.colors, this.config), this.currentSlide = e.currentSlide);
    }), this.deck.on("slidechanged-v", (t) => {
      if (!this.theVerticator) return;
      const e = t;
      e.currentSlide !== this.currentSlide && (A(e, this.theVerticator, this.deck), V(e, this.theVerticator, this.deck, this.colors, this.config), this.currentSlide = e.currentSlide);
    }), this.deck.on("scrollmode-exit", (t) => {
      if (!this.theVerticator) return;
      const e = t;
      _(e, this.deck, this.theVerticator, this.config), V(e, this.theVerticator, this.deck, this.colors, this.config), this.currentSlide = e.currentSlide;
    });
  }
}
const W = "verticator", ke = async (r, t, e) => {
  x && e.debug && x.initialize(!0, W), await ae(r, e), await j.create(t, e);
}, Me = () => new ie(W, ke, me).createInterface();
export {
  Me as default
};
