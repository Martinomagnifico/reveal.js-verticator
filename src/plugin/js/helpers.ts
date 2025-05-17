import type { Api } from "reveal.js";

export const getIndexBase = (deck: Api): number => {
	return deck.getConfig().hashOneBasedIndex ? 1 : 0;
};
