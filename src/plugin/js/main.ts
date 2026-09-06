// Basic imports
import type { Api } from "reveal.js";
// Helper imports
import {
	pluginDebug as debug,
	eventTools,
	type RevealInstance,
	themeTools,
} from "reveal.js-plugintoolkit";
import type { Config } from "./config";
import { activateBullet } from "./functions/activate-bullet";
import { changeVerticatorColor } from "./functions/change-verticator-color";
// Function imports
import { setupColors } from "./functions/setup-colors";
import { getVerticator, setScaleAndPosition } from "./functions/setup-dom";
import { slideAppear } from "./functions/slide-appear";
import type { RevealSlideEvent, VerticatorColors } from "./types";

// How long to keep looking for a theme that shows up after the deck has started.
// Only ever reached by a deck that has no Reveal theme at all, where it costs
// one cheap check every 16ms and nothing else.
const LATE_THEME_TIMEOUT = 10000;

export class Verticator {
	private deck: Api;
	private config: Config;
	private colors: VerticatorColors;
	private theVerticator: HTMLElement | null = null;
	private currentSlide: HTMLElement | null = null;

	private constructor(deck: Api, config: Config) {
		this.deck = deck;
		this.config = config;
		this.colors = { regular: "", inverse: "" };
	}

	public static async create(deck: Api, config: Config): Promise<void> {
		const verticator = new Verticator(deck, config);
		await verticator.initialize();
	}

	private async initialize(): Promise<void> {
		this.setupVerticator();

		if (this.theVerticator) {
			// The toolkit measures the theme and keeps `--c-theme-color` matched to
			// the slide on screen, which is what the stylesheet follows. It waits for
			// a theme before measuring, and only the first plugin on the deck to ask
			// does the measuring, so calling it here is safe alongside others.
			const themeColors = await themeTools.addThemeColor(
				this.deck as unknown as RevealInstance,
				{ timeout: LATE_THEME_TIMEOUT }
			);

			if (!themeColors) {
				debug.warn(
					"No Reveal theme was found, so no theme colors could be read. If this deck styles itself without a theme, set `color` and `inversecolor` in the Verticator options."
				);
			}

			this.colors = setupColors(this.theVerticator, themeColors, this.config);

			setScaleAndPosition(this.deck, this.theVerticator, this.config);

			// Add events
			eventTools.addMoreDirectionEvents(this.deck);
			eventTools.addScrollModeEvents(this.deck);

			this.addEventListeners();
		}
	}

	private setupVerticator(): void {
		this.theVerticator = getVerticator(this.deck, this.config);

		if (this.theVerticator) {
			setScaleAndPosition(this.deck, this.theVerticator, this.config);
		}
	}

	private addEventListeners(): void {
		this.deck.on("slidechanged-h", (event: unknown) => {
			if (!this.theVerticator) return;
			const e = event as RevealSlideEvent;

			if (e.currentSlide !== this.currentSlide) {
				slideAppear(e, this.deck, this.theVerticator, this.config);
				changeVerticatorColor(e, this.theVerticator, this.colors);
				this.currentSlide = e.currentSlide;
			}
		});

		this.deck.on("slidechanged-v", (event: unknown) => {
			if (!this.theVerticator) return;
			const e = event as RevealSlideEvent;

			if (e.currentSlide !== this.currentSlide) {
				activateBullet(e, this.theVerticator, this.deck);
				changeVerticatorColor(e, this.theVerticator, this.colors);
				this.currentSlide = e.currentSlide;
			}
		});

		this.deck.on("scrollmode-exit", (event: unknown) => {
			if (!this.theVerticator) return;
			const e = event as RevealSlideEvent;

			slideAppear(e, this.deck, this.theVerticator, this.config);
			changeVerticatorColor(e, this.theVerticator, this.colors);
			this.currentSlide = e.currentSlide;
		});
	}
}
