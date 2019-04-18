# reveal.js-verticator
A plugin for [Reveal.js](https://revealjs.com) that adds indicators to show the amount of slides in a vertical stack. 


Sometimes you would like to have an indication of how many slides are in a vertical stack. This plugin does just that. It is visually similar to the indicators at [fullPage.js](https://alvarotrigo.com/fullPage/). 

[Demo](https://martinomagnifico.github.io/reveal.js-verticator/demo.html)

Don't overdo it. You probably don't want 30 bullets on the right-hand side of your website.


## Installation

Copy the verticator folder to the plugins folder of the reveal.js folder, like this: `plugin/verticator`. Now add it to the dependencies of Reveal.js.


```javascript
Reveal.initialize({
	// ...
	dependencies: [
		// ... 
		{ src: 'js/revealjs/plugin/verticator/verticator.js' },
		// ... 
	]
});
```

Now copy the verticator.css file and make a reference to it. Note that this example has an "assets" folder for resources. You can use whatever setup for the hierarchy, as long as the references are correct :-)

```html
<link rel="stylesheet" href="assets/css/verticator.css">
```

## Configuration

You can change the colour of the bullets the Reveal.js options. The value below is default and does not need to be set if not changed.

```javascript
Reveal.initialize({
	// ...
	verticator: {
		color: 'white'
	},
	dependencies: [
	// ... 
	]
});
```


## Like it?

If you like it, please star this repo.




## License
MIT licensed

Copyright (C) 2019 Martijn De Jongh (Martino)
