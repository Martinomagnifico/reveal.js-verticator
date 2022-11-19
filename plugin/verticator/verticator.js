
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Verticator.js for Reveal.js 
 * Version 1.2.3
 * 
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js 
 ******************************************************************/


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Verticator = factory());
})(this, (function () { 'use strict';

	var Plugin = function Plugin() {
	  var lightClass = "has-light-background";
	  var darkClass = "has-dark-background";
	  var themeColorVar = "--c-theme-color";
	  var vertiColorVar = "--v-color";
	  var forceColorVar = "--v-forcecolor";
	  var activeclass = 'active';

	  var loadStyle = function loadStyle(url, title, callback) {
	    var head = document.querySelector('head');
	    var style = document.querySelector("[title=\"".concat(title, "\"]"));

	    if (typeof style == 'undefined' || style == null) {
	      style = document.createElement('link');
	      style.rel = 'stylesheet';
	      style.href = url;
	      style.title = title;

	      var finish = function finish() {
	        if (typeof callback === 'function') {
	          callback.call();
	          callback = null;
	        }
	      };

	      style.onload = finish;

	      style.onreadystatechange = function () {
	        if (this.readyState === 'loaded') {
	          finish();
	        }
	      };

	      head.appendChild(style);
	    }
	  };

	  var findThemeColors = function findThemeColors(parent, tag) {
	    var themeColors = {};
	    var colorSection = document.createElement("section");
	    var sectionChild = document.createElement(tag);
	    parent.getElementsByClassName('slides')[0].appendChild(colorSection).appendChild(sectionChild);
	    themeColors.regular = getComputedStyle(sectionChild).getPropertyValue('color');
	    colorSection.classList.add(lightClass);
	    themeColors.inverse = getComputedStyle(sectionChild).getPropertyValue('color');

	    if (themeColors.regular == themeColors.inverse) {
	      themeColors.theme = "light";
	      colorSection.classList.remove(lightClass);
	      colorSection.classList.add(darkClass);
	      themeColors.inverse = getComputedStyle(sectionChild).getPropertyValue('color');
	    } else {
	      themeColors.theme = "dark";
	    }

	    colorSection.remove();
	    return themeColors;
	  };

	  var swapColors = function swapColors(needToSwap, options, colors, revealElement, theVerticator) {
	    if (needToSwap) {
	      revealElement.style.setProperty(themeColorVar, colors.themeinverse);

	      if (options.inversecolor || options.oppositecolor) {
	        theVerticator.style.setProperty(vertiColorVar, colors.verticatorinverse);
	      } else {
	        theVerticator.style.removeProperty(vertiColorVar);
	      }
	    } else {
	      revealElement.style.setProperty(themeColorVar, colors.themeregular);

	      if (options.color) {
	        theVerticator.style.setProperty(vertiColorVar, colors.verticatorregular);
	      } else {
	        theVerticator.style.removeProperty(vertiColorVar);
	      }
	    }
	  };

	  var verticate = function verticate(deck, options) {
	    var userScale = options.scale;
	    userScale = userScale > 2 ? 2 : userScale < 0.5 ? 0.5 : userScale;
	    var revealElement = deck.getRevealElement();
	    var theVerticator = revealElement.querySelector('ul.verticator');

	    if (!theVerticator) {
	      if (!options.autogenerate) return;
	      var ul = document.createElement('ul');
	      ul.className += "verticator";
	      revealElement.insertBefore(ul, revealElement.childNodes[0]);
	      theVerticator = revealElement.querySelector('ul.verticator');
	    }

	    if (!options.clickable) {
	      theVerticator.classList.add('no-click');
	    }

	    var revealScale = deck.getScale();
	    var totalScale = revealScale > 1 ? revealScale * userScale : userScale;
	    theVerticator.style.setProperty('--verticator-scale', totalScale.toFixed(2));
	    var tooltipScaleDamper = 1 / Math.sqrt(totalScale);
	    theVerticator.style.setProperty('--verticator-tooltip-scale', tooltipScaleDamper.toFixed(2));
	    var colors = {};
	    var themeColors = findThemeColors(revealElement, options.themetag ? options.themetag : 'section');
	    colors.theme = themeColors.theme;
	    colors.themeregular = themeColors.regular;
	    colors.themeinverse = themeColors.inverse;
	    colors.verticatorregular = options.color ? options.color : themeColors.regular;
	    colors.verticatorinverse = options.inversecolor ? options.inversecolor : options.oppositecolor ? options.oppositecolor : themeColors.inverse;

	    if (options.debug) {
	      console.log("Theme regular color is: \"".concat(colors.themeregular, "\""));
	      console.log("Theme inverse color is: \"".concat(colors.themeinverse, "\""));

	      if (options.color) {
	        console.log("Verticator regular color is: \"".concat(colors.verticatorregular, "\""));
	      }

	      if (options.inversecolor || options.oppositecolor) {
	        console.log("Verticator inverse color is: \"".concat(colors.verticatorinverse, "\""));
	      }
	    }

	    revealElement.style.setProperty(themeColorVar, colors.themeregular);

	    if (options.color) {
	      theVerticator.style.setProperty(vertiColorVar, colors.verticatorregular);
	    }

	    var sectionState = {};
	    sectionState.dark = revealElement.classList.contains(darkClass);
	    sectionState.light = revealElement.classList.contains(lightClass);
	    sectionState.rtl = revealElement.classList.contains('rtl');
	    var revealElementObserver = new MutationObserver(function (mutations) {
	      mutations.forEach(function (mutation) {
	        mutation.target;

	        if (mutation.attributeName === 'class') {
	          var hasLightBg = mutation.target.classList.contains(lightClass);
	          var hasDarkBg = mutation.target.classList.contains(darkClass);
	          var leftAligned = mutation.target.classList.contains('rtl');

	          if (sectionState.dark !== hasDarkBg || sectionState.light !== hasLightBg) {
	            if (colors.theme == "dark" && sectionState.light !== hasLightBg) {
	              sectionState.light = hasLightBg;
	              swapColors(hasLightBg, options, colors, revealElement, theVerticator);
	            }

	            if (colors.theme == "light" && sectionState.dark !== hasDarkBg) {
	              sectionState.dark = hasDarkBg;
	              swapColors(hasDarkBg, options, colors, revealElement, theVerticator);
	            }
	          }

	          if (options.position == "auto") {
	            if (sectionState.rtl !== leftAligned) {
	              sectionState.rtl = leftAligned;

	              if (leftAligned) {
	                theVerticator.style.left = options.offset;
	                theVerticator.style.right = "auto";
	                theVerticator.classList.add('left');
	              } else {
	                theVerticator.style.right = options.offset;
	                theVerticator.style.left = "auto";
	                theVerticator.classList.remove('left');
	              }
	            }
	          }
	        }
	      });
	    });
	    revealElementObserver.observe(revealElement, {
	      attributes: true,
	      attributeFilter: ['class']
	    });
	    deck.on('slidechanged', function (event) {
	      if (event.currentSlide.dataset.verticator) {
	        if (event.currentSlide.dataset.verticator == "regular") {
	          theVerticator.style.setProperty(forceColorVar, colors.verticatorregular);

	          if (options.debug) {
	            console.log("Verticator forced to: \"".concat(colors.verticatorregular, "\""));
	          }
	        } else if (event.currentSlide.dataset.verticator == "inverse") {
	          theVerticator.style.setProperty(forceColorVar, colors.verticatorinverse);

	          if (options.debug) {
	            console.log("Verticator forced to: \"".concat(colors.verticatorinverse, "\""));
	          }
	        } else {
	          theVerticator.style.setProperty(forceColorVar, deck.getCurrentSlide().dataset.verticator);

	          if (options.debug) {
	            console.log("Verticator forced to: \"".concat(deck.getCurrentSlide().dataset.verticator, "\""));
	          }
	        }
	      } else {
	        theVerticator.style.removeProperty(forceColorVar);
	      }
	    });
	    deck.on('resize', function (event) {
	      revealScale = event.scale;
	      totalScale = revealScale > 1 ? revealScale * userScale : userScale;
	      theVerticator.style.setProperty('--verticator-scale', totalScale.toFixed(2));
	    });

	    if (options.offset != '3vmin') {
	      theVerticator.style.right = options.offset;
	    }

	    theVerticator.style.right = options.offset;

	    if (options.position !== "auto") {
	      var opposite = options.position == "left" ? "right" : "left";
	      theVerticator.style[options.position] = options.offset;
	      theVerticator.style[opposite] = "auto";

	      if (options.position == "left" && options.tooltip !== false) {
	        theVerticator.classList.add('left');
	      }
	    }

	    var selectionArray = function selectionArray(container, selectors) {
	      var selections = container.querySelectorAll(selectors);
	      var selectionarray = Array.prototype.slice.call(selections);
	      return selectionarray;
	    };

	    var clickBullet = function clickBullet(event) {
	      if (event.target.matches('.verticator li a')) {
	        var currIndexh = deck.getIndices().h;
	        var currIndexf = deck.getIndices().v;
	        var i = getNodeindex(event.target.parentNode);
	        event.preventDefault();
	        deck.slide(currIndexh, i, currIndexf);
	      }
	    };

	    var activateBullet = function activateBullet(event) {
	      var listItems = selectionArray(theVerticator, 'li');
	      var bestMatch = options.indexbase - 1;
	      listItems.forEach(function (listItem, i) {
	        if (parseInt(listItem.dataset.index) <= event.indexv + options.indexbase) {
	          bestMatch = i;
	        }

	        listItem.classList.remove(activeclass);
	      });

	      if (bestMatch >= 0) {
	        listItems[bestMatch].classList.add(activeclass);
	      }
	    };

	    var ttName = function ttName(element) {
	      if (element.dataset.verticatorTooltip && (element.dataset.verticatorTooltip == "none" || element.dataset.verticatorTooltip == "false") || element.classList.contains('no-verticator-tooltip')) {
	        return;
	      } else if (options.tooltip != "auto" && element.getAttribute("".concat(options.tooltip))) {
	        return element.getAttribute("".concat(options.tooltip));
	      } else if (options.tooltip == "auto") {
	        for (var _i = 0, _arr = ["data-verticator-tooltip", "data-name", "title"]; _i < _arr.length; _i++) {
	          var attr = _arr[_i];

	          if (element.getAttribute(attr)) {
	            return element.getAttribute(attr);
	          }
	        }

	        for (var _i2 = 0, _arr2 = ["h1", "h2", "h3", "h4"]; _i2 < _arr2.length; _i2++) {
	          var slctr = _arr2[_i2];

	          if (element.querySelector(slctr)) {
	            return element.querySelector(slctr).textContent;
	          }
	        }
	      } else return false;
	    };

	    var createBullets = function createBullets(event, sections) {
	      theVerticator.classList.remove('visible');
	      var listHtml = '';
	      sections.forEach(function (section) {
	        var i = section[0];
	        var tooltipname = section[1];
	        var link = "href=\"#/".concat(event.indexh + options.indexbase, "/").concat(i + options.indexbase, "\"");
	        var dataname = tooltipname ? "data-name=\"".concat(tooltipname, "\"") : '';
	        var tooltip = tooltipname ? "<div class=\"tooltip\"><span>".concat(tooltipname, "</span></div>") : '';
	        listHtml += "<li data-index=\"".concat(i + options.indexbase, "\"><a ").concat(options.clickable ? link : '').concat(dataname, "></a>").concat(tooltip, "</li>");
	      });
	      theVerticator.innerHTML = listHtml;
	      activateBullet(event);
	      setTimeout(function () {
	        theVerticator.classList.add('visible');
	      }, 300);
	    };

	    var slideAppear = function slideAppear(event) {
	      var slide = event.currentSlide;
	      var parent = slide.parentNode;
	      var sections = Array.from(parent.children).map(function (elem, index) {
	        return [index, elem];
	      }).filter(function (indexedElem) {
	        var issection = indexedElem[1].tagName == 'SECTION' && indexedElem[1].parentNode.tagName == 'SECTION';
	        var isuncounted = options.skipuncounted && indexedElem[1].getAttribute('data-visibility') == 'uncounted';
	        return issection && !isuncounted;
	      }).map(function (indexedElem) {
	        var ttname = '';

	        if (options.tooltip) {
	          ttname = ttName(indexedElem[1]);
	        }

	        return [indexedElem[0], ttname];
	      });

	      if (sections.length < 2) {
	        theVerticator.classList.remove('visible');
	        theVerticator.innerHTML = '';
	      } else {
	        if (event.previousSlide) {
	          var lastParent = event.previousSlide.parentNode;

	          if (parent != lastParent) {
	            createBullets(event, sections);
	          }
	        } else {
	          createBullets(event, sections);
	        }

	        activateBullet(event);
	      }
	    };

	    if (theVerticator) {
	      var eventnames = ['ready', 'slidechanged'];
	      eventnames.forEach(function (eventname) {
	        return deck.on(eventname, function (event) {
	          slideAppear(event);
	        });
	      });

	      if (deck.getConfig().embedded) {
	        deck.on('click', function (event) {
	          clickBullet(event);
	        });
	      }
	    }
	  };

	  var init = function init(deck) {
	    var es5Filename = "verticator.js";
	    var defaultOptions = {
	      themetag: 'h1',
	      color: '',
	      inversecolor: '',
	      skipuncounted: false,
	      clickable: true,
	      position: 'auto',
	      offset: '3vmin',
	      autogenerate: true,
	      tooltip: false,
	      scale: 1,
	      csspath: '',
	      debug: false
	    };

	    var defaults = function defaults(options, defaultOptions) {
	      for (var i in defaultOptions) {
	        if (!options.hasOwnProperty(i)) {
	          options[i] = defaultOptions[i];
	        }
	      }
	    };

	    var options = deck.getConfig().verticator || {};
	    options.indexbase = deck.getConfig().hashOneBasedIndex ? 1 : 0;
	    defaults(options, defaultOptions);

	    function pluginPath() {
	      var path;
	      var pluginScript = document.querySelector("script[src$=\"".concat(es5Filename, "\"]"));

	      if (pluginScript) {
	        path = pluginScript.getAttribute("src").slice(0, -1 * es5Filename.length);
	      } else {
	        path = (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('verticator.js', document.baseURI).href)).slice(0, (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('verticator.js', document.baseURI).href)).lastIndexOf('/') + 1);
	      }

	      return path;
	    }

	    var VerticatorStylePath = options.csspath.verticator ? options.csspath.verticator : options.csspath ? options.csspath : "".concat(pluginPath(), "verticator.css") || 'plugin/verticator/verticator.css';

	    if (options.debug) {
	      console.log("Plugin path = ".concat(pluginPath()));
	      console.log("Verticator CSS path = ".concat(VerticatorStylePath));
	    }

	    var generator = document.querySelector('[name=generator]');

	    if (!(generator && generator.content.includes("quarto"))) {
	      loadStyle(VerticatorStylePath, 'verticatorstyle');
	    }

	    verticate(deck, options);
	  };

	  return {
	    id: 'verticator',
	    init: init
	  };
	};

	return Plugin;

}));
