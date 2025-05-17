export interface Config {
	themetag: string;
	color: string;
	inversecolor: string;
	plaintextonly: boolean;
	skipuncounted: boolean;
	clickable: boolean;
	position: "auto" | "left" | "right" | "top" | "bottom";
	offset: string;
	autogenerate: boolean;
	tooltip: boolean;
	scale: number;
	cssautoload: boolean;
	csspath: string;

	// Deprecated property:
	oppositecolor?: string;
	// Optional property for debugging
	debug?: boolean;
}

const defaultConfig: Config = {
	themetag: "h1",
	color: "",
	inversecolor: "",
	skipuncounted: false,
	clickable: true,
	position: "auto",
	offset: "3vmin",
	autogenerate: true,
	tooltip: false,
	scale: 1,
	cssautoload: true,
	csspath: "",
	plaintextonly: false,
};

export { defaultConfig };
