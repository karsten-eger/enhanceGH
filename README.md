## Changes to Pull Request page
With a lot of pull requests it's hard to identify which ones need your attention first. Sadly GitHub.com does not provide an option to save filters.
This Tampermonkey/Greasemonkey scripts adds the option to save the current filter (in localStorage) and lists all of them in the filters dropdown.

## Changes to "Files changed" page
There's a neat feature hidden behind a mostly unknown parameter on the "files changed" page. When adding the parameter "w=1" to the query whitespace changes won't show up. To help with the ease of use a new button is added to provide this functionality instantly without tinkering with the URL.

## How To
To use the script just download Tampermonkey (Google Chrome) or Greasemonkey (Firefox) and add a new script. Then just copy-paste the following into the provided code editor:

```Javascript
// ==UserScript==
// @name        Enhanced Github
// @namespace   Github
// @description enhance Steam Pull Request pages
// @include     https://github.com/*
// @require     https://raw.githubusercontent.com/karsten-eger/enhanceGH/master/enhanceGithub.js
// @version     1
// @grant       none
// ==/UserScript==

//
```