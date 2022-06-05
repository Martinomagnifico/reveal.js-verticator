# Verticator

[![Version](https://img.shields.io/npm/v/reveal.js-verticator)]() [![Downloads](https://img.shields.io/npm/dt/reveal.js-verticator)]()

A plugin for [Reveal.js](https://revealjs.com) that adds indicators to show the amount of slides in a vertical stack. 

[![Screenshot](https://martinomagnifico.github.io/reveal.js-verticator/screenshot.png)](https://martinomagnifico.github.io/reveal.js-verticator/demo.html)

Sometimes you would like to have an indication of how many slides are remaining in a vertical stack. This plugin does just that. It is visually similar to the indicators at [fullPage.js](https://alvarotrigo.com/fullPage/). 

* [Demo (no options set)](https://martinomagnifico.github.io/reveal.js-verticator/demo.html)
* [Dark theme with no color options](https://martinomagnifico.github.io/reveal.js-verticator/demodark.html)
* [Light theme with color options](https://martinomagnifico.github.io/reveal.js-verticator/democolor.html)
* [Dark theme with color options](https://martinomagnifico.github.io/reveal.js-verticator/demodarkcolor.html)
* [Tooltip demo](https://martinomagnifico.github.io/reveal.js-verticator/demotooltip.html)

Don't overdo it. You probably don’t want 30 bullets on the right-hand side of your presentation.




## Installation

### Regular installation

Copy the verticator folder to the plugins folder of the reveal.js folder, like this: `plugin/verticator`.

### npm installation

This plugin is published to, and can be installed from, npm.

```console
npm install reveal.js-verticator
```
The Verticator plugin folder can then be referenced from `node_modules/reveal.js-verticator/plugin/verticator `


## Setup

### JavaScript

There are two JavaScript files for Verticator, a regular one, `verticator.js`, and a module one, `verticator.esm.js`. You only need one of them:

#### Regular 
If you're not using ES modules, for example, to be able to run your presentation from the filesystem, you can add it like this:

```html
<script type="text/javascript" src="dist/reveal.js"></script>
<script src="plugin/verticator/verticator.js"></script>
<script>
	Reveal.initialize({
		// ...
		plugins: [ Verticator ]
	});
</script>
```
#### As a module 
If you're using ES modules, you can add it like this:

```html
<script type="module">
	// This will need a server
	import Reveal from './dist/reveal.esm.js';
	import Verticator from './plugin/verticator/verticator.esm.js';
	Reveal.initialize({
		// ...
		plugins: [ Verticator ]
	});
</script>
```


### Styling

Since version 1.1.3, the styling of Verticator is automatically inserted from the included CSS styles, either loaded through NPM or from the plugin folder. If you enable tooltips in the options, the same goes for those styles.

If you want to change the Verticator or tooltip style, you can simply make your own style and use that stylesheet instead. Linking to your custom styles can be managed through the `path` option of Verticator.


### HTML

Verticator needs a UL with the class 'verticator' to insert the indicators. If there is not one already in the HTML, Verticator will generate it automatically for you. This can be disabled by setting the option `autogenerate` to `false`.


## Configuration

There are a few options that you can change from the Reveal.js options. The values below are default and do not need to be set if not changed.

```javascript
Reveal.initialize({
	// ...
	verticator: {
		darktheme: false,
		color: 'black',
		oppositecolor: 'white',
		skipuncounted: false,
		clickable: true,
		position: 'right',
		offset: '3vmin',
		autogenerate: true,
		tooltip: false,
		scale: 1,
		path: {
			verticator: '',
			tooltip: ''
		}
	},
	plugins: [ Verticator ]
	// ... 
	]
});
```

* **`darktheme`**: Verticator assumes a light theme by default. Let Verticator know if your theme is dark with this option.
    * By default, the Verticator bullets are black, and will be white on a dark slide. By setting `darktheme: true`, this behaviour is inverted. 
    * Reveal.js offers an option to let certain slides have an other background than the rest. For example, if the theme is light, and you use `<section(data-background-color="#000")></section>` on one or more slides, those slides will then be black. For dark themes, you simply use a light color in the data-attribute. The value of the data-attribute needs to be hexadecimal, because Reveal.js does a calculation on it to see if that color is light or dark. The Verticator bullets will invert on those slides.
    * Some of the themes ('simple', 'black' and 'white') will also invert the text colors in that case. If you use another theme, you need to copy that CSS to your own theme. The Verticator inverting behaviour will always work, even if the theme text colors are not inverted.
* **`color`**: To override the default black color (or the white color if `darktheme` is `true`), simply give a new color here. You can use standard CSS -, hexadecimal - or RGB colors.
* **`oppositecolor`**: To override the default white color (or the black color if `darktheme` is `true`) on slides that have a dark color (or light color if `darktheme` is `true`) set through the data-attribute, simply give a new color here. You can use standard CSS -, hexadecimal - or RGB colors.
* **`skipuncounted`**: Omit drawing Verticator bullets for slides that are marked with Reveal.js 4.0' `data-visibility="uncounted"`. This behaviour is disabled by default.
* **`clickable`**: Allow navigation to a slide by clicking on the corresponding Verticator bullet. This behaviour is enabled by default.
* **`position`**: Sets the position of Verticator in the presentation. Set to `right` by default, it can also be set to `left`.
* **`offset`**: Sets the offset of Verticator from the edge (right or left, see 'position') of the screen. Set to `3vmin` by default, it can be set to any other valid CSS size and unit. 
* **`autogenerate`**: Autogenerate a UL element with the class `verticator` if none is found. Set to `true` by default.
* **`tooltip`**: Shows tooltips next to the Verticator bullets. Set to `false` by default, it can be enabled in two ways:
    * `tooltip: 'data-name'`: When you use `tooltip: 'data-name'` or `tooltip: 'title'` or any other attribute with a string value, the tooltip will show that value. 
    * `tooltip: 'auto'`: When you use `tooltip: 'auto'`, Verticator will check titles of each slide in the order: `data-verticator-tooltip`, `data-name`, `title`, and if none found, headings inside each slide in the order: `h1`, `h2`, `h3`, `h4`. Auto-mode is convenient for Verticator tooltips in Markdown slides. Set `data-verticator-tooltip="none"` or a class of `no-verticator-tooltip` on specific slides if you don't want the attribute- or auto-tooltip to show at all.
* **`scale`**: While Verticator will now scale according to the scale factor of the main slides (since version 1.1.1), the option `scale` will resize it manually on top of that. Set to `1` by default, it can be set to a minimum of `0.5` and a maximum of `2`.
* **`path`**: Verticator will automatically load the styling for the bullets and (if needed) the tooltips. If you want to customise the styling, you can link to your own CSS files here for each of the styles.


## Like it?

If you like it, please star this repo. 


## License
MIT licensed

Copyright (C) 2022 Martijn De Jongh (Martino)
