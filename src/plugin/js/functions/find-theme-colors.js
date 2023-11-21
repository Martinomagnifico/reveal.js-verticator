import consts from '../consts';

export const findThemeColors = (parent, tag) => {
	const themeColors = {};
	const colorSection = document.createElement("section");
	const sectionChild = document.createElement(tag);
	parent.getElementsByClassName('slides')[0].appendChild(colorSection).appendChild(sectionChild);
	themeColors.regular = getComputedStyle(sectionChild).getPropertyValue('color');
	colorSection.classList.add(consts.lightClass);
	themeColors.inverse = getComputedStyle(sectionChild).getPropertyValue('color');

	if (themeColors.regular == themeColors.inverse) {
		themeColors.theme = "light";
		colorSection.classList.remove(consts.lightClass);
		colorSection.classList.add(consts.darkClass);
		themeColors.inverse = getComputedStyle(sectionChild).getPropertyValue('color');
	} else {themeColors.theme = "dark";}
	colorSection.remove();
	return themeColors;
}