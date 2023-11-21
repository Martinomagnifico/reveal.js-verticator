import consts from '../consts';

export const activateBullet = (event, theVerticator, options) => {

	let listItems = Array.from(theVerticator.querySelectorAll('li'));
	var bestMatch = options.indexbase - 1;

	listItems.forEach(function(listItem, i) {
		if (parseInt(listItem.dataset.index) <= event.indexv + options.indexbase) {
			bestMatch = i;
		}
		listItem.classList.remove(consts.activeclass);
	});

	if (bestMatch >= 0) {
		listItems[bestMatch].classList.add(consts.activeclass);
	}
};