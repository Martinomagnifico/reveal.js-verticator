import { debugLog } from '../helpers';
import { activateBullet } from './activate-bullet';

export const createBullets = (event, theVerticator, sections, options) => {

	debugLog(options, `Creating ${sections.length} bullets`)

	theVerticator.classList.remove('visible');

	let listHtml = '';

	sections.forEach(function(section) {
		let i = section[0];
		let tooltipname = section[1];
		let link = `href="#/${event.indexh + options.indexbase}/${i + options.indexbase}"`
		let dataname = tooltipname ? `data-name="${tooltipname}"` : '';
		let tooltip = tooltipname ? `<div class="tooltip"><span>${tooltipname}</span></div>` : '';
		listHtml += `<li data-index="${i + options.indexbase}"><a ${options.clickable ? link : ''}${dataname}></a>${tooltip}</li>`;
	});

	theVerticator.innerHTML = `<div class="verticator-holder">${listHtml}</div>`;
	activateBullet(event, theVerticator, options);
	setTimeout(function() {
		theVerticator.classList.add('visible');
	}, 300);
}