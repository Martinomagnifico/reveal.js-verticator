import consts from "./consts.js"

import { loadResource, mergeDeep, pluginPath } from "./helpers.js"

import { changeVerticatorColor } from "./functions/change-verticator-color.js";
import { clickBullet } from "./functions/click-bullet.js";
import { observeStates } from "./functions/observe-states.js";
import { setScaleAndPosition } from "./functions/scale-position.js";
import { setupColors } from "./functions/setup-colors.js";
import { slideAppear } from "./functions/slide-appear.js";

const Plugin = () => {

	let options = {};
	const colors = {};

	/**
	* The main function of the plugin
	* @param {object} deck - The deck object
	* @param {object} options - The options object
	*/
	const Verticate = function (deck, options) {

		let revealElement = deck.getRevealElement();
		let theVerticator = revealElement.querySelector('ul.verticator');

		let theCurrentSlide;

		if (!theVerticator) {
			if (!options.autogenerate) return
			let ul = document.createElement('ul');
			ul.className += "verticator";
			revealElement.insertBefore(ul, revealElement.childNodes[0]);
			theVerticator = revealElement.querySelector('ul.verticator');
		}

		if (!options.clickable) {
			theVerticator.classList.add('no-click')
		}

		setupColors(theVerticator, revealElement, colors, options);
		setScaleAndPosition(deck, theVerticator, options);
		observeStates(theVerticator, deck, colors, options);

		deck.on('slidechanged', event => changeVerticatorColor(event, theVerticator, deck, colors, options));

		consts.eventNames.forEach((eventname) =>
			deck.on(eventname, event => {
				if (event.currentSlide !== theCurrentSlide) {
					slideAppear(event, deck, theVerticator, options);
					theCurrentSlide = event.currentSlide;
				}
			})
		)

		/**
		* A resize may change the deck state while in scroll view, 
		* so the Verticator element needs to recalculate its position and state
		*/
		let resizeTimer;
		deck.on("resize", event => {
			theVerticator.classList.add('resizing');
			if (resizeTimer) {
				clearTimeout(resizeTimer);
			}
			resizeTimer = setTimeout(() => {

				if (deck.getCurrentSlide() !== theCurrentSlide) {
					slideAppear(event, deck, theVerticator, options);
				}

				theVerticator.classList.remove('resizing');
				resizeTimer = null;
			}, 500);
		});

		if ((deck.getConfig()).embedded) {
			deck.on('click', event => {
				clickBullet(event, deck)
			});
		}
	};

	/**
	* Initialize the plugin
	* @param {object} deck - The deck object
	*/
	const init = function (deck) {

		let defaultOptions = {
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

		options = mergeDeep(defaultOptions, deck.getConfig().verticator || {});
		options.indexbase = deck.getConfig().hashOneBasedIndex ? 1 : 0;

		let VerticatorStylePath = options.csspath.verticator ? options.csspath.verticator : options.csspath ? options.csspath : null || `${pluginPath()}verticator.css` || 'plugin/verticator/verticator.css'

		if (options.debug) {
			console.log(`Plugin path = ${pluginPath()}`);
			console.log(`Verticator CSS path = ${VerticatorStylePath}`);
		}

		const generator = document.querySelector('[name=generator]');
		if (!(generator && generator.content.includes("quarto"))) {
			loadResource(VerticatorStylePath, 'stylesheet');
		}

		Verticate(deck, options);

	};

	return {
		id: 'verticator',
		init: init
	};
};

export default Plugin;