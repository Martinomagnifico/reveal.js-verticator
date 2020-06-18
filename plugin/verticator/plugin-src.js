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

		const createBullets = function (event, sections) {
			theVerticator.classList.remove('visible');
			let listHtml = '';

			sections.forEach(function (i) {
				var link = ' href="#/' + event.indexh + "/" + i + '"';
				listHtml += '<li data-index="' + i + '"><a ' +
					(options.clickable ? link : '') + '></li>';
			});

			setTimeout(function () {
				theVerticator.innerHTML = listHtml;
				activateBullet(event);
				theVerticator.classList.add('visible');
			}, 200);
		}

		const createStyle = function () {

			let oppositeSlide = options.darktheme ? 'light' : 'dark';
			let parentStyle = options.darktheme ? '.dark-theme' : '';

			if (options.darktheme) {
				revealElement.classList.add('dark-theme');
			}

			if (options.color || options.oppositecolor) {

				let styleCss = '';

				if (options.color) {
					let colorStyle = parentStyle + ' ul.verticator li a:after { background-color: ' + options.color + '; }'
					styleCss += colorStyle;

					if (!options.darktheme) {
						let samecolorStyle = '.has-light-background ul.verticator li a:after { background-color: ' + options.color + '; }'
						styleCss += samecolorStyle;
					}
				}

				if (options.oppositecolor) {
					let oppositecolorStyle = parentStyle + '.has-' + oppositeSlide + '-background ul.verticator li a:after { background-color: ' + options.oppositecolor + '; }'
					styleCss += oppositecolorStyle;
				}

				if (styleCss.length) {
					let style = document.createElement('style');
					style.textContent = styleCss;
					document.head.appendChild(style);
				}
			}
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
			createStyle();
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
			color: '',
			oppositecolor: '',
			skipuncounted: false,
			clickable: true
		};

		const defaults = function (options, defaultOptions) {
			for (let i in defaultOptions) {
				if (!options.hasOwnProperty(i)) {
					options[i] = defaultOptions[i];
				}
			}
		}

		let options = deck.getConfig().verticator || {};
		defaults(options, defaultOptions);

		verticate(deck, options);

	};

	return {
		id: 'verticator',
		init: init
	};
};

export default Plugin;