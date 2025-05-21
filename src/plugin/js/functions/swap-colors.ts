// Basic imports
import type { Config } from "../config";
import consts from "../consts";
import type { VerticatorColors } from "../types";

export const swapColors = (
	needToSwap: boolean,
	config: Config,
	colors: VerticatorColors,
	revealElement: HTMLElement,
	theVerticator: HTMLElement
): void => {
	if (needToSwap) {
		// Use inverse theme color
		revealElement.style.setProperty(consts.themeColorVar, colors.themeinverse);

		// Set verticator color based on config
		if (config.inversecolor || config.oppositecolor) {
			theVerticator.style.setProperty(consts.vertiColorVar, colors.verticatorinverse);
		} else {
			theVerticator.style.removeProperty(consts.vertiColorVar);
		}
	} else {
		// Use regular theme color
		revealElement.style.setProperty(consts.themeColorVar, colors.themeregular);

		// Set verticator color based on config
		if (config.color) {
			theVerticator.style.setProperty(consts.vertiColorVar, colors.verticatorregular);
		} else {
			theVerticator.style.removeProperty(consts.vertiColorVar);
		}
	}
};
