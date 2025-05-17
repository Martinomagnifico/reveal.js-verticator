# Verticator
### for Reveal.js

Using Markdown

---

## What does it do?

----

Verticator shows vertical indicators

----

On vertical slides only

----

If you do not override the colors in the options, Verticator will use your theme colors: the bullets will be the same color as text in your presentation.

The theme color is set as a CSS variable (`--c-theme-color`) in the Reveal element, and can also be used by other elements. On this page, it is `rgb(255, 255, 255)`, because that is also the text color.
<!-- .element: class="small" -->

----
<!-- .slide: data-background="#CAD1D9" -->
Verticator detects if the slide background is set to a different color. If you do not override the colors in the options, the bullets will still take on the heading- or textcolor of the slide.

On this page, the CSS variable (`--c-theme-color`) is `rgb(34, 34, 34)`, because that is also the text color.
<!-- .element: class="small" -->

----
<!-- .slide: data-background="#CAD1D9" -->
Verticator also fixes the appearance of text inside double opposite backgrounds, for example when the theme is dark, the stack is light and the slide is dark again.

----

Verticator is configurable globally through the Reveal options, but the colors can also be changed per slide.

---

## Global options

1. themetag
2. color
3. inversecolor
4. skipuncounted
5. clickable
6. position
7. offset
8. autogenerate
9. scale
10. tooltip
11. cssautoload
12. csspath

<!-- .element: class="twocol" -->

----

#### Option 1: themetag

Verticator uses your headings to get the color for the bullets, but you can also use other elements:

```js [4]
Reveal.initialize({
    ...
    verticator: {
        themetag: "h1" // Can be set to other tags like "p"
    },
    plugins: [ Verticator ]
})
```

----

#### Option 2: color

You can override the (themed) color of the bullets to a specific color. You can use named colors, hex and rgb:

```js [4]
Reveal.initialize({
	...
	verticator: {
		color: "" // Can be set to any CSS color
	},
	plugins: [ Verticator ]
})
```

----

#### Option 3: inversecolor

You can override the (themed) inverse color of the bullets to a specific color. These apply if a slide has an inverse color to the main background of the theme.

```js [4]
Reveal.initialize({
	...
	verticator: {
		inversecolor: "" // Can be set to any CSS color
	},
	plugins: [ Verticator ]
})
```

----

#### Option 4: skipuncounted

To skip bullets for certain slides, set the option `skipuncounted` to true. Then set a data-attribute `data-visibility="uncounted"` to the slide.

```js [4]
Reveal.initialize({
	...
	verticator: {
		skipuncounted: false // Can be set to true
	},
	plugins: [ Verticator ]
})
```

Reveal uses `data-visibility="uncounted"` to hide progress and skipping page numbers for certain slides. In this presentation, skipuncounted is set to true, and this section has the data-attribute.
<!-- .element: class="small" -->

----

#### Option 5: clickable

You can set the bullets to be clickable. This will add a click event to the bullets, which will trigger a slide change.

```js [4]
Reveal.initialize({
	...
	verticator: {
		clickable: true // Can be set to true or false
	},
	plugins: [ Verticator ]
})
```

----

#### Option 6: Position

Verticator is automatically positioned depending on the `rtl` setting of Reveal.js. This setting is used in languages like Hebrew and Arabic. Verticator will be on the left in that case. It can also be manually positioned.

```js [4]
Reveal.initialize({
	...
	verticator: {
		position: "auto" // Can be set to "left" or "right"
	},
	plugins: [ Verticator ]
})
```

----

#### Option 7: offset

By default, Verticator is positioned '3vmin' off the edge of the presentation. It can be set to any other valid CSS size and unit:

```js [4]
Reveal.initialize({
	...
	verticator: {
		offset: "3vmin" // Can be set to any CSS size and unit, like "40px"
	},
	plugins: [ Verticator ]
})
```

----

#### Option 8: autogenerate

Verticator will autogenerate bullets. In presentations with huge vertical stacks, this can result in an unsightly column of bullets. The user can then disable the autogeneration.

```js [4]
Reveal.initialize({
	...
	verticator: {
		autogenerate: true // Can be set to false
	},
	plugins: [ Verticator ]
})
```

