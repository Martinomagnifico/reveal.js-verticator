import consts from '../consts';

export const swapColors = ( needToSwap, options, colors, revealElement, theVerticator) => {
	if (needToSwap) {
		revealElement.style.setProperty(consts.themeColorVar, colors.themeinverse);

		if (options.inversecolor || options.oppositecolor) {
			theVerticator.style.setProperty(consts.vertiColorVar, colors.verticatorinverse);
		} else {
			theVerticator.style.removeProperty(consts.vertiColorVar);
		}
	} else {
		revealElement.style.setProperty(consts.themeColorVar, colors.themeregular);

		if (options.color) {
			theVerticator.style.setProperty(consts.vertiColorVar, colors.verticatorregular);
		} else {
			theVerticator.style.removeProperty(consts.vertiColorVar);
		}
	}
}