import { activateBullet } from "./activate-bullet.js";
import { createBullets } from "./create-bullets.js";
import { getCurrentStackSections } from "./get-current-stack-sections.js";

export const slideAppear = (event, deck, theVerticator, options) => {

	if (event.type == "resize") {
		event.currentSlide = deck.getCurrentSlide();
		event.indexv = (deck.getIndices()).v;
	}

	let slide = event.currentSlide;
	let parent = slide.parentNode;

	let stackSections = getCurrentStackSections(slide, options);

	if (stackSections && stackSections.length) {

		if (stackSections.length < 2) {
			theVerticator.classList.remove('visible');
			theVerticator.innerHTML = '';
		} else {
			if (event.previousSlide) {
				let lastParent = event.previousSlide.parentNode;
	
				if (parent != lastParent) {
					createBullets(event, theVerticator, stackSections, options);
				}
			} else {
				createBullets(event, theVerticator, stackSections, options);
			}
			activateBullet(event, theVerticator, options);
		}
	} else {
		theVerticator.classList.remove('visible');
		theVerticator.innerHTML = '';
	}
};