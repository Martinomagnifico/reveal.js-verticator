/** The two colours Verticator can take, once the deck's options and the theme have both been taken into account. */
export interface VerticatorColors {
	regular: string;
	inverse: string;
}

export interface RevealResizeEvent {
	scale: number;
}

export interface RevealSlideEvent {
	type: string;
	currentSlide: HTMLElement;
	previousSlide: HTMLElement;
	indexh: number;
	indexv: number;
	bubbles: boolean;
	cancelable: true;
	target: HTMLElement;
	currentTarget: null;
	defaultPrevented: boolean;
	eventPhase: number;
}
