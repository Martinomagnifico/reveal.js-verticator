export const setScaleAndPosition = (deck, theVerticator, options) => {

	if (options.position == "auto") {
		options.position = deck.getConfig().rtl ? "left" : "right";
	}

	if (options.position == 'left') {
		theVerticator.classList.add('left');
		theVerticator.style.left = options.offset;
	} else {
		theVerticator.style.right = options.offset;
	}

	// Set scale
	let userScale = options.scale;
	userScale = (userScale > 2) ? 2 : (userScale < 0.5) ? 0.5 : userScale;

	let revealScale = deck.getScale();
	let totalScale = revealScale > 1 ? revealScale * userScale : userScale;
	theVerticator.style.setProperty('--verticator-scale', totalScale.toFixed(2));
	let tooltipScaleDamper = ( 1 / Math.sqrt(totalScale));
	theVerticator.style.setProperty('--verticator-tooltip-scale', tooltipScaleDamper.toFixed(2));

	deck.on('resize', event => {
		revealScale = event.scale;
		totalScale = revealScale > 1 ? revealScale * userScale : userScale;
		theVerticator.style.setProperty('--verticator-scale', totalScale.toFixed(2));
	});
	
}

