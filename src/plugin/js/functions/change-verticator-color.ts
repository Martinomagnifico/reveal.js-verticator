// Basic imports
import type { Api } from "reveal.js";
import type { Config } from "../config";
import consts from "../consts";
import type { RevealSlideEvent, VerticatorColors } from "../types";

/**
 * Change the verticator color based on current slide attributes
 * @param event - Reveal.js slide event
 * @param theVerticator - The verticator element
 * @param deck - Reveal.js API
 * @param colors - Verticator colors object
 * @param config - Plugin configuration
 */
export const changeVerticatorColor = (
	event: RevealSlideEvent,
	theVerticator: HTMLElement,
	deck: Api,
	colors: VerticatorColors,
	config: Config
): void => {
	// Get reveal element
	const revealElement = deck.getRevealElement() as HTMLElement;
	const parentNode = event.currentSlide.parentNode as HTMLElement;

	// Check if the slide is in a stack
	if (parentNode.classList.contains("stack")) {
		// Handle light background stack
		if (parentNode.classList.contains(consts.lightClass)) {
			revealElement.classList.add("lightstack");
		} else {
			revealElement.classList.remove("lightstack");
		}

		// Handle dark background stack
		if (parentNode.classList.contains(consts.darkClass)) {
			revealElement.classList.add("darkstack");
		} else {
			revealElement.classList.remove("darkstack");
		}
	}

	// Check if the current slide or its parent has a specific verticator color setting
	const slideVerticator = event.currentSlide.dataset.verticator;
	const parentVerticator = parentNode.dataset.verticator;

	if (slideVerticator || parentVerticator) {
		// Handle "regular" color
		if (slideVerticator === "regular" || parentVerticator === "regular") {
			theVerticator.style.setProperty(consts.forceColorVar, colors.verticatorregular);

			if (config.debug) {
				console.log(`Verticator forced to: "${colors.verticatorregular}"`);
			}
		}
		// Handle "inverse" color
		else if (slideVerticator === "inverse" || parentVerticator === "inverse") {
			theVerticator.style.setProperty(consts.forceColorVar, colors.verticatorinverse);

			if (config.debug) {
				console.log(`Verticator forced to: "${colors.verticatorinverse}"`);
			}
		}
		// Handle custom color
		else {
			// Get the verticator color from slide or parent data attribute
			const customColor = slideVerticator ?? parentVerticator ?? "";
			theVerticator.style.setProperty(consts.forceColorVar, customColor);

			if (config.debug) {
				console.log(`Verticator forced to: "${customColor}"`);
			}
		}
	}
	// No specific color setting, remove any forced color
	else {
		theVerticator.style.removeProperty(consts.forceColorVar);
	}
};
