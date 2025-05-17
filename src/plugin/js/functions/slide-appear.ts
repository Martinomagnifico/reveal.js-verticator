// Basic imports
import type { Api } from "reveal.js";
import type { Config } from "../config";
import type { RevealSlideEvent } from "../types";


// Helper imports
import { sectionTools } from "reveal.js-plugintoolkit";

// Function imports
import { activateBullet } from "./activate-bullet";
import { createBullets } from "./create-bullets";
import { getCurrentStackSections } from "./get-current-stack-sections";

const getStack = sectionTools.getStack;

export const slideAppear = (
	event: RevealSlideEvent,
	deck: Api,
	theVerticator: HTMLElement,
	config: Config
): void => {
	// Handle resize events specifically
	if (event.type === "resize") {
		event.currentSlide = deck.getCurrentSlide();
		const indices = deck.getIndices();
		event.indexv = indices.v;
	}

	const slide = event.currentSlide;

	const stackSections = getCurrentStackSections(slide, config);

	// If no sections or only one, hide the verticator
	if (stackSections.length < 2) {
		theVerticator.classList.remove("visible");
		theVerticator.innerHTML = "";
		return;
	}

	// Get stack parent for stack change detection
	const slideStack = getStack(slide);

	// If we have previous slide info, only recreate bullets if we changed stacks
	const previousSlideStack = event.previousSlide ? getStack(event.previousSlide) : null;

	if (!event.previousSlide || slideStack !== previousSlideStack) {
		// Create bullets for the first time and activate correct one
		createBullets(event, theVerticator, stackSections, deck, config);
	} else {
		activateBullet(event, theVerticator, deck);
	}
};
