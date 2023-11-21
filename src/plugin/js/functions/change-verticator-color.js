import consts from '../consts';

export const changeVerticatorColor = (event, theVerticator, deck, colors, options) => {

	let revealElement = deck.getRevealElement();

	if (event.currentSlide.parentNode.classList.contains("stack")) {
		if (event.currentSlide.parentNode.classList.contains(consts.lightClass)) {
			revealElement.classList.add("lightstack");
		} else {
			revealElement.classList.remove("lightstack")
		}

		if (event.currentSlide.parentNode.classList.contains(consts.darkClass)) {
			revealElement.classList.add("darkstack")
		} else {
			revealElement.classList.remove("darkstack")
		}
	}

	if (event.currentSlide.dataset.verticator || event.currentSlide.parentNode.dataset.verticator) {

		if (event.currentSlide.dataset.verticator == "regular" || event.currentSlide.parentNode.dataset.verticator == "regular") {
			theVerticator.style.setProperty(consts.forceColorVar, colors.verticatorregular);
			if (options.debug) {
				console.log(`Verticator forced to: "${colors.verticatorregular}"`);
			}
		} else if (event.currentSlide.dataset.verticator == "inverse" || event.currentSlide.parentNode.dataset.verticator == "inverse") {
			theVerticator.style.setProperty(consts.forceColorVar, colors.verticatorinverse);
			if (options.debug) {
				console.log(`Verticator forced to: "${colors.verticatorinverse}"`);
			}
		} else {
			theVerticator.style.setProperty(consts.forceColorVar, deck.getCurrentSlide().dataset.verticator || deck.getCurrentSlide().parentNode.dataset.verticator);
			if (options.debug) {
				console.log(`Verticator forced to: "${deck.getCurrentSlide().dataset.verticator || deck.getCurrentSlide().parentNode.dataset.verticator}"`);
			}
		}
	} else {theVerticator.style.removeProperty(consts.forceColorVar);}

};