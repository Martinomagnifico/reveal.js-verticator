"use strict";

/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Verticator.js for Reveal.js 1.0.1
 *
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js
 ******************************************************************/

const Verticator = window.Verticator || (function () {
	
	// Polyfill for old browsers
	Array.from||(Array.from=function(){var r=Object.prototype.toString,n=function(n){return"function"==typeof n||"[object Function]"===r.call(n)},t=Math.pow(2,53)-1,e=function(r){var n=function(r){var n=Number(r);return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n}(r);return Math.min(Math.max(n,0),t)};return function(r){var t=Object(r);if(null==r)throw new TypeError("Array.from requires an array-like object - not null or undefined");var o,a=arguments.length>1?arguments[1]:void 0;if(void 0!==a){if(!n(a))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(o=arguments[2])}for(var i,u=e(t.length),f=n(this)?Object(new this(u)):new Array(u),c=0;c<u;)i=t[c],f[c]=a?void 0===o?a(i,c):a.call(o,i,c):i,c+=1;return f.length=u,f}}());

	let options = Reveal.getConfig().verticator || {};
	
	let defaultOptions = {
		color: 'white'
	};
	
	const TheVerticator = document.querySelector('ul.verticator');

	const defaults = function (options, defaultOptions) {
		for (var i in defaultOptions) {
			if (!options.hasOwnProperty(i)) {
				options[i] = defaultOptions[i];
			}
		} 
	}
	
	const selectionArray = function (container, selectors) {
		let selections = container.querySelectorAll(selectors);
		let selectionarray = Array.prototype.slice.call(selections);
		return selectionarray
	};

	const activateBullet = function activateBullet(event) {
		let listItems = selectionArray(TheVerticator, 'li');
		listItems.filter(function (listItem, i) {
			if (i == event.indexv) {
				listItem.classList.add('active');
			} else {
				listItem.classList.remove('active');
			}
		});
	};

	const createBullets = function (event, sectionCount) {
		TheVerticator.classList.remove('visible');
		let listHtml = '';
			
		for (var i = 0; i < sectionCount; i++) {
			let link = event.indexh + "/" + i;
			listHtml += '<li><a style="color:' + options.color + '" href="#/' + link + '"></a></li>';
		}
		
		setTimeout((function () {
			TheVerticator.innerHTML = listHtml;
			activateBullet(event);
			TheVerticator.classList.add('visible');
		}), 200);
	}
	
	const slideAppear = function (event) {
		
		let parent = event.currentSlide.parentNode;
		let sectionCount = Array.from(parent.children).filter(function (elem) {
			return elem.tagName == 'SECTION';
		}).length;
		
		if (parent.classList.contains('stack') && sectionCount > 1 ) {
			if (event.previousSlide) {
				let lastParent = event.previousSlide.parentNode;
				if (parent != lastParent) {
					createBullets(event, sectionCount)
				}
			} else {
				createBullets(event, sectionCount)
			}
		} else {
			TheVerticator.classList.remove('visible');
		}
		setTimeout((function () {
			activateBullet(event);
		}), 150);

	};

	const init = function () {
		defaults(options, defaultOptions);
		Reveal.addEventListener('slidechanged', slideAppear, false);
	};

	return {
		init: init
	};

})();

Reveal.registerPlugin('verticator', Verticator);
/* global Reveal */