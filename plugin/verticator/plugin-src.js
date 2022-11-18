const Plugin = () => {

	const lightClass = `has-light-background`;
	const darkClass = `has-dark-background`;
	const themeColorVar = `--c-theme-color`;
	const vertiColorVar = `--v-color`;
	const forceColorVar = `--v-forcecolor`;
	const activeclass = 'active';

	const loadStyle = function(url, title, callback) {
		let head = document.querySelector('head');
		let style = document.querySelector(`[title="${title}"]`);
		if (typeof(style) == 'undefined' || style == null) {
			style = document.createElement('link');
			style.rel = 'stylesheet';
			style.href = url;
			style.title=title;
		
			let finish = function () { if (typeof callback === 'function') { callback.call(); callback = null }};
			style.onload = finish;
		
			style.onreadystatechange = function () { if (this.readyState === 'loaded') { finish() }};
			head.appendChild(style);
		}
	}

	const findThemeColors = function(parent, tag) {
		const themeColors = {};
		const colorSection = document.createElement("section");
		const sectionChild = document.createElement(tag);
		parent.getElementsByClassName('slides')[0].appendChild(colorSection).appendChild(sectionChild);
		themeColors.regular = getComputedStyle(sectionChild).getPropertyValue('color');
		colorSection.classList.add(lightClass);
		themeColors.inverse = getComputedStyle(sectionChild).getPropertyValue('color');
		if (themeColors.regular == themeColors.inverse) {
			themeColors.theme = "light";
			colorSection.classList.remove(lightClass);
			colorSection.classList.add(darkClass);
			themeColors.inverse = getComputedStyle(sectionChild).getPropertyValue('color');
		} else {themeColors.theme = "dark";}
		colorSection.remove();
		return themeColors;
	}

	const swapColors = ( needToSwap, options, colors, revealElement, theVerticator) => {
		if (needToSwap) {
			revealElement.style.setProperty(themeColorVar, colors.themeinverse);
			if (options.inversecolor || options.oppositecolor) {
				theVerticator.style.setProperty(vertiColorVar, colors.verticatorinverse);
			} else {
				theVerticator.style.removeProperty(vertiColorVar);
			}
		} else {
			revealElement.style.setProperty(themeColorVar, colors.themeregular);
			if (options.color) {
				theVerticator.style.setProperty(vertiColorVar, colors.verticatorregular);
			} else {
				theVerticator.style.removeProperty(vertiColorVar);
			}
		}
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
		let tooltipScaleDamper = ( 1 / Math.sqrt(totalScale));
		theVerticator.style.setProperty('--verticator-tooltip-scale', tooltipScaleDamper.toFixed(2));

		const colors = {};
		const themeColors = findThemeColors(revealElement, options.themetag ? options.themetag : 'section');

		colors.theme = themeColors.theme;
		colors.themeregular = themeColors.regular;
		colors.themeinverse = themeColors.inverse;

		colors.verticatorregular = options.color ? options.color : themeColors.regular;
		colors.verticatorinverse = options.inversecolor ? options.inversecolor : options.oppositecolor ? options.oppositecolor : themeColors.inverse;

		if (options.debug) {
			console.log(`Theme regular color is: "${colors.themeregular}"`);
			console.log(`Theme inverse color is: "${colors.themeinverse}"`);
			if (options.color) {
				console.log(`Verticator regular color is: "${colors.verticatorregular}"`);
			}
			if (options.inversecolor || options.oppositecolor) {
				console.log(`Verticator inverse color is: "${colors.verticatorinverse}"`)
			}
		}

		revealElement.style.setProperty(themeColorVar, colors.themeregular);
		if (options.color) {
			theVerticator.style.setProperty(vertiColorVar, colors.verticatorregular);
		}

		let sectionState = {};
		sectionState.dark = revealElement.classList.contains(darkClass);
		sectionState.light = revealElement.classList.contains(lightClass);
		sectionState.rtl = revealElement.classList.contains('rtl');

		const revealElementObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				const { target } = mutation;

				if (mutation.attributeName === 'class') {

					let hasLightBg = mutation.target.classList.contains(lightClass);
					let hasDarkBg = mutation.target.classList.contains(darkClass);
					let leftAligned = mutation.target.classList.contains('rtl');

					if (sectionState.dark !== hasDarkBg || sectionState.light !== hasLightBg) {
						if (colors.theme == "dark" && sectionState.light !== hasLightBg) {
							sectionState.light = hasLightBg;
							swapColors(hasLightBg, options, colors, revealElement, theVerticator)
						}
						if (colors.theme == "light" && sectionState.dark !== hasDarkBg) {
							sectionState.dark = hasDarkBg;
							swapColors(hasDarkBg, options, colors, revealElement, theVerticator)
						}
					}
					if (options.position == "auto") {
						if (sectionState.rtl !== leftAligned) {
							sectionState.rtl = leftAligned;
							if (leftAligned) {
								theVerticator.style.left = options.offset;
								theVerticator.style.right = "auto";
								theVerticator.classList.add('left');
							} else {
								theVerticator.style.right = options.offset;
								theVerticator.style.left = "auto";
								theVerticator.classList.remove('left');
							}
						}
					}

				}
			});
		});

		revealElementObserver.observe(revealElement, {attributes: true,  attributeFilter : ['class']});

		deck.on('slidechanged', event => {
			if (event.currentSlide.dataset.verticator) {
				if (event.currentSlide.dataset.verticator == "regular") {
					theVerticator.style.setProperty(forceColorVar, colors.verticatorregular);
					if (options.debug) {
						console.log(`Verticator forced to: "${colors.verticatorregular}"`);
					}
				} else if (event.currentSlide.dataset.verticator == "inverse") {
					theVerticator.style.setProperty(forceColorVar, colors.verticatorinverse);
					if (options.debug) {
						console.log(`Verticator forced to: "${colors.verticatorinverse}"`);
					}
				} else {
					theVerticator.style.setProperty(forceColorVar, deck.getCurrentSlide().dataset.verticator);
					if (options.debug) {
						console.log(`Verticator forced to: "${deck.getCurrentSlide().dataset.verticator}"`);
					}
				}
			} else {theVerticator.style.removeProperty(forceColorVar);}
		});

		deck.on('resize', event => {
			revealScale = event.scale;
			totalScale = revealScale > 1 ? revealScale * userScale : userScale;
			theVerticator.style.setProperty('--verticator-scale', totalScale.toFixed(2));
		});

		if (options.offset != '3vmin') {
			theVerticator.style.right = options.offset;
		}

		theVerticator.style.right = options.offset;
		if (options.position !== "auto") {
			let opposite = options.position == "left" ? "right" : "left";
			theVerticator.style[options.position] = options.offset;
			theVerticator.style[opposite] = "auto";
			if (options.position == "left" && options.tooltip !== false) {
				theVerticator.classList.add('left');
			}
		}

		const selectionArray = function(container, selectors) {
			let selections = container.querySelectorAll(selectors);
			let selectionarray = Array.prototype.slice.call(selections);
			return selectionarray;
		};

		const clickBullet = function(event) {
			if ((event.target).matches('.verticator li a')) {
				let currIndexh = (deck.getIndices()).h;
				let currIndexf = (deck.getIndices()).v;
				let i = getNodeindex(event.target.parentNode);
				event.preventDefault();
				deck.slide(currIndexh, i, currIndexf);
			}
		}

		const activateBullet = function(event) {

			let listItems = selectionArray(theVerticator, 'li');

			var bestMatch = options.indexbase - 1;

			listItems.forEach(function(listItem, i) {
				if (parseInt(listItem.dataset.index) <= event.indexv + options.indexbase) {
					bestMatch = i;
				}
				listItem.classList.remove(activeclass);
			});

			if (bestMatch >= 0) {
				listItems[bestMatch].classList.add(activeclass);
			}
		};

		const ttName = function(element) {
			if (element.dataset.verticatorTooltip && (element.dataset.verticatorTooltip == "none" || element.dataset.verticatorTooltip == "false") || element.classList.contains('no-verticator-tooltip')) {
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
						return element.querySelector(slctr).textContent;
					}
				}
			} else return false
		}

		const createBullets = function(event, sections) {

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

			theVerticator.innerHTML = listHtml;
			activateBullet(event);
			setTimeout(function() {
				theVerticator.classList.add('visible');
			}, 300);

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
				activateBullet(event);
			}
		};

		if (theVerticator) {
			const eventnames = ['ready', 'slidechanged'];
			eventnames.forEach( (eventname) => deck.on( eventname, event => { slideAppear(event) } ) )

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


		let VerticatorStylePath = options.csspath.verticator ? options.csspath.verticator : options.csspath ? options.csspath : null  || `${pluginPath()}verticator.css` || 'plugin/verticator/verticator.css'

		if (options.debug) {
			console.log(`Plugin path = ${pluginPath()}`);
			console.log(`Verticator CSS path = ${VerticatorStylePath}`);
		}

		const generator = document.querySelector('[name=generator]');
		if (!(generator && generator.content.includes("quarto"))) {
			loadStyle(VerticatorStylePath, 'verticatorstyle');
		}

		verticate(deck, options);
	};

	return {
		id: 'verticator',
		init: init
	};
};

export default Plugin;