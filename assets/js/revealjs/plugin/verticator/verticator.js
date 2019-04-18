/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Verticator.js for Reveal.js 1.0.0
 *
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js
 ******************************************************************/


const Verticator = window.Verticator || (function () {

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

	const activateBullet = function (event) {
		let listItems = selectionArray(TheVerticator, 'li');
		listItems.filter((listItem, i) => {
			if ( i == event.indexv) {
				listItem.classList.add('active');
			} else {
				listItem.classList.remove('active');
			}
		});
	}

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
		let sectionCount = Array.from( parent.children ).filter( elem => elem.tagName == 'SECTION' ).length;
		
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