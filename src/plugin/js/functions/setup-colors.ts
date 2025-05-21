// Basic imports
import type { Config } from "../config";
import consts from "../consts";
import type { VerticatorColors } from "../types";

// Helper imports
import { pluginDebug as debug } from "reveal.js-plugintoolkit";

// Function imports
import { findThemeColors } from "./find-theme-colors";

export const setupColors = (
	theVerticator: HTMLElement,
	revealElement: HTMLElement,
	config: Config
): VerticatorColors => {
	const colors: VerticatorColors = {
		theme: "",
		themeregular: "",
		themeinverse: "",
		verticatorregular: "",
		verticatorinverse: "",
	};

	// Find theme colors
	const themeColors = findThemeColors(
		revealElement,
		config.themetag ? config.themetag : "section"
	);

	// Fill in colors object
	colors.theme = themeColors.theme;
	colors.themeregular = themeColors.regular;
	colors.themeinverse = themeColors.inverse;

	// Set verticator colors - from config or from theme
	colors.verticatorregular = config.color ? config.color : themeColors.regular;

	// Handle the legacy 'oppositecolor' property as a fallback
	colors.verticatorinverse = config.inversecolor
		? config.inversecolor
		: config.oppositecolor
			? config.oppositecolor
			: themeColors.inverse;

	debug.log(`Theme regular color is: "${colors.themeregular}"`);
	debug.log(`Theme inverse color is: "${colors.themeinverse}"`);

	if (config.color) {
		debug.log(`Verticator regular color is: "${colors.verticatorregular}"`);
	}
	if (config.inversecolor || config.oppositecolor) {
		debug.log(`Verticator inverse color is: "${colors.verticatorinverse}"`);
	}

	if (config.color) {
		theVerticator.style.setProperty(consts.vertiColorVar, colors.verticatorregular);
	}

	return colors;
};
