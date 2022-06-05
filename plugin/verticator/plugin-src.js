const Plugin = () => {

	const loadStyle = function(url, type, callback) {
		let head = document.querySelector('head');
		let style;
		style = document.createElement('link');
		style.rel = 'stylesheet';
		style.href = url;

		let finish = function () {
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

	const verticate = function(deck, options) {

		let userScale = options.scale;
		userScale = (userScale > 2) ? 2 : (userScale < 0.5) ? 0.5 : userScale;

		let revealElement = deck.getRevealElement();

		let theVerticator = revealElement.querySelector('ul.verticator');

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

		let revealScale = deck.getScale();
		let totalScale = revealScale > 1 ? revealScale * userScale : userScale;
		theVerticator.style.setProperty('--verticator-scale', totalScale.toFixed(2));

		deck.on('resize', event => {
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
			options.position = 'right'
		}

		let activeclass = 'active';

		const selectionArray = function(container, selectors) {
			let selections = container.querySelectorAll(selectors);
			let selectionarray = Array.prototype.slice.call(selections);
			return selectionarray;
		};

		const clickBullet = function(event) {
			if ((event.target)
				.matches('.verticator li a')) {
				let currIndexh = (deck.getIndices())
					.h;
				let currIndexf = (deck.getIndices())
					.v;
				let i = getNodeindex(event.target.parentNode);
				event.preventDefault();
				deck.slide(currIndexh, i, currIndexf);
			}
		}

		const activateBullet = function(event) {

			let listItems = selectionArray(theVerticator, 'li');

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

			listItems.forEach(function(listItem, i) {
				if (parseInt(listItem.getAttribute("data-index")) <= event.indexv + options.indexbase) {
					bestMatch = i;
				}

				listItem.classList.remove(activeclass);
			});

			if (bestMatch >= 0) {
				listItems[bestMatch].classList.add(activeclass);
			}

		};

		const ttName = function(element) {
			if (element.getAttribute("data-verticator-tooltip") && (element.getAttribute("data-verticator-tooltip") == "none" || element.getAttribute("data-verticator-tooltip") == "false") || element.classList.contains('no-verticator-tooltip')) {
				return
			} else if (options.tooltip != "auto" && element.getAttribute(`${options.tooltip}`)) {
				return element.getAttribute(`${options.tooltip}`)
			} else if (options.tooltip == "auto") {
				for (const attr of ["data-verticator-tooltip", "data-name", "title"]) {
					if (element.getAttribute(attr)) {
						return element.getAttribute(attr);
					}
				}
				for (const slctr of ["h1", "h2", "h3", "h4"]) {
					if (element.querySelector(slctr)) {
						return element.querySelector(slctr)
							.textContent;
					}
				}
			} else return false
		}

		const createBullets = function(event, sections) {

			theVerticator.style.color = options.color;
			theVerticator.classList.remove('visible');
			let listHtml = '';

			sections.forEach(function(section) {
				let i = section[0];
				let tooltipname = section[1];
				let link = `href="#/${event.indexh + options.indexbase}/${i + options.indexbase}"`
				let dataname = tooltipname ? `data-name="${tooltipname}"` : '';
				let tooltip = tooltipname ? `<div class="tooltip"><span>${tooltipname}</span></div>` : '';
				listHtml += `<li data-index="${i + options.indexbase}"><a ${options.clickable ? link : ''}${dataname}></a>${tooltip}</li>`;
			});

			setTimeout(function() {
				theVerticator.innerHTML = listHtml;
				activateBullet(event);
				theVerticator.classList.add('visible');
			}, 200);
		}

		const slideAppear = function(event) {

			let slide = event.currentSlide;
			let parent = slide.parentNode;

			let sections = Array.from(parent.children)
				.map(function(elem, index) {
					return [index, elem];
				})
				.filter(function(indexedElem) {
					let issection = indexedElem[1].tagName == 'SECTION' && indexedElem[1].parentNode.tagName == 'SECTION';
					let isuncounted = options.skipuncounted && indexedElem[1].getAttribute('data-visibility') == 'uncounted';
					return issection && !isuncounted;
				})
				.map(function(indexedElem) {
					let ttname = '';
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
					let lastParent = event.previousSlide.parentNode;

					if (parent != lastParent) {
						createBullets(event, sections);
					}
				} else {
					createBullets(event, sections);
				}

				setTimeout(function() {
					activateBullet(event);
				}, 150);
			}
		};

		if (theVerticator) {
			deck.on('slidechanged', event => {
				slideAppear(event)
			});
			deck.on('ready', event => {
				slideAppear(event)
			});
			if ((deck.getConfig())
				.embedded) {
				deck.on('click', event => {
					clickBullet(event)
				});
			}
		}

	};

	const init = function(deck) {

		let es5Filename = "verticator.js"

		let defaultOptions = {
			darktheme: false,
			color: 'black',
			oppositecolor: 'white',
			skipuncounted: false,
			clickable: true,
			position: 'right',
			offset: '3vmin',
			autogenerate: true,
			tooltip: false,
			scale: 1,
			csspath: {
				verticator: '',
				tooltip: ''
			},
			debug: false
		};

		const defaults = function(options, defaultOptions) {
			for (let i in defaultOptions) {
				if (!options.hasOwnProperty(i)) {
					options[i] = defaultOptions[i];
				}
			}
		}

		let options = deck.getConfig()
			.verticator || {};

		options.indexbase = deck.getConfig()
			.hashOneBasedIndex ? 1 : 0;

		if (options.darktheme) {
			if (!options.hasOwnProperty('color')) {
				defaultOptions.color = 'white';
			}
			if (!options.hasOwnProperty('oppositecolor')) {
				defaultOptions.oppositecolor = 'black';
			}
		}

		defaults(options, defaultOptions);

		function pluginPath() {
			let path;
			let pluginScript = document.querySelector(`script[src$="${es5Filename}"]`);
			if (pluginScript) {
				path = pluginScript.getAttribute("src").slice(0, -1 * (es5Filename.length));
			} else {
				path = import.meta.url.slice(0, import.meta.url.lastIndexOf('/') + 1);
			}
			return path;
		}

		let VerticatorStylePath = options.csspath.verticator ? options.csspath.verticator : null || `${pluginPath()}verticator.css` || 'plugin/verticator/verticator.css'
		let TooltipStylePath = options.csspath.tooltip ? options.csspath.tooltip : null  || `${pluginPath()}tooltip.css`  || 'plugin/verticator/tooltip.css'

		if (options.debug) {
			console.log(`Plugin path = ${pluginPath()}`);
			console.log(`Verticator CSS path = ${VerticatorStylePath}`);
			console.log(`Tooltip CSS path = ${TooltipStylePath}`);
		}

		loadStyle(VerticatorStylePath, 'stylesheet', function () {
			if (options.tooltip) {
				loadStyle(TooltipStylePath, 'stylesheet');
			}
		});

		verticate(deck, options);
	};

	return {
		id: 'verticator',
		init: init
	};
};

export default Plugin;