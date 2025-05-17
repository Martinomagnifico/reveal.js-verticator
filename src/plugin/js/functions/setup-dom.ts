//Basic imports
import type { Api } from "reveal.js";
import type { Config } from "../config";
import type { RevealResizeEvent } from "../types";

export const getVerticator = (deck: Api, config: Config): HTMLElement | null => {
	const revealEl = deck.getRevealElement() as HTMLElement;

	let theVerticator = revealEl.querySelector("ul.verticator") as HTMLElement | null;

	if (!theVerticator && config.autogenerate) {
		theVerticator = document.createElement("ul");
		theVerticator.classList.add("verticator");

		if (!config.clickable) {
			theVerticator.classList.add("no-click");
		}

		revealEl.insertBefore(theVerticator, revealEl.childNodes[0]);
	}

	return theVerticator;
};

export const setScaleAndPosition = (
	deck: Api,
	theVerticator: HTMLElement,
	config: Config
): void => {
	let position = config.position;
	if (position === "auto") {
		position = deck.getConfig().rtl ? "left" : "right";
	}

	if (position === "left") {
		theVerticator.classList.add("left");
		theVerticator.style.left = config.offset;
	} else {
		theVerticator.style.right = config.offset;
	}

	let userScale = config.scale;
	userScale = userScale > 2 ? 2 : userScale < 0.5 ? 0.5 : userScale;

	let revealScale = deck.getScale();
	let totalScale = revealScale > 1 ? revealScale * userScale : userScale;
	applyScales(theVerticator, totalScale);

	deck.on("resize", (event: unknown) => {
		const resizeEvent = event as RevealResizeEvent;

		if (event && typeof resizeEvent.scale === "number") {
			revealScale = resizeEvent.scale;
			totalScale = revealScale > 1 ? revealScale * userScale : userScale;
			applyScales(theVerticator, totalScale);
		}
	});
};

const applyScales = (element: HTMLElement, scale: number): void => {
	element.style.setProperty("--verticator-scale", scale.toFixed(2));

	const tooltipScaleDamper = 1 / Math.sqrt(scale);
	element.style.setProperty("--verticator-tooltip-scale", tooltipScaleDamper.toFixed(2));
};
