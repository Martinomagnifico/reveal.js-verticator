// Basic imports
import consts from "../consts";
import type { RevealSlideEvent, VerticatorColors } from "../types";

/**
 * Honour a `data-verticator` on the slide or on the stack it sits in.
 *
 * Everything else about the colour is handled in the stylesheet, which follows
 * `--c-theme-color`. This is only the deliberate override, so it sets
 * `--v-forcecolor` and removes it again the moment a slide does not ask for one.
 *
 * @param event - Reveal.js slide event
 * @param theVerticator - The verticator element
 * @param colors - The two colours Verticator can take
 */
export const changeVerticatorColor = (
	event: RevealSlideEvent,
	theVerticator: HTMLElement,
	colors: VerticatorColors
): void => {
	const parentNode = event.currentSlide.parentNode as HTMLElement;
	const asked = event.currentSlide.dataset.verticator ?? parentNode.dataset.verticator;

	if (!asked) {
		theVerticator.style.removeProperty(consts.forceColorVar);
		return;
	}

	// "regular" and "inverse" name the two colours worked out at startup; anything
	// else is taken as a colour of its own.
	const forced =
		asked === "regular" ? colors.regular : asked === "inverse" ? colors.inverse : asked;

	theVerticator.style.setProperty(consts.forceColorVar, forced);
};
