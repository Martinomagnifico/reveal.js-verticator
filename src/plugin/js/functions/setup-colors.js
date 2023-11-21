import consts from '../consts';
import { findThemeColors } from './find-theme-colors';


export const setupColors = (theVerticator, revealElement, colors, options) => {

	const themeColors = findThemeColors(revealElement, options.themetag ? options.themetag : 'section');

	colors.theme = themeColors.theme;
	colors.themeregular = themeColors.regular;
	colors.themeinverse = themeColors.inverse;
	colors.verticatorregular = options.color ? options.color : themeColors.regular;
	colors.verticatorinverse = options.inversecolor ? options.inversecolor : options.oppositecolor ? options.oppositecolor : themeColors.inverse;

	if (options.debug) {
		console.log(`Theme regular color is: "${colors.themeregular}"`);
		console.log(`Theme inverse color is: "${colors.themeinverse}"`);
		if (options.color) {
			console.log(`Verticator regular color is: "${colors.verticatorregular}"`);
		}
		if (options.inversecolor || options.oppositecolor) {
			console.log(`Verticator inverse color is: "${colors.verticatorinverse}"`)
		}
	}

	if (options.color) {
		theVerticator.style.setProperty(consts.vertiColorVar, colors.verticatorregular);
	}

}