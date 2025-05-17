// Basic imports
import type { Api } from "reveal.js";
import type { RevealSlideEvent } from "../types";
import consts from "../consts";

// Function imports
import { getIndexBase } from "../helpers";

export const activateBullet = (
	event: RevealSlideEvent,
	theVerticator: HTMLElement,
	deck: Api
): void => {
	const indexbase = getIndexBase(deck);

	const listItems = Array.from(theVerticator.querySelectorAll("li"));

	// Initialize bestMatch to be one less than indexbase
	let bestMatch = indexbase - 1;

	// Find the best matching bullet based on index
	for (let i = 0; i < listItems.length; i++) {
		const listItem = listItems[i];
		const itemIndex = Number.parseInt(listItem.dataset.index || "0", 10);

		if (itemIndex <= (event.indexv || 0) + indexbase) {
			bestMatch = i;
		}

		// Remove active class from all bullets
		listItem.classList.remove(consts.activeclass);
	}

	// Add active class to the best match
	if (bestMatch >= 0 && bestMatch < listItems.length) {
		listItems[bestMatch].classList.add(consts.activeclass);
	}
};
