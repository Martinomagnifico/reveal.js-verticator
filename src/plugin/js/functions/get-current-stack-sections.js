export const getCurrentStackSections = (slide, options) => {

	const ttName = (element) => {
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
	return sections
}