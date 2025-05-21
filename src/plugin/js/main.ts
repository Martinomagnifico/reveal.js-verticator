// Basic imports
import type { Api } from "reveal.js";
import type { Config } from "./config";
import type { RevealSlideEvent, VerticatorColors } from "./types";

// Helper imports
import { eventTools } from "reveal.js-plugintoolkit";

import { activateBullet } from "./functions/activate-bullet";
import { changeVerticatorColor } from "./functions/change-verticator-color";
import { observeStates } from "./functions/observe-states";
// Function imports
import { setupColors } from "./functions/setup-colors";
import { getVerticator, setScaleAndPosition } from "./functions/setup-dom";
import { slideAppear } from "./functions/slide-appear";

export class Verticator {
	private deck: Api;
	private config: Config;
	private colors: VerticatorColors;
	private theVerticator: HTMLElement | null = null;
	private currentSlide: HTMLElement | null = null;

	private constructor(deck: Api, config: Config) {
		this.deck = deck;
		this.config = config;
		this.colors = {
			theme: "",
			themeregular: "",
			themeinverse: "",
			verticatorregular: "",
			verticatorinverse: "",
		};
	}

	public static async create(deck: Api, config: Config): Promise<void> {
		const verticator = new Verticator(deck, config);
		await verticator.initialize();
	}

	private async initialize(): Promise<void> {
		this.setupVerticator();

		if (this.theVerticator) {
			this.colors = setupColors(
				this.theVerticator,
				this.deck.getRevealElement() as HTMLElement,
				this.config
			);

			setScaleAndPosition(this.deck, this.theVerticator, this.config);
			observeStates(this.theVerticator, this.deck, this.colors, this.config);

			// Add events
			eventTools.addMoreDirectionEvents(this.deck);
			eventTools.addScrollModeEvents(this.deck);

			this.addEventListeners();
		}
	}

	private setupVerticator(): void {
		this.theVerticator = getVerticator(this.deck, this.config);
		const revealEl = this.deck.getRevealElement() as HTMLElement;

		if (this.theVerticator) {
			const colors = setupColors(this.theVerticator, revealEl, this.config);
			setScaleAndPosition(this.deck, this.theVerticator, this.config);
		}
	}

	private addEventListeners(): void {
		this.deck.on("slidechanged-h", (event: unknown) => {
			if (!this.theVerticator) return;
			const e = event as RevealSlideEvent;

			if (e.currentSlide !== this.currentSlide) {
				slideAppear(e, this.deck, this.theVerticator, this.config);
				changeVerticatorColor(e, this.theVerticator, this.deck, this.colors, this.config);
				this.currentSlide = e.currentSlide;
			}
		});

		this.deck.on("slidechanged-v", (event: unknown) => {
			if (!this.theVerticator) return;
			const e = event as RevealSlideEvent;

			if (e.currentSlide !== this.currentSlide) {
				activateBullet(e, this.theVerticator, this.deck);
				changeVerticatorColor(e, this.theVerticator, this.deck, this.colors, this.config);
				this.currentSlide = e.currentSlide;
			}
		});

		this.deck.on("scrollmode-exit", (event: unknown) => {
			if (!this.theVerticator) return;
			const e = event as RevealSlideEvent;

			slideAppear(e, this.deck, this.theVerticator, this.config);
			changeVerticatorColor(e, this.theVerticator, this.deck, this.colors, this.config);
			this.currentSlide = e.currentSlide;
		});
	}
}
