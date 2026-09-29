# Verticator

[![Version](https://img.shields.io/npm/v/reveal.js-verticator)]() [![Downloads](https://img.shields.io/npm/dt/reveal.js-verticator)]()

A plugin for [Reveal.js](https://revealjs.com) that adds indicators to show the amount of slides in a vertical stack. 

[<img src="https://martinomagnifico.github.io/reveal.js-verticator/screenshot.png" width="100%">](https://martinomagnifico.github.io/reveal.js-verticator/demo/demo.html)

Sometimes you would like to have an indication of how many slides are remaining in a vertical stack. This plugin does just that. It is visually similar to the indicators at [fullPage.js](https://alvarotrigo.com/fullPage/). 

* [Demo (dark theme, no options set)](https://martinomagnifico.github.io/reveal.js-verticator/demo/demo.html)
* [Dark theme with color options](https://martinomagnifico.github.io/reveal.js-verticator/demo/demo-darkcolor.html)
* [Light theme, no color options](https://martinomagnifico.github.io/reveal.js-verticator/demo/demo-light.html)
* [Light theme with color options](https://martinomagnifico.github.io/reveal.js-verticator/demo/demo-lightcolor.html)
* [Tooltip demo](https://martinomagnifico.github.io/reveal.js-verticator/demo/demo-tooltip.html)
* [Markdown demo](https://martinomagnifico.github.io/reveal.js-verticator/demo/demo-markdown.html)

Don't overdo it. You probably don’t want 30 bullets on the right-hand side of your presentation.

## Verticator follows your theme

If you do not override the colors in the configuration, Verticator detects what colors you use in your theme CSS. This works on both regular slides and on slides that have an inverted color. For example, if the theme is dark, and you use `<section(data-background-color="#fff")></section>` on one or more slides, those slides will then have a white background. In standard Reveal themes, the text in those white slides will then invert to be very dark gray. Verticator just copies that behaviour. The theme color is set as a CSS variable (`--c-theme-color`) in the Reveal element, and can also be used by other elements. 

### Overriding colors

Overriding colors can be done in several ways: 

* For the whole presentation: through the Verticator configuration
* Per slide, with a data-attribute of `data-verticator="*"`. The wildcard can have 3 options:
	* Force the inverse color (themed or overridden): `data-verticator="inverse"`
	* Force the regular color (themed or overridden): `data-verticator="regular"`
	* Force a specific color: `data-verticator="*"` where the wildcard is any CSS color.

## Installation

### Regular installation

Copy the verticator folder to the plugins folder of the reveal.js folder, like this: `plugin/verticator`.

### npm installation

This plugin is published to, and can be installed from, npm.

```console
npm install reveal.js-verticator
```


## Adding Verticator to your presentation

### JavaScript

There are two JavaScript files for Verticator, a regular one, `verticator.js`, and a module one, `verticator.mjs`. You only need one of them:

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

#### From npm

You can run it directly from npm:

```html
<script type="module">
	import Reveal from 'reveal.js';
	import Verticator from 'reveal.js-verticator';
	import 'reveal.js-verticator/plugin/verticator/verticator.css';
	Reveal.initialize({
		// ...
		plugins: [ Verticator ]
	});
</script>
```

Otherwise, you may want to copy the plugin into a plugin folder or an other location::

```html
<script type="module">
	import Reveal from './dist/reveal.mjs';
	import Verticator from './plugin/verticator/verticator.mjs';
	import './plugin/verticator/verticator.css';
	Reveal.initialize({
		// ...
		plugins: [ Verticator ]
	});
</script>
```



### Styling

The styling of Verticator is automatically inserted from the included CSS styles, either loaded through NPM or from the plugin folder.

If you want to change the Verticator or tooltip style, you do a lot of that via the Reveal.js options. Or you can simply make your own style and use that stylesheet instead.

#### Where the stylesheet comes from

Verticator finds and loads its own stylesheet, so most decks never set anything here. If it cannot find it, maybe because the plugin is in a bundle, or it is somewhere the plugin cannot work out, then use `csspath`.

```js
verticator: {
    csspath: "plugin/verticator/verticator.css"
}
```

If you import the stylesheet yourself, then set `csspath: false` so that Verticator does not load a second copy. A stylesheet of your own can also say so, which is useful when you cannot reach the plugin’s options:

```css
:root {
    --cssimported-verticator: true;
}
```

`csspath` loads that file *instead of* Verticator’s own.


### HTML

Verticator needs a UL with the class 'verticator' to insert the indicators. If there is not one already in the HTML, Verticator will generate it automatically for you. This can be disabled by setting the option `autogenerate` to `false`.


## Configuration

There are a few options that you can change from the Reveal.js options. The values below are default and do not need to be set if not changed.

```javascript
Reveal.initialize({
	// ...
	verticator: {
		themetag: 'h1',
		color: '',
		inversecolor: '',
		skipuncounted: false,
		clickable: true,
		position: 'auto',
		offset: '3vmin',
		autogenerate: true,
		tooltip: false,
		scale: 1,
		cssautoload: true,
		csspath: ''
		}
	},
	plugins: [ Verticator ]
	// ... 
	]
});
```

* **`themetag`**: By default, Verticator sets the bullet colors to be the same as the color of the `h1` headings. Set it to a tag that is not a heading, like `p`, to use the color of the body text instead. The theme is measured by [reveal.js-plugintoolkit](https://github.com/Martinomagnifico/reveal.js-plugintoolkit), which reads a heading and the body text, so any heading level selects the first and anything else the second.
* **`color`**: Verticator gets the main color from the theme as described above. To override it, simply give a new color here. You can use standard CSS -, hexadecimal - or RGB colors.
* **`inversecolor`**: Verticator gets the inverse color from the theme as described above, if the slide has an opposite background. To override it, simply give a new color here. You can use standard CSS -, hexadecimal - or RGB colors.
* **`skipuncounted`**: Omit drawing Verticator bullets for slides that are marked with Reveal.js' `data-visibility="uncounted"`. This behaviour is disabled by default.
* **`clickable`**: Allow navigation to a slide by clicking on the corresponding Verticator bullet. This behaviour is enabled by default.
* **`position`**: Sets the position of Verticator in the presentation. It is set to `'auto'` by default, and takes the `rtl` setting of your presentation to set the position. When `rtl = true` for example in Hebrew or Arabic presentations, Verticator will alight to the left, otherwise to the right. The position can also be set manually with `'left'` or `'right'`.
* **`offset`**: Sets the offset of Verticator from the edge (right or left, see 'position') of the screen. Set to `3vmin` by default, it can be set to any other valid CSS size and unit. 
* **`autogenerate`**: Autogenerate a UL element with the class `verticator` if none is found. Set to `true` by default.
* **`tooltip`**: Shows tooltips next to the Verticator bullets. Set to `false` by default, it can be enabled in two ways:
    * `tooltip: 'data-name'`: When you use `tooltip: 'data-name'` or `tooltip: 'title'` or any other attribute with a string value, the tooltip will show that value. 
    * `tooltip: 'auto'`: When you use `tooltip: 'auto'`, Verticator will check titles of each slide in the order: `data-verticator-tooltip`, `data-name`, `title`, and if none found, headings inside each slide in the order: `h1`, `h2`, `h3`, `h4`. Auto-mode is convenient for Verticator tooltips in Markdown slides. Set `data-verticator-tooltip="none"` or a class of `no-verticator-tooltip` on specific slides if you don't want the attribute- or auto-tooltip to show at all.
* **`scale`**: While Verticator will scale according to the scale factor of the main slides, the option `scale` will resize it manually on top of that. Set to `1` by default, it can be set to a minimum of `0.5` and a maximum of `2`.
* **`cssautoload`**: Verticator loads its own stylesheet when this is on. If you bundle Verticator, or import its CSS yourself, it works this out and does not load a second copy, so this normally does not need setting. If you do want it to autoload in a bundled deck, then setting it to `true` yourself turns it back on.
* **`csspath`**: Where Verticator's stylesheet is, for the cases where it cannot find it by itself. You can also set `csspath: false` if the styling is already on the page through some other file.


## Like it?

If you like it, please star this repo. 


## License
MIT licensed

Copyright (C) 2024 Martijn De Jongh (Martino)
