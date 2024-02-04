# Changelog

## [1.2.5] - 2024-02-04
### Changed
- Override change in Package.json
- Change for mobile view
- Latest Reveal.js version

## [1.2.4] - 2023-11-21
### Added
- Added detection for light or dark stacks, with or without light or dark sections
- Expanded the above to also fix text for double negative slide backgrounds

### Changed
- Rewrote plugin so that the demo can be easily started from the command line
- Hide Verticator on presentation in scroll mode
- Correct the Verticator state when going back into classic view


## [1.2.3] - 2022-11-19
### Changed
- Changed documentation to show default settings first
- Fix `rtl` setting to read Reveal config correctly
- Fix click on Verticator bullet if embedded with multiple presentations


## [1.2.2] - 2022-11-18
### Changed
- Avoid loading the Verticator style multiple times if there are multiple Reveal.js instances
- Avoid loading the Verticator style through scripting if in a Quarto setup


## [1.2.1] - 2022-11-17
### Changed
- Tooltip styling is not a separate stylesheet anymore
- As there is only 1 CSS file, the option `csspath` is no longer an object of multiple paths, but just the path to the verticator.css file.
- Some small fixes


## [1.2.0] - 2022-11-11
### Changed
- Verticator now uses the theme’s colors
- Colors can now be overridden per slide
- The position is now automatically set by the `rtl` setting


## [1.1.5] - 2022-10-14
### Changed
- In some cases the 'has-dark-background' (or light) was not correctly applied to the Reveal element. This fix now also looks at the slides that request these class changes.
- Verticator margin set to 0.
- Increase specificity of the tooltip.


## [1.1.4] - 2022-06-04
### Changed
- Typo fix


## [1.1.3] - 2022-06-04
### Added
- Autoload the CSS styling. 
- Added a new `csspath` option if the user wants to override the autoloading of the included styles. For example, to customise the styling.

## [1.1.2] - 2022-03-07
### Changed
- Bugfix


## [1.1.1] - 2022-03-07
### Added
- Added a new `tooltip` option
- Added a new `scale` option
- Started keeping the changelog.

### Changed
- Verticator will now scale according to the scale factor of the main slides



## [1.1.0] - 2021-02-15
### Added
- Added the option to turn of the autogeneration of Verticator bullets.



## [1.0.9] - 2021-09-04
### Added
- Support for Verticator bullets on the left-hand side.
- An option to set the Verticator bullets offset off the edge of the presentation.



## [1.0.8] - 2020-10-23
### Changed
- Fixed an issue when "hashOneBasedIndex" is set to true. 
- Fixed an issue with Safari where the color of the bullets would not update.



## [1.0.7] - 2020-07-10
### Changed
- Verticator 1.0.7 now works with multiple Reveal.js instances. Verticator no longer wites a style block, but the colors are injected in the HTML. This way each Reveal instance can have its own colors.



## [1.0.6] - 2020-06-18
### Added
- Added auto-insert of ul.verticator if it does not exist. 
- Added npm install option.



## [1.0.5] - 2020-06-07
### Changed
- Bug fix of demo file of 1.0.4.
- Documentation changes by Salim B.



## [1.0.4] - 2020-06-07
### Added
- Configuration options (by Jochen Wierum) added
### Changed
- Changes of some formatting.
- Verticator now references the Reveal files by CDN.



## [1.0.3] - 2020-05-25
### Added
- Added compatibility with the new Reveal.js 4 that changes the way plugins work.



## [1.0.2] - 2020-05-22
### Added
- The 1.0.2 release is compatible with Reveal.js 3. The next release will only be compatible with Reveal.js 4.