// Basic imports
import type { ThemeColors } from "../types";
import consts from "../consts";

export const findThemeColors = (parent: HTMLElement, tag: string): ThemeColors => {
	const themeColors: ThemeColors = {
		theme: "",
		regular: "",
		inverse: "",
	};

	// Create a temporary section for testing colors
	const colorSection = document.createElement("section");
	const sectionChild = document.createElement(tag);

	// Find the slides container and append our test section
	const slidesContainer = parent.getElementsByClassName("slides")[0] as HTMLElement;
	slidesContainer.appendChild(colorSection).appendChild(sectionChild);

	// Get the regular color
	themeColors.regular = getComputedStyle(sectionChild).getPropertyValue("color");

	// Test with light background
	colorSection.classList.add(consts.lightClass);
	themeColors.inverse = getComputedStyle(sectionChild).getPropertyValue("color");

	// Determine theme type and adjust if needed
	if (themeColors.regular === themeColors.inverse) {
		// If colors are the same, we have a light theme
		themeColors.theme = "light";
		colorSection.classList.remove(consts.lightClass);
		colorSection.classList.add(consts.darkClass);
		themeColors.inverse = getComputedStyle(sectionChild).getPropertyValue("color");
	} else {
		// Otherwise, we have a dark theme
		themeColors.theme = "dark";
	}

	// Clean up - remove the temporary section
	colorSection.remove();

	return themeColors;
};
