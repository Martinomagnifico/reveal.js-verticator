const Plugin = () => {

	// Scope support polyfill
	try {
		document.querySelector(":scope *")
	} catch (t) {
		! function (t) {
			let e = /:scope(?![\w-])/gi,
				r = u(t.querySelector);
			t.querySelector = function (t) {
				return r.apply(this, arguments)
			};
			let c = u(t.querySelectorAll);
			if (t.querySelectorAll = function (t) {
					return c.apply(this, arguments)
				}, t.matches) {
				let n = u(t.matches);
				t.matches = function (t) {
					return n.apply(this, arguments)
				}
			}
			if (t.closest) {
				let o = u(t.closest);
				t.closest = function (t) {
					return o.apply(this, arguments)
				}
			}

			function u(t) {
				return function (r) {
					if (r && e.test(r)) {
						let c = "q" + Math.floor(9e6 * Math.random()) + 1e6;
						arguments[0] = r.replace(e, "[" + c + "]"), this.setAttribute(c, "");
						let n = t.apply(this, arguments);
						return this.removeAttribute(c), n
					}
					return t.apply(this, arguments)
				}
			}
		}(Element.prototype)
	}


	const getNodeindex = function (elm) {
		var c = elm.parentNode.children,
			i = 0;
		for (; i < c.length; i++)
			if (c[i] == elm) return i;
	}

	const verticate = function (deck, options) {

		let revealElement = deck.getRevealElement();

		let theVerticator = revealElement.querySelector('ul.verticator');

		if (!theVerticator) {
			let ul = document.createElement('ul');
			ul.className += "verticator";
			revealElement.insertBefore(ul, revealElement.childNodes[0]); 
			theVerticator = revealElement.querySelector('ul.verticator');
		}

		if (options.offset != '3vmin') {
			theVerticator.style.left = options.offset;
		}
		if (options.position == 'left') {
			theVerticator.style.right = 'auto';
			theVerticator.style.left = options.offset;
		}
		if (options.position != 'left' && options.position != 'right') {
			options.position = 'right'
		}

		let activeclass = 'active';


		const selectionArray = function (container, selectors) {
			let selections = container.querySelectorAll(selectors);
			let selectionarray = Array.prototype.slice.call(selections);
			return selectionarray;
		};

		const clickBullet = function (event) {
			if ((event.target).matches('.verticator li a')) {
				let currIndexh = (deck.getIndices()).h;
				let currIndexf = (deck.getIndices()).v;
				let i = getNodeindex(event.target.parentNode);
				event.preventDefault();
				deck.slide(currIndexh, i, currIndexf);
			}
		}

		const activateBullet = function (event) {

			let listItems = selectionArray(theVerticator, 'li');
			let bullets = selectionArray(theVerticator, 'li a')

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

		const createBullets = function (event, sections) {
			theVerticator.classList.remove('visible');
			
			theVerticator.style.color = options.color;

			let listHtml = '';



			sections.forEach(function (i) {
				var link = ' href="#/' + (event.indexh + options.indexbase) + "/" + (i + options.indexbase) + '"';
				listHtml += '<li data-index="' + (i + options.indexbase) + '"><a ' +
					(options.clickable ? link : '') + '></li>';
			});

			setTimeout(function () {
				theVerticator.innerHTML = listHtml;
				activateBullet(event);
				theVerticator.classList.add('visible');
			}, 200);
		}


		const slideAppear = function (event) {

			let slide = event.currentSlide;
			let parent = slide.parentNode;



			let sections = Array.from(parent.children)
				.map(function (elem, index) {
					return [index, elem];
				})
				.filter(function (indexedElem) {
					return indexedElem[1].tagName == 'SECTION' &&
						(!options.skipuncounted ||
							indexedElem[1].getAttribute('data-visibility') !== 'uncounted')
				})
				.map(function (indexedElem) {
					return indexedElem[0];
				});

			if (!parent.classList.contains('stack')) {
				theVerticator.classList.remove('visible');
				theVerticator.innerHTML = '';
			} else if (sections.length > 1) {
				if (event.previousSlide) {
					let lastParent = event.previousSlide.parentNode;

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
			deck.on('slidechanged', event => {
				slideAppear(event)
			});
			deck.on('ready', event => {
				slideAppear(event)
			});
			if ((deck.getConfig()).embedded) {
				deck.on('click', event => {
					clickBullet(event)
				});
			}
		}

	};

	const init = function (deck) {

		let defaultOptions = {
			darktheme: false,
			color: 'black',
			oppositecolor: 'white',
			skipuncounted: false,
			clickable: true,
			position: 'right',
			offset: '3vmin'
		};


		const defaults = function (options, defaultOptions) {
			for (let i in defaultOptions) {
				if (!options.hasOwnProperty(i)) {
					options[i] = defaultOptions[i];
				}
			}
		}

		let options = deck.getConfig().verticator || {};

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

export default Plugin;