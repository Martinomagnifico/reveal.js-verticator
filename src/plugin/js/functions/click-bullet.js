import { getNodeIndex } from '../helpers';

export const clickBullet = (event, deck) => {
	if ((event.target).matches('.verticator li a')) {
		let currIndexh = (deck.getIndices()).h;
		let currIndexf = (deck.getIndices()).v;
		event.preventDefault();
		let i = getNodeIndex(event.target.parentNode);
		deck.slide(currIndexh, i, currIndexf);
	}
}