----

#### Option 9: tooltip

Verticator can show tooltips of page titles, like this:

```js [4]
Reveal.initialize({
	...
	verticator: {
		tooltip: false // Can be set to "data-name" or "auto"
	},
	plugins: [ Verticator ]
})
```
It is turned off by default but can be enabled with these options:
<!-- .element: class="small" -->

- `tooltip: "data-name"` or any other attribute of the vertical slide.
- `tooltip: true` or `tooltip: "auto"`. This will check titles of each slide in the order: data-verticator-tooltip, `data-name`, `title`, and if none found, headings inside each slide in the order: `h1`, `h2`, `h3`, `h4`.

<!-- .element: class="small" -->

----

#### Option 10: scale

Verticator will scale with the same ratio as the Reveal slides. To tweak that scaling, you can manually set it.

```js [4]
Reveal.initialize({
	...
	verticator: {
		scale: 1 // Can be set to a value between 0.5 and 2.
	},
	plugins: [ Verticator ]
})
```

----

#### Option 11: cssautoload

Verticator will automatically load the CSS if this is set to `true`.
<!-- .element: class="small" -->

```js [4]
Reveal.initialize({
	...
	verticator: {
		cssautoload: true
	},
	plugins: [ Verticator ]
})
```

If Verticator runs in a bundler or module environment, where you should use `import` for your styling, it will automatically turn off autoloading. You can still turn on autoloading, but you will need to manually add this setting like shown above.
<!-- .element: class="small" -->


----

#### Option 12: csspath

The `csspath` option can be used when the you want to use your own stylesheet, instead of the provided one.
<!-- .element: class="small" -->

```js [4]
Reveal.initialize({
	...
	verticator: {
		csspath: ''
	},
	plugins: [ Verticator ]
})
```

Verticator will automatically load the styling for the bullets and the tooltips. If you really want to change things that you can't override from the Reveal.js config, you can link to your own CSS file here. This will not work in a bundler or module environment where you should use `import`.
<!-- .element: class="small" -->

---

## Slide options

1. Force inverse color
2. Force regular color
3. Force specific color

----
<!-- .element: data-state="split-view image-right", data-background-color="#051525", data-background-image="assets/img/pexels-brett-sayles-12106896.jpg", data-verticator="inverse" -->

<div class="row">
	<div class="col">
		<h4>Option 1: Force inverse color</h4>
		<p>Force the bullets to use the inverse color with a data-attribute of <code>data-verticator="inverse"</code>, even on slides with unchanged background colors.</p>
		<p class="small">Photo by Brett Sayles from <a href="https://www.pexels.com/photo/snow-covered-mountain-under-blue-sky-12106896/" target="blank">Pexels</a>.</p>
	</div>
	<div class="col"></div>
</div>


----
<!-- .element: data-state="split-view image-right", data-background-color="silver", data-background-image="assets/img/pexels-tyler-lastovich-937783.jpg", data-verticator="regular" -->

<div class="row">
	<div class="col">
		<h4>Option 2: Force regular color</h4>
		<p>Force the bullets to use the regular color with a data-attribute of <code>data-verticator="regular"</code>, even on slides with inverse background colors.</p>
		<p class="small">Photo by Tyler Lastovich from <a href="https://www.pexels.com/photo/body-of-water-near-silhouette-of-mountain-under-white-clouds-during-sunset-937783/" target="blank">Pexels</a>.</p>
	</div>
	<div class="col"></div>
</div>


----
<!-- .element: data-verticator="orange" -->

#### Option 3: Force specific color

The Verticator color can also be set specifically (per slide) with a data-attribute of `data-verticator="*"` where the wildcard is a CSS color.



---

Don’t overdo it: limit vertical slides. You probably don’t want 30 bullets on the right-hand side of your presentation.

----

Really.

----

#### Option demos (regular HTML)

- [Dark theme with no options](demo.html) (similar to this demo)
- [Dark theme with color options](demo-darkcolor.html)
- [Light theme with no color options](demo-light.html)
- [Light theme with color options](demo-lightcolor.html)
- [Tooltip demo](demo-tooltip.html)