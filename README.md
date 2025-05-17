# Verticator

[![Version](https://img.shields.io/npm/v/reveal.js-verticator)]() [![Downloads](https://img.shields.io/npm/dt/reveal.js-verticator)]()

A plugin for [Reveal.js](https://revealjs.com) that adds indicators to show the amount of slides in a vertical stack. 

[<img src="https://martinomagnifico.github.io/reveal.js-verticator/screenshot.png" width="100%">](https://martinomagnifico.github.io/reveal.js-verticator/demo/demo.html)

Sometimes you would like to have an indication of how many slides are remaining in a vertical stack. This plugin does just that. It is visually similar to the indicators at [fullPage.js](https://alvarotrigo.com/fullPage/). 

* [Demo (dark theme, no options set)](https://martinomagnifico.github.io/reveal.js-verticator/demo/demo.html)
* [Dark theme with color options](https://martinomagnifico.github.io/reveal.js-verticator/demo/demodarkcolor.html)
* [Light theme, no color options](https://martinomagnifico.github.io/reveal.js-verticator/demo/demolight.html)
* [Light theme with color options](https://martinomagnifico.github.io/reveal.js-verticator/demo/demolightcolor.html)
* [Tooltip demo](https://martinomagnifico.github.io/reveal.js-verticator/demo/demotooltip.html)

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

The styling of Verticator is automatically inserted **when the verticator folder is manually copied** to the Reveal.js plugin folder.

If you **import** reveal.js-verticator from npm, you will need to **import** the CSS file yourself. Depending on your setup this can be something like this:

```
import 'reveal.js-verticator/plugin/verticator/verticator.css';
```

Verticator will detect if it runs in a module environment and will then not autoload the CSS. You can still set `cssautoload` to `true` if you like, but your bundler (Vite, Webpack) may not like that. In any of these cases, `import` the CSS file yourself.

If you want to change the Verticator or tooltip style, you do a lot of that via the Reveal.js options. Or you can simply make your own style and use that stylesheet instead. Linking to your custom styles can be managed through the `csspath` option of Verticator or through `import` when using modules.


#### Custom CSS
If and when you decide to create your own CSS file, make sure that you also include the following CSS variable, that is used by the plugin to avoid loading the CSS multiple times, and to avoid using the autoloading feature when using modules:

```css
:root {
    --cssimported-verticator: true;
}
```


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

* **`themetag`**: By default, Verticator sets the bullet colors to be the same as the color of the `h1` headings, but you can also set it to an other tag, like `p`.
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
* **`cssautoload`**: Verticator will load the CSS if this is set to `true`. If Verticator runs in a bundler or module environment, where you should use `import` for your styling, it will automatically turn off autoloading. You can still turn on autoloading, but you will need to manually add this setting like shown above.
* **`csspath`**: Verticator will automatically load the styling for the bullets and the tooltips. If you really want to change things that you can't override from the Reveal.js config, you can link to your own CSS file here. This will not work in a bundler or module environment where you should use `import`.


## Like it?

If you like it, please star this repo. 


## License
MIT licensed

Copyright (C) 2024 Martijn De Jongh (Martino)
