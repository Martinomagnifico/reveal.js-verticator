// Basic imports
import type { Api } from "reveal.js";
import type { Config } from "../config";
import type { RevealSlideEvent } from "../types";


// Helper imports
import { pluginDebug as debug } from "reveal.js-plugintoolkit";
import { getIndexBase } from "../helpers";

// Function imports
import { activateBullet } from "./activate-bullet";

export const createBullets = (
	event: RevealSlideEvent,
	theVerticator: HTMLElement,
	sections: [number, string | null][],
	deck: Api,
	config: Config
): void => {
	debug.log(config, `Creating ${sections.length} bullets`);

	const indexbase = getIndexBase(deck);

	// First remove visible class
	theVerticator.classList.remove("visible");

	// Build HTML for the bullets
	let listHtml = "";

	for (const section of sections) {
		const i = section[0];
		const tooltipname = section[1];

		// Create link attribute if clickable
		const link = `href="#/${event.indexh + indexbase}/${i + indexbase}"`;

		// Add data attribute if tooltip name is available
		const dataname = tooltipname ? `data-name="${tooltipname}"` : "";

		// Create tooltip HTML if name is available
		const tooltip = tooltipname ? `<div class="tooltip"><span>${tooltipname}</span></div>` : "";

		// Build the list item HTML
		listHtml += `<li data-index="${i + indexbase}"><a ${config.clickable ? link : ""}${dataname}></a>${tooltip}</li>`;
	}

	// Insert the HTML into the verticator
	theVerticator.innerHTML = `<div class="verticator-holder">${listHtml}</div>`;

	// Activate the appropriate bullet
	activateBullet(event, theVerticator, deck);

	// Add the visible class after a delay
	setTimeout(() => {
		theVerticator.classList.add("visible");
	}, 300);
};
