// Basic imports
import type { Config } from "../config";

// Helper imports
import { sectionTools } from "reveal.js-plugintoolkit";


const getStack = sectionTools.getStack;

// Helper function for auto tooltip logic
const getAutoTooltip = (el: HTMLElement): string | null => {
	// Try data attributes first
	const attrs = ["data-verticator-tooltip", "data-name", "title"];
	for (const attr of attrs) {
		const value = el.getAttribute(attr);
		if (value) {
			return value;
		}
	}
	// Try heading elements
	const selectors = ["h1", "h2", "h3", "h4"];
	for (const selector of selectors) {
		const heading = el.querySelector(selector);
		if (heading?.textContent) {
			return heading.textContent;
		}
	}
	return null;
};

const ttName = (element: HTMLElement, config: Config): string | null => {
	// Check if tooltips should be explicitly disabled for this element
	if (
		element.dataset.verticatorTooltip === "none" ||
		element.dataset.verticatorTooltip === "false" ||
		element.classList.contains("no-verticator-tooltip")
	) {
		return null;
	}

	if (config.tooltip === true) {
		return getAutoTooltip(element);
	}

	// Handle string cases
	if (typeof config.tooltip === "string") {
		// Auto/true string case
		if (config.tooltip === "auto" || config.tooltip === "true") {
			return getAutoTooltip(element);
		}

		// Specific attribute case (without else)
		const tooltipValue = element.getAttribute(config.tooltip);
		return tooltipValue || null;
	}

	// Default: no tooltip
	return null;
};

export const getCurrentStackSections = (
	slide: HTMLElement,
	config: Config
): [number, string | null][] => {
	// Get stack parent
	const slideStack = getStack(slide);
	if (!slideStack) return [];

	// Get all children of the parent stack
	const children = Array.from(slideStack.children);

	// Process all children
	const indexedElements: [number, HTMLElement][] = children.map((elem, index) => {
		return [index, elem as HTMLElement];
	});

	// Filter to only include section elements that aren't 'uncounted' (see Reveal docs)
	const filteredElements = indexedElements.filter((indexedElem) => {
		const element = indexedElem[1];

		const isUncounted =
			config.skipuncounted === true &&
			element.getAttribute("data-visibility") === "uncounted";

		return !isUncounted;
	});

	// Add tooltip information to each section
	const sections: [number, string | null][] = filteredElements.map((indexedElem) => {
		const [index, element] = indexedElem;

		// Get tooltip if enabled
		let tooltipText: string | null = null;
		if (config.tooltip) {
			tooltipText = ttName(element, config);
		}

		return [index, tooltipText];
	});

	return sections;
};
