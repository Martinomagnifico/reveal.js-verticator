// Helper imports
import { pluginDebug as debug, type ThemeColors } from "reveal.js-plugintoolkit";
import type { Config } from "../config";
import consts from "../consts";
import type { VerticatorColors } from "../types";

/** A theme gives headings a colour of their own, and the toolkit measures both, so `themetag` now picks one of the two rather than naming an element to read. */
const isHeadingTag = (tag: string): boolean => /^h[1-6]$/i.test(tag.trim());

/**
 * Work out the two colours Verticator can be, and put them on the element.
 *
 * Neither is needed for the ordinary case: the stylesheet falls back to
 * `--c-theme-color`, which the toolkit keeps matched to the slide on screen. These
 * are for a deck that sets `color` or `inversecolor`, and for the values that
 * `data-verticator="regular"` and `data-verticator="inverse"` force.
 */
export const setupColors = (
	theVerticator: HTMLElement,
	themeColors: ThemeColors | null,
	config: Config
): VerticatorColors => {
	const pair =
		themeColors && isHeadingTag(config.themetag) ? themeColors.heading : themeColors?.text;

	const colors: VerticatorColors = {
		regular: config.color || pair?.regular || "",
		// `oppositecolor` is the old name for `inversecolor`.
		inverse: config.inversecolor || config.oppositecolor || pair?.inverse || "",
	};

	debug.log(`Verticator regular color is: "${colors.regular}"`);
	debug.log(`Verticator inverse color is: "${colors.inverse}"`);

	// Only what the deck asked for is written. Anything left out falls through to
	// the theme colour in the stylesheet.
	if (config.color) {
		theVerticator.style.setProperty(consts.vertiColorVar, config.color);
	}
	if (config.inversecolor || config.oppositecolor) {
		theVerticator.style.setProperty(
			consts.vertiInverseColorVar,
			config.inversecolor || (config.oppositecolor as string)
		);
	}

	return colors;
};
