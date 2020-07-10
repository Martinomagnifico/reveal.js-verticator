
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Verticator.js for Reveal.js 
 * Version 1.0.7
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

	  var getNodeindex = function getNodeindex(elm) {
	    var c = elm.parentNode.children,
	        i = 0;

	    for (; i < c.length; i++) {
	      if (c[i] == elm) return i;
	    }
	  };

	  var verticate = function verticate(deck, options) {
	    var revealElement = deck.getRevealElement();
	    var theVerticator = revealElement.querySelector('ul.verticator');

	    if (!theVerticator) {
	      var ul = document.createElement('ul');
	      ul.className += "verticator";
	      revealElement.insertBefore(ul, revealElement.childNodes[0]);
	      theVerticator = revealElement.querySelector('ul.verticator');
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
	      if (revealElement.classList.contains('has-dark-background')) {
	        theVerticator.style.color = options.oppositecolor;
	      } else {
	        theVerticator.style.color = options.color;
	      }

	      if (options.darktheme) {
	        if (revealElement.classList.contains('has-light-background')) {
	          theVerticator.style.color = options.oppositecolor;
	        } else {
	          theVerticator.style.color = options.color;
	        }
	      }

	      var listItems = selectionArray(theVerticator, 'li');
	      var bestMatch = -1;
	      listItems.forEach(function (listItem, i) {
	        if (parseInt(listItem.getAttribute("data-index")) <= event.indexv) {
	          bestMatch = i;
	        }

	        listItem.classList.remove(activeclass);
	      });

	      if (bestMatch >= 0) {
	        listItems[bestMatch].classList.add(activeclass);
	      }
	    };

	    var createBullets = function createBullets(event, sections) {
	      theVerticator.classList.remove('visible');
	      theVerticator.style.color = options.color;
	      var listHtml = '';
	      sections.forEach(function (i) {
	        var link = ' href="#/' + event.indexh + "/" + i + '"';
	        listHtml += '<li data-index="' + i + '"><a ' + (options.clickable ? link : '') + '></li>';
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
	        return indexedElem[1].tagName == 'SECTION' && (!options.skipuncounted || indexedElem[1].getAttribute('data-visibility') !== 'uncounted');
	      }).map(function (indexedElem) {
	        return indexedElem[0];
	      });

	      if (!parent.classList.contains('stack')) {
	        theVerticator.classList.remove('visible');
	      } else if (sections.length > 1) {
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
	      clickable: true
	    };

	    var defaults = function defaults(options, defaultOptions) {
	      for (var i in defaultOptions) {
	        if (!options.hasOwnProperty(i)) {
	          options[i] = defaultOptions[i];
	        }
	      }
	    };

	    var options = deck.getConfig().verticator || {};

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
