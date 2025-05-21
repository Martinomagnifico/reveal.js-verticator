// Basic imports
import type { Api } from "reveal.js";
import type { Config } from "../config";
import consts from "../consts";
import type { SectionState, VerticatorColors } from "../types";

// Function imports
import { swapColors } from "./swap-colors";

/**
 * Observe background state changes in the presentation
 * @param theVerticator - The verticator element
 * @param deck - Reveal.js API
 * @param colors - Verticator colors
 * @param config - Plugin configuration
 */
export const observeStates = (
	theVerticator: HTMLElement,
	deck: Api,
	colors: VerticatorColors,
	config: Config
): void => {
	// Get reveal elements
	const revealElement = deck.getRevealElement() as HTMLElement;
	const revealViewport = deck.getViewportElement() as HTMLElement;

	// Initialize section state tracking
	const sectionState: SectionState = {
		dark: revealElement.classList.contains(consts.darkClass),
		light: revealElement.classList.contains(consts.lightClass),
		darkParent: revealElement.classList.contains("darkstack"),
		lightParent: revealElement.classList.contains("lightstack"),
	};

	// We use an observer here, because the color-check function from
	// the main Reveal.js does not immediately apply the classes.
	const elementObserver = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			const { target } = mutation;

			if (mutation.attributeName === "class") {
				// Helper function to check for class on mutated element
				const bgMutation = (theClass: string): boolean => {
					return (target as HTMLElement).classList.contains(theClass);
				};

				// Check current background classes
				const hasLightBg = bgMutation(consts.lightClass);
				const hasDarkBg = bgMutation(consts.darkClass);
				const hasLightParent = bgMutation("lightstack");
				const hasDarkParent = bgMutation("darkstack");

				// Check if there is a change in slide backgrounds
				if (hasLightBg || hasDarkBg) {
					if (sectionState.dark !== hasDarkBg || sectionState.light !== hasLightBg) {
						// For dark themes, handle light background changes
						if (colors.theme === "dark" && sectionState.light !== hasLightBg) {
							sectionState.light = hasLightBg;
							swapColors(hasLightBg, config, colors, revealElement, theVerticator);
						}
						// For light themes, handle dark background changes
						if (colors.theme === "light" && sectionState.dark !== hasDarkBg) {
							sectionState.dark = hasDarkBg;
							swapColors(hasDarkBg, config, colors, revealElement, theVerticator);
						}
					}
				}
				// Handle parent stack background changes
				else if (hasLightParent || hasDarkParent) {
					if (
						sectionState.darkParent !== hasDarkParent ||
						sectionState.lightParent !== hasLightParent
					) {
						// For dark themes, handle light parent changes
						if (
							colors.theme === "dark" &&
							sectionState.lightParent !== hasLightParent
						) {
							sectionState.lightParent = hasLightParent;
							swapColors(
								hasLightParent,
								config,
								colors,
								revealElement,
								theVerticator
							);
						}
						// For light themes, handle dark parent changes
						if (colors.theme === "light" && sectionState.darkParent !== hasDarkParent) {
							sectionState.darkParent = hasDarkParent;
							swapColors(hasDarkParent, config, colors, revealElement, theVerticator);
						}
					}
				}
				// Reset to default when no special backgrounds
				else {
					sectionState.dark = false;
					sectionState.light = false;
					swapColors(false, config, colors, revealElement, theVerticator);
				}
			}
		}
	});

	/**
	 * Set up the mutation observer on the appropriate element
	 */
	const setObserver = (): void => {
		if (revealViewport.classList.contains("reveal-scroll")) {
			elementObserver.observe(revealViewport, {
				attributes: true,
				attributeFilter: ["class"],
			});
		} else {
			elementObserver.observe(revealElement, {
				attributes: true,
				attributeFilter: ["class"],
			});
		}
	};

	// Initialize the observer
	setObserver();
};
