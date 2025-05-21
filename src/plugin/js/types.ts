export interface ThemeColors {
	theme: string; // 'light' or 'dark'
	regular: string; // Regular color
	inverse: string; // Inverse color
}

export interface VerticatorColors {
	theme: string; // Theme type ('light' or 'dark')
	themeregular: string; // Regular theme color
	themeinverse: string; // Inverse theme color
	verticatorregular: string; // Regular verticator color
	verticatorinverse: string; // Inverse verticator color
}

export interface SectionState {
	dark: boolean;
	light: boolean;
	darkParent: boolean;
	lightParent: boolean;
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
