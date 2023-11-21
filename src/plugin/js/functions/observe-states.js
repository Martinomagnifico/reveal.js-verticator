import consts from '../consts';
import { swapColors } from "./swap-colors.js";

export const observeStates = (theVerticator, deck, colors, options) => {

	let revealElement = deck.getRevealElement();
	let revealViewport = deck.getViewportElement();

	let sectionState = {};
	sectionState.dark = revealElement.classList.contains(consts.darkClass);
	sectionState.light = revealElement.classList.contains(consts.lightClass);
	sectionState.darkParent = revealElement.classList.contains("darkstack");
	sectionState.lightParent = revealElement.classList.contains("lightstack");

	// We use an observer here, because the color-check function from the main Reveal.js does not immediately apply the classes.
	const elementObserver = new MutationObserver( mutations => {
		mutations.forEach( mutation => {
			const { target } = mutation;

			if (mutation.attributeName === 'class') {

				const bgMutation = (theClass) => { return mutation.target.classList.contains(theClass)}

				let hasLightBg = bgMutation(consts.lightClass);
				let hasDarkBg = bgMutation(consts.darkClass);
				let hasLightParent = bgMutation("lightstack");
				let hasDarkParent = bgMutation("darkstack");

				// Check if there is a change in slide BG's
				if (hasLightBg || hasDarkBg) {
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
				} else if (hasLightParent || hasDarkParent) {

					if (sectionState.dark !== hasDarkParent || sectionState.light !== hasLightParent) {
						if (colors.theme == "dark" && sectionState.light !== hasLightParent) {
							sectionState.light = hasLightParent;
							swapColors(hasLightParent, options, colors, revealElement, theVerticator)
						}
						if (colors.theme == "light" && sectionState.dark !== hasDarkParent) {
							sectionState.dark = hasDarkParent;
							swapColors(hasDarkParent, options, colors, revealElement, theVerticator)
						}
					}
				} else {
					sectionState.dark = false;
					sectionState.light = false;
					swapColors(false, options, colors, revealElement, theVerticator)
				}
			}
		});
	});

	const setObserver = () => {
		if (revealViewport.classList.contains("reveal-scroll")) {
			elementObserver.observe(revealViewport, {attributes: true,  attributeFilter : ['class']});
		} else {
			elementObserver.observe(revealElement, {attributes: true,  attributeFilter : ['class']});
		}
	}

	setObserver();

};