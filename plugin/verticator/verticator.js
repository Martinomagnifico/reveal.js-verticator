
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Verticator.js for Reveal.js 
 * Version 1.1.2
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
	(global = global || self, global.Verticator = factory());
}(this, (function () { 'use strict';

	var Plugin = function Plugin() {
	  // Scope support polyfill
	  try {
	    document.querySelector(":scope *");
	  } catch (t) {
	    !function (t) {
	      var e = /:scope(?![\w-])/gi,
	          r = u(t.querySelector);

	      t.querySelector = function (t) {
	        return r.apply(this, arguments);
	      };

	      var c = u(t.querySelectorAll);

	      if (t.querySelectorAll = function (t) {
	        return c.apply(this, arguments);
	      }, t.matches) {
	        var n = u(t.matches);

	        t.matches = function (t) {
	          return n.apply(this, arguments);
	        };
	      }

	      if (t.closest) {
	        var o = u(t.closest);

	        t.closest = function (t) {
	          return o.apply(this, arguments);
	        };
	      }

	      function u(t) {
	        return function (r) {
	          if (r && e.test(r)) {
	            var _c = "q" + Math.floor(9e6 * Math.random()) + 1e6;

	            arguments[0] = r.replace(e, "[" + _c + "]"), this.setAttribute(_c, "");

	            var _n = t.apply(this, arguments);

	            return this.removeAttribute(_c), _n;
	          }

	          return t.apply(this, arguments);
	        };
	      }
	    }(Element.prototype);
	  }

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
	    deck.on('resize', function (event) {
	      revealScale = event.scale;
	      totalScale = revealScale > 1 ? revealScale * userScale : userScale;
	      theVerticator.style.setProperty('--verticator-scale', totalScale.toFixed(2));
	    });

	    if (options.offset != '3vmin') {
	      theVerticator.style.right = options.offset;
	    }

	    if (options.position == 'left') {
	      theVerticator.classList.add('left');
	      theVerticator.style.right = 'auto';
	      theVerticator.style.left = options.offset;
	    }

	    if (options.position != 'left' && options.position != 'right') {
	      options.position = 'right';
	    }

	    var activeclass = 'active';

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

	      if (revealElement.classList.contains('has-dark-background')) {
	        theVerticator.style.color = options.oppositecolor;
	        theVerticator.style.setProperty('--bullet-maincolor', options.oppositecolor);
	      } else {
	        theVerticator.style.color = options.color;
	        theVerticator.style.setProperty('--bullet-maincolor', options.color);
	      }

	      if (options.darktheme) {
	        if (revealElement.classList.contains('has-light-background')) {
	          theVerticator.style.color = options.oppositecolor;
	          theVerticator.style.setProperty('--bullet-maincolor', options.oppositecolor);
	        } else {
	          theVerticator.style.color = options.color;
	          theVerticator.style.setProperty('--bullet-maincolor', options.color);
	        }
	      }

	      var bestMatch = options.indexbase - 1;
	      listItems.forEach(function (listItem, i) {
	        if (parseInt(listItem.getAttribute("data-index")) <= event.indexv + options.indexbase) {
	          bestMatch = i;
	        }

	        listItem.classList.remove(activeclass);
	      });

	      if (bestMatch >= 0) {
	        listItems[bestMatch].classList.add(activeclass);
	      }
	    };

	    var ttName = function ttName(element) {
	      if (element.getAttribute("data-verticator-tooltip") && (element.getAttribute("data-verticator-tooltip") == "none" || element.getAttribute("data-verticator-tooltip") == "false") || element.classList.contains('no-verticator-tooltip')) {
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
	      theVerticator.style.color = options.color;
	      theVerticator.classList.remove('visible');
	      var listHtml = '';
	      sections.forEach(function (section) {
	        var i = section[0];
	        var tooltipname = section[1];
	        var link = "href=\"#/".concat(event.indexh + options.indexbase, "/").concat(i + options.indexbase, "\"");
	        var dataname = tooltipname ? "data-name=\"".concat(tooltipname, "\"") : '';
	        var tooltip = tooltipname ? "<div class=\"tooltip\"><span>".concat(tooltipname, "</span></div>") : '';
	        listHtml += "\n\t\t\t\t\t<li data-index=\"".concat(i + options.indexbase, "\">\n\t\t\t\t\t\t<a ").concat(options.clickable ? link : '').concat(dataname, "></a>\n\t\t\t\t\t\t").concat(tooltip, "\n\t\t\t\t\t</li>\n\t\t\t\t");
	      });
	      setTimeout(function () {
	        theVerticator.innerHTML = listHtml;
	        activateBullet(event);
	        theVerticator.classList.add('visible');
	      }, 200);
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

	        setTimeout(function () {
	          activateBullet(event);
	        }, 150);
	      }
	    };

	    if (theVerticator) {
	      deck.on('slidechanged', function (event) {
	        slideAppear(event);
	      });
	      deck.on('ready', function (event) {
	        slideAppear(event);
	      });

	      if (deck.getConfig().embedded) {
	        deck.on('click', function (event) {
	          clickBullet(event);
	        });
	      }
	    }
	  };

	  var init = function init(deck) {
	    var defaultOptions = {
	      darktheme: false,
	      color: 'black',
	      oppositecolor: 'white',
	      skipuncounted: false,
	      clickable: true,
	      position: 'right',
	      offset: '3vmin',
	      autogenerate: true,
	      tooltip: false,
	      scale: 1
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

	    if (options.darktheme) {
	      if (!options.hasOwnProperty('color')) {
	        defaultOptions.color = 'white';
	      }

	      if (!options.hasOwnProperty('oppositecolor')) {
	        defaultOptions.oppositecolor = 'black';
	      }
	    }

	    defaults(options, defaultOptions);
	    verticate(deck, options);
	  };

	  return {
	    id: 'verticator',
	    init: init
	  };
	};

	return Plugin;

})));
