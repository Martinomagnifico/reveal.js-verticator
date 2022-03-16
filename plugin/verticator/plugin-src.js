const Plugin = () => {

	// Scope support polyfill
	try { document.querySelector(":scope *") } catch (t) { ! function(t) { let e = /:scope(?![\w-])/gi, r = u(t.querySelector); t.querySelector = function(t) { return r.apply(this, arguments) }; let c = u(t.querySelectorAll); if (t.querySelectorAll = function(t) { return c.apply(this, arguments) }, t.matches) { let n = u(t.matches); t.matches = function(t) { return n.apply(this, arguments) } } if (t.closest) { let o = u(t.closest); t.closest = function(t) { return o.apply(this, arguments) } } function u(t) { return function(r) { if (r && e.test(r)) { let c = "q" + Math.floor(9e6 * Math.random()) + 1e6; arguments[0] = r.replace(e, "[" + c + "]"), this.setAttribute(c, ""); let n = t.apply(this, arguments); return this.removeAttribute(c), n } return t.apply(this, arguments) } } }(Element.prototype) }

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
				listHtml += `
					<li data-index="${i + options.indexbase}">
						<a ${options.clickable ? link : ''}${dataname}></a>
						${tooltip}
					</li>
				`;
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
			scale: 1
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
		verticate(deck, options);

	};

	return {
		id: 'verticator',
		init: init
	};
};

export default Plugin;