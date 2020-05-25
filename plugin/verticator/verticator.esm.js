
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Verticator.js for Reveal.js 
 * Version 1.0.2
 * 
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js 
 ******************************************************************/


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
    var revealElement = deck.getRevealElement();
    var theVerticator = revealElement.querySelector('.verticator');
    var activeclass = 'active';

    var selectionArray = function selectionArray(container, selectors) {
      var selections = container.querySelectorAll(selectors);
      var selectionarray = Array.prototype.slice.call(selections);
      return selectionarray;
    };

    var activateBullet = function activateBullet(event) {
      var listItems = selectionArray(theVerticator, 'li');
      listItems.filter(function (listItem, i) {
        if (i == event.indexv) {
          listItem.classList.add(activeclass);
        } else {
          listItem.classList.remove(activeclass);
        }
      });
    };

    var createBullets = function createBullets(event, sectionCount) {
      theVerticator.classList.remove('visible');
      var listHtml = '';

      for (var i = 0; i < sectionCount; i++) {
        var link = event.indexh + "/" + i;
        listHtml += '<li><a href="#/' + link + '"></li>';
      }

      setTimeout(function () {
        theVerticator.innerHTML = listHtml;
        activateBullet(event);
        theVerticator.classList.add('visible');
      }, 200);
    };

    var createStyle = function createStyle() {
      var oppositeSlide = options.darktheme ? 'light' : 'dark';
      var parentStyle = options.darktheme ? '.dark-theme' : '';

      if (options.darktheme) {
        revealElement.classList.add('dark-theme');
      }

      if (options.color || options.oppositecolor) {
        var styleCss = '';

        if (options.color) {
          var colorStyle = parentStyle + ' ul.verticator li a:after { background-color: ' + options.color + '; }';
          styleCss += colorStyle;

          if (!options.darktheme) {
            var samecolorStyle = '.has-light-background ul.verticator li a:after { background-color: ' + options.color + '; }';
            styleCss += samecolorStyle;
          }
        }

        if (options.oppositecolor) {
          var oppositecolorStyle = parentStyle + '.has-' + oppositeSlide + '-background ul.verticator li a:after { background-color: ' + options.oppositecolor + '; }';
          styleCss += oppositecolorStyle;
        }

        if (styleCss.length) {
          var style = document.createElement('style');
          style.textContent = styleCss;
          document.head.appendChild(style);
        }
      }
    };

    var slideAppear = function slideAppear(event) {
      var slide = event.currentSlide;
      var parent = slide.parentNode;
      var sectionCount = Array.from(parent.children).filter(function (elem) {
        return elem.tagName == 'SECTION';
      }).length;

      if (!parent.classList.contains('stack')) {
        theVerticator.classList.remove('visible');
      } else if (sectionCount > 1) {
        if (event.previousSlide) {
          var lastParent = event.previousSlide.parentNode;

          if (parent != lastParent) {
            createBullets(event, sectionCount);
          }
        } else {
          createBullets(event, sectionCount);
        }

        setTimeout(function () {
          activateBullet(event);
        }, 150);
      }
    };

    if (theVerticator) {
      createStyle();
      deck.on('slidechanged', function (event) {
        slideAppear(event);
      });
      deck.on('ready', function (event) {
        slideAppear(event);
      });
    }
  };

  var init = function init(deck) {
    var defaultOptions = {
      darktheme: false,
      color: '',
      oppositecolor: ''
    };

    var defaults = function defaults(options, defaultOptions) {
      for (var i in defaultOptions) {
        if (!options.hasOwnProperty(i)) {
          options[i] = defaultOptions[i];
        }
      }
    };

    var options = deck.getConfig().verticator || {};
    defaults(options, defaultOptions);
    verticate(deck, options);
  };

  return {
    id: 'verticator',
    init: init
  };
};

export default Plugin;
