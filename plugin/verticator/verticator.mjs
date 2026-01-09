 /*****************************************************************
 *
 * reveal.js-verticator for Reveal.js 
 * Version 1.3.1
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
 * Copyright (C) 2026 Martijn De Jongh (Martino)
 *
 ******************************************************************/


const Z = {
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
function J(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var O, x;
function Q() {
  if (x) return O;
  x = 1;
  var r = function(c) {
    return t(c) && !e(c);
  };
  function t(l) {
    return !!l && typeof l == "object";
  }
  function e(l) {
    var c = Object.prototype.toString.call(l);
    return c === "[object RegExp]" || c === "[object Date]" || o(l);
  }
  var i = typeof Symbol == "function" && Symbol.for, s = i ? /* @__PURE__ */ Symbol.for("react.element") : 60103;
  function o(l) {
    return l.$$typeof === s;
  }
  function n(l) {
    return Array.isArray(l) ? [] : {};
  }
  function a(l, c) {
    return c.clone !== !1 && c.isMergeableObject(l) ? p(n(l), l, c) : l;
  }
  function u(l, c, d) {
    return l.concat(c).map(function(v) {
      return a(v, d);
    });
  }
  function g(l, c) {
    if (!c.customMerge)
      return p;
    var d = c.customMerge(l);
    return typeof d == "function" ? d : p;
  }
  function m(l) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(l).filter(function(c) {
      return Object.propertyIsEnumerable.call(l, c);
    }) : [];
  }
  function y(l) {
    return Object.keys(l).concat(m(l));
  }
  function b(l, c) {
    try {
      return c in l;
    } catch {
      return !1;
    }
  }
  function S(l, c) {
    return b(l, c) && !(Object.hasOwnProperty.call(l, c) && Object.propertyIsEnumerable.call(l, c));
  }
  function C(l, c, d) {
    var v = {};
    return d.isMergeableObject(l) && y(l).forEach(function(f) {
      v[f] = a(l[f], d);
    }), y(c).forEach(function(f) {
      S(l, f) || (b(l, f) && d.isMergeableObject(c[f]) ? v[f] = g(f, d)(l[f], c[f], d) : v[f] = a(c[f], d));
    }), v;
  }
  function p(l, c, d) {
    d = d || {}, d.arrayMerge = d.arrayMerge || u, d.isMergeableObject = d.isMergeableObject || r, d.cloneUnlessOtherwiseSpecified = a;
    var v = Array.isArray(c), f = Array.isArray(l), Y = v === f;
    return Y ? v ? d.arrayMerge(l, c, d) : C(l, c, d) : a(c, d);
  }
  p.all = function(c, d) {
    if (!Array.isArray(c))
      throw new Error("first argument should be an array");
    return c.reduce(function(v, f) {
      return p(v, f, d);
    }, {});
  };
  var E = p;
  return O = E, O;
}
var X = Q();
const ee = /* @__PURE__ */ J(X);
let I = null;
const te = () => {
  if (I) return I;
  const r = typeof window < "u", t = typeof document < "u";
  let e = !1;
  try {
    const s = new Function('return typeof module !== "undefined" && !!module.hot')(), o = new Function('return typeof import.meta !== "undefined" && !!import.meta.hot')();
    e = s || o;
  } catch {
  }
  let i = !1;
  try {
    i = new Function('return typeof import.meta !== "undefined" && import.meta.env?.DEV === true')();
  } catch {
  }
  return I = {
    isDevelopment: e || i,
    hasHMR: e,
    isViteDev: i,
    hasWindow: r,
    hasDocument: t
  }, I;
};
class re {
  defaultConfig;
  pluginInit;
  pluginId;
  mergedConfig = null;
  userConfigData = null;
  /** Public data storage for plugin state */
  data = {};
  // Create a new plugin instance
  constructor(t, e, i) {
    typeof t == "string" ? (this.pluginId = t, this.pluginInit = e, this.defaultConfig = i || {}) : (this.pluginId = t.id, this.pluginInit = t.init, this.defaultConfig = t.defaultConfig || {});
  }
  // Initialize plugin configuration by merging default and user settings
  initializeConfig(t) {
    const e = this.defaultConfig, i = t.getConfig()[this.pluginId] || {};
    this.userConfigData = i, this.mergedConfig = ee(e, i, {
      arrayMerge: (s, o) => o,
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
  // Gets information about the current JavaScript environment
  getEnvironmentInfo = () => te();
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
const ie = (r) => {
  const t = document.querySelector(
    `script[src$="${r}.js"], script[src$="${r}.min.js"], script[src$="${r}.mjs"]`
  );
  if (t?.src) {
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
}, B = "data-css-id", se = (r, t) => new Promise((e, i) => {
  const s = document.createElement("link");
  s.rel = "stylesheet", s.href = t, s.setAttribute(B, r);
  const o = setTimeout(() => {
    s.parentNode && s.parentNode.removeChild(s), i(new Error(`[${r}] Timeout loading CSS from: ${t}`));
  }, 5e3);
  s.onload = () => {
    clearTimeout(o), e();
  }, s.onerror = () => {
    clearTimeout(o), s.parentNode && s.parentNode.removeChild(s), i(new Error(`[${r}] Failed to load CSS from: ${t}`));
  }, document.head.appendChild(s);
}), V = (r) => document.querySelectorAll(`[${B}="${r}"]`).length > 0, oe = (r) => new Promise((t) => {
  if (e())
    return t(!0);
  setTimeout(() => {
    t(e());
  }, 50);
  function e() {
    if (V(r)) return !0;
    try {
      return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${r}`).trim() !== "";
    } catch {
      return !1;
    }
  }
}), A = async (r) => {
  const { id: t, cssautoload: e = !0, csspath: i = "", debug: s = !1 } = r;
  if (e === !1 || i === !1) return;
  if (V(t) && !(typeof i == "string" && i.trim() !== "")) {
    s && console.log(`[${t}] CSS is already loaded, skipping`);
    return;
  }
  V(t) && typeof i == "string" && i.trim() !== "" && s && console.log(`[${t}] CSS is already loaded, also loading user-specified path: ${i}`);
  const o = [];
  typeof i == "string" && i.trim() !== "" && o.push(i);
  const n = ie(t);
  if (n) {
    const u = `${n}${t}.css`;
    o.push(u);
  }
  const a = `plugin/${t}/${t}.css`;
  o.push(a);
  for (const u of o)
    try {
      await se(t, u);
      let g = "CSS";
      i && u === i ? g = "user-specified CSS" : n && u === `${n}${t}.css` ? g = "CSS (auto-detected from script location)" : g = "CSS (standard fallback)", s && console.log(`[${t}] ${g} loaded successfully from: ${u}`);
      return;
    } catch {
      s && console.log(`[${t}] Failed to load CSS from: ${u}`);
    }
  console.warn(`[${t}] Could not load CSS from any location`);
};
async function ne(r, t) {
  if ("getEnvironmentInfo" in r && t) {
    const e = r, i = e.getEnvironmentInfo();
    if (await oe(e.pluginId) && !(typeof t.csspath == "string" && t.csspath.trim() !== "")) {
      t.debug && console.log(`[${e.pluginId}] CSS is already imported, skipping`);
      return;
    }
    if ("cssautoload" in e.userConfig ? t.cssautoload : !i.isDevelopment)
      return A({
        id: e.pluginId,
        cssautoload: !0,
        csspath: t.csspath,
        debug: t.debug
      });
    i.isDevelopment && console.warn(
      `[${e.pluginId}] CSS autoloading is disabled in bundler environments. Please import the CSS manually, using import.`
    );
    return;
  }
  return A(r);
}
class le {
  // Flag to enable/disable all debugging output
  debugMode = !1;
  // Label to prefix all debug messages with
  label = "DEBUG";
  // Tracks the current depth of console groups for proper formatting
  groupDepth = 0;
  // Initializes the debug utility with custom settings.
  initialize(t, e = "DEBUG") {
    this.debugMode = t, this.label = e;
  }
  // Creates a new console group and tracks the group depth. 
  // Groups will always display the label prefix in their header.
  group = (...t) => {
    this.debugLog("group", ...t), this.groupDepth++;
  };
  // Creates a new collapsed console group and tracks the group depth.
  groupCollapsed = (...t) => {
    this.debugLog("groupCollapsed", ...t), this.groupDepth++;
  };
  // Ends the current console group and updates the group depth tracker.
  groupEnd = () => {
    this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"));
  };
  // Formats and logs an error message with the debug label. 
  // Error messages are always shown, even when debug mode is disabled.
  error = (...t) => {
    const e = this.debugMode;
    this.debugMode = !0, this.formatAndLog(console.error, t), this.debugMode = e;
  };
  // Displays a table in the console with the pluginDebug label.
  // Special implementation for console.table to handle tabular data properly.
  // @param messageOrData - Either a message string or the tabular data
  // @param propertiesOrData - Either property names or tabular data (if first param was message)
  // @param optionalProperties - Optional property names (if first param was message)
  table = (t, e, i) => {
    if (this.debugMode)
      try {
        typeof t == "string" && e !== void 0 && typeof e != "string" ? (this.groupDepth === 0 ? console.log(`[${this.label}]: ${t}`) : console.log(t), i ? console.table(e, i) : console.table(e)) : (this.groupDepth === 0 && console.log(`[${this.label}]: Table data`), typeof e == "object" && Array.isArray(e) ? console.table(t, e) : console.table(t));
      } catch (s) {
        console.error(`[${this.label}]: Error showing table:`, s), console.log(`[${this.label}]: Raw data:`, t);
      }
  };
  // Helper method that formats and logs messages with the pluginDebug label.
  // @param logMethod - The console method to use for logging
  // @param args - Arguments to pass to the console method
  formatAndLog = (t, e) => {
    if (this.debugMode)
      try {
        this.groupDepth > 0 ? t.call(console, ...e) : e.length > 0 && typeof e[0] == "string" ? t.call(console, `[${this.label}]: ${e[0]}`, ...e.slice(1)) : t.call(console, `[${this.label}]:`, ...e);
      } catch (i) {
        console.error(`[${this.label}]: Error in logging:`, i), console.log(`[${this.label}]: Original log data:`, ...e);
      }
  };
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
const ae = (r) => new Proxy(r, {
  get: (t, e) => {
    if (e in t)
      return t[e];
    const i = e.toString();
    if (typeof console[i] == "function")
      return (...s) => {
        t.debugLog(i, ...s);
      };
  }
}), $ = ae(new le()), U = (r) => {
  let [t, e] = [0, 0];
  r.on("slidechanged", (i) => {
    const { indexh: s, indexv: o, previousSlide: n, currentSlide: a } = i;
    s !== t && r.dispatchEvent({
      type: "slidechanged-h",
      data: { previousSlide: n, currentSlide: a, indexh: s, indexv: o }
    }), o !== e && s === t && r.dispatchEvent({
      type: "slidechanged-v",
      data: { previousSlide: n, currentSlide: a, indexh: s, indexv: o }
    }), [t, e] = [s, o];
  });
}, ce = U, ue = (r) => {
  const t = r.getViewportElement();
  if (!t)
    return console.warn("[verticator]: Could not find viewport element"), () => {
    };
  const e = () => t.classList.contains("reveal-scroll");
  let i = e(), s = !0;
  const o = new MutationObserver(() => {
    if (!s) return;
    const n = e();
    if (n !== i) {
      const a = r.getCurrentSlide(), u = r.getIndices(), g = u.h, m = u.v, y = n ? "scrollmode-enter" : "scrollmode-exit";
      r.dispatchEvent({
        type: y,
        data: {
          currentSlide: a,
          previousSlide: null,
          indexh: g,
          indexv: m
          // We can add stuff here if needed. Plugin-authors, just ask!
        }
      }), i = n;
    }
  });
  return o.observe(t, { attributes: !0, attributeFilter: ["class"] }), () => {
    s = !1, o.disconnect();
  };
}, D = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addDirectionEvents: U,
  addMoreDirectionEvents: ce,
  addScrollModeEvents: ue
}, Symbol.toStringTag, { value: "Module" }));
var q = /* @__PURE__ */ ((r) => (r.HORIZONTAL = "horizontal", r.STACK = "stack", r.VERTICAL = "vertical", r.INVALID = "invalid", r))(q || {});
const k = (r) => r instanceof HTMLElement && r.tagName === "SECTION", M = (r) => k(r) ? Array.from(r.children).some(
  (t) => t instanceof HTMLElement && t.tagName === "SECTION"
) : !1, w = (r) => k(r) ? r.parentElement instanceof HTMLElement && r.parentElement.tagName === "SECTION" : !1, de = (r) => k(r) && !w(r) && !M(r), he = (r) => {
  if (!k(r)) return null;
  if (w(r)) {
    const t = r.parentElement;
    if (t instanceof HTMLElement && M(t))
      return t;
  }
  return null;
}, ge = (r) => k(r) ? w(r) ? "vertical" : M(r) ? "stack" : "horizontal" : "invalid", G = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SectionType: q,
  getSectionType: ge,
  getStack: he,
  isHorizontal: de,
  isSection: k,
  isStack: M,
  isVertical: w
}, Symbol.toStringTag, { value: "Module" })), h = {
  lightClass: "has-light-background",
  darkClass: "has-dark-background",
  themeColorVar: "--c-theme-color",
  vertiColorVar: "--v-color",
  forceColorVar: "--v-forcecolor",
  activeclass: "active"
}, K = (r) => r.getConfig().hashOneBasedIndex ? 1 : 0, T = (r, t, e) => {
  const i = K(e), s = Array.from(t.querySelectorAll("li"));
  let o = i - 1;
  for (let n = 0; n < s.length; n++) {
    const a = s[n];
    Number.parseInt(a.dataset.index || "0", 10) <= (r.indexv || 0) + i && (o = n), a.classList.remove(h.activeclass);
  }
  o >= 0 && o < s.length && s[o].classList.add(h.activeclass);
}, P = (r, t, e, i, s) => {
  const o = e.getRevealElement(), n = r.currentSlide.parentNode;
  n.classList.contains("stack") && (n.classList.contains(h.lightClass) ? o.classList.add("lightstack") : o.classList.remove("lightstack"), n.classList.contains(h.darkClass) ? o.classList.add("darkstack") : o.classList.remove("darkstack"));
  const a = r.currentSlide.dataset.verticator, u = n.dataset.verticator;
  if (a || u)
    if (a === "regular" || u === "regular")
      t.style.setProperty(h.forceColorVar, i.verticatorregular), s.debug && console.log(`Verticator forced to: "${i.verticatorregular}"`);
    else if (a === "inverse" || u === "inverse")
      t.style.setProperty(h.forceColorVar, i.verticatorinverse), s.debug && console.log(`Verticator forced to: "${i.verticatorinverse}"`);
    else {
      const g = a ?? u ?? "";
      t.style.setProperty(h.forceColorVar, g), s.debug && console.log(`Verticator forced to: "${g}"`);
    }
  else
    t.style.removeProperty(h.forceColorVar);
}, L = (r, t, e, i, s) => {
  r ? (i.style.setProperty(h.themeColorVar, e.themeinverse), t.inversecolor || t.oppositecolor ? s.style.setProperty(h.vertiColorVar, e.verticatorinverse) : s.style.removeProperty(h.vertiColorVar)) : (i.style.setProperty(h.themeColorVar, e.themeregular), t.color ? s.style.setProperty(h.vertiColorVar, e.verticatorregular) : s.style.removeProperty(h.vertiColorVar));
}, fe = (r, t, e, i) => {
  const s = t.getRevealElement(), o = t.getViewportElement(), n = {
    dark: s.classList.contains(h.darkClass),
    light: s.classList.contains(h.lightClass),
    darkParent: s.classList.contains("darkstack"),
    lightParent: s.classList.contains("lightstack")
  }, a = new MutationObserver((g) => {
    for (const m of g) {
      const { target: y } = m;
      if (m.attributeName === "class") {
        const b = (l) => y.classList.contains(l), S = b(h.lightClass), C = b(h.darkClass), p = b("lightstack"), E = b("darkstack");
        S || C ? (n.dark !== C || n.light !== S) && (e.theme === "dark" && n.light !== S && (n.light = S, L(S, i, e, s, r)), e.theme === "light" && n.dark !== C && (n.dark = C, L(C, i, e, s, r))) : p || E ? (n.darkParent !== E || n.lightParent !== p) && (e.theme === "dark" && n.lightParent !== p && (n.lightParent = p, L(
          p,
          i,
          e,
          s,
          r
        )), e.theme === "light" && n.darkParent !== E && (n.darkParent = E, L(E, i, e, s, r))) : (n.dark = !1, n.light = !1, L(!1, i, e, s, r));
      }
    }
  });
  o.classList.contains("reveal-scroll") ? a.observe(o, {
    attributes: !0,
    attributeFilter: ["class"]
  }) : a.observe(s, {
    attributes: !0,
    attributeFilter: ["class"]
  });
}, pe = (r, t) => {
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
  }, s = pe(
    t,
    e.themetag ? e.themetag : "section"
  );
  return i.theme = s.theme, i.themeregular = s.regular, i.themeinverse = s.inverse, i.verticatorregular = e.color ? e.color : s.regular, i.verticatorinverse = e.inversecolor ? e.inversecolor : e.oppositecolor ? e.oppositecolor : s.inverse, $.log(`Theme regular color is: "${i.themeregular}"`), $.log(`Theme inverse color is: "${i.themeinverse}"`), e.color && $.log(`Verticator regular color is: "${i.verticatorregular}"`), (e.inversecolor || e.oppositecolor) && $.log(`Verticator inverse color is: "${i.verticatorinverse}"`), e.color && r.style.setProperty(h.vertiColorVar, i.verticatorregular), i;
}, me = (r, t) => {
  const e = r.getRevealElement();
  let i = e.querySelector("ul.verticator");
  return !i && t.autogenerate && (i = document.createElement("ul"), i.classList.add("verticator"), t.clickable || i.classList.add("no-click"), e.insertBefore(i, e.childNodes[0])), i;
}, z = (r, t, e) => {
  let i = e.position;
  i === "auto" && (i = r.getConfig().rtl ? "left" : "right"), i === "left" ? (t.classList.add("left"), t.style.left = e.offset) : t.style.right = e.offset;
  let s = e.scale;
  s = s > 2 ? 2 : s < 0.5 ? 0.5 : s;
  let o = r.getScale(), n = o > 1 ? o * s : s;
  _(t, n), r.on("resize", (a) => {
    const u = a;
    a && typeof u.scale == "number" && (o = u.scale, n = o > 1 ? o * s : s, _(t, n));
  });
}, _ = (r, t) => {
  r.style.setProperty("--verticator-scale", t.toFixed(2));
  const e = 1 / Math.sqrt(t);
  r.style.setProperty("--verticator-tooltip-scale", e.toFixed(2));
}, ve = (r, t, e, i, s) => {
  $.log(s, `Creating ${e.length} bullets`);
  const o = K(i);
  t.classList.remove("visible");
  let n = "";
  for (const a of e) {
    const u = a[0], g = a[1], m = `href="#/${r.indexh + o}/${u + o}"`, y = g ? `data-name="${g}"` : "", b = g ? `<div class="tooltip"><span>${g}</span></div>` : "";
    n += `<li data-index="${u + o}"><a ${s.clickable ? m : ""}${y}></a>${b}</li>`;
  }
  t.innerHTML = `<div class="verticator-holder">${n}</div>`, T(r, t, i), setTimeout(() => {
    t.classList.add("visible");
  }, 300);
}, be = G.getStack, R = (r) => {
  const t = ["data-verticator-tooltip", "data-name", "title"];
  for (const i of t) {
    const s = r.getAttribute(i);
    if (s)
      return s;
  }
  const e = ["h1", "h2", "h3", "h4"];
  for (const i of e) {
    const s = r.querySelector(i);
    if (s?.textContent)
      return s.textContent;
  }
  return null;
}, ye = (r, t) => r.dataset.verticatorTooltip === "none" || r.dataset.verticatorTooltip === "false" || r.classList.contains("no-verticator-tooltip") ? null : t.tooltip === !0 ? R(r) : typeof t.tooltip == "string" ? t.tooltip === "auto" || t.tooltip === "true" ? R(r) : r.getAttribute(t.tooltip) || null : null, Se = (r, t) => {
  const e = be(r);
  return e ? Array.from(e.children).map((a, u) => [u, a]).filter((a) => {
    const u = a[1];
    return !(t.skipuncounted === !0 && u.getAttribute("data-visibility") === "uncounted");
  }).map((a) => {
    const [u, g] = a;
    let m = null;
    return t.tooltip && (m = ye(g, t)), [u, m];
  }) : [];
}, F = G.getStack, H = (r, t, e, i) => {
  if (r.type === "resize") {
    r.currentSlide = t.getCurrentSlide();
    const u = t.getIndices();
    r.indexv = u.v;
  }
  const s = r.currentSlide, o = Se(s, i);
  if (o.length < 2) {
    e.classList.remove("visible"), e.innerHTML = "";
    return;
  }
  const n = F(s), a = r.previousSlide ? F(r.previousSlide) : null;
  !r.previousSlide || n !== a ? ve(r, e, o, t, i) : T(r, e, t);
};
class j {
  deck;
  config;
  colors;
  theVerticator = null;
  currentSlide = null;
  constructor(t, e) {
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
    ), z(this.deck, this.theVerticator, this.config), fe(this.theVerticator, this.deck, this.colors, this.config), D.addMoreDirectionEvents(this.deck), D.addScrollModeEvents(this.deck), this.addEventListeners());
  }
  setupVerticator() {
    this.theVerticator = me(this.deck, this.config);
    const t = this.deck.getRevealElement();
    this.theVerticator && (N(this.theVerticator, t, this.config), z(this.deck, this.theVerticator, this.config));
  }
  addEventListeners() {
    this.deck.on("slidechanged-h", (t) => {
      if (!this.theVerticator) return;
      const e = t;
      e.currentSlide !== this.currentSlide && (H(e, this.deck, this.theVerticator, this.config), P(e, this.theVerticator, this.deck, this.colors, this.config), this.currentSlide = e.currentSlide);
    }), this.deck.on("slidechanged-v", (t) => {
      if (!this.theVerticator) return;
      const e = t;
      e.currentSlide !== this.currentSlide && (T(e, this.theVerticator, this.deck), P(e, this.theVerticator, this.deck, this.colors, this.config), this.currentSlide = e.currentSlide);
    }), this.deck.on("scrollmode-exit", (t) => {
      if (!this.theVerticator) return;
      const e = t;
      H(e, this.deck, this.theVerticator, this.config), P(e, this.theVerticator, this.deck, this.colors, this.config), this.currentSlide = e.currentSlide;
    });
  }
}
const W = "verticator", Ce = async (r, t, e) => {
  $ && e.debug && $.initialize(!0, W), await ne(r, e), await j.create(t, e);
}, Ee = () => new re(W, Ce, Z).createInterface();
export {
  Ee as default
};
