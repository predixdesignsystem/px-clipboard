#px-clipboard [![Build Status](https://travis-ci.org/PredixDev/px-clipboard.svg?branch=master)](https://travis-ci.org/PredixDev/px-clipboard)

[![px-clipboard demo](px-clipboard.png?raw=true)](https://github.com/PredixDev/px-clipboard)

## Overview

px-clipboard is a Predix UI component which copies value into the user's computer.

It has 3 distinct modes:
  1. copy from input
  2. cut from input
  3. copy from Text

1) **Copy from Input**:

This mode requires the attribute `copy-from`, which should point to a tag, an ID, or a class.

Example:

    <px-clipboard copy-from=".helloCopy"><input type="text" id="helloCopy" class="helloCopy" value="hello World Copy"/></px-clipboard>


2) **Cut from Input**:

This mode also requires the `copy-from` attribute, but setting the value of the `data-clipboard-action` attribute to **cut**, it cuts the text, instead of copying it, .

Example:

    <px-clipboard data-clipboard-action="cut" copy-from="#helloCut"><input type="text" id="helloCut" value="hello World Cut"/></px-clipboard>


3) **Copy from Text**

This mode is slightly different - it does *not* copy text from an input - but from the value passed in the `data-clipboard-text`  attribute.

Example:

    <px-clipboard data-clipboard-text="Copy some text into the clipboard!"></px-clipboard>


## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line.

```
bower install px-clipboard --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/px-clipboard/px-clipboard.html"/>
```

Finally, use the component in your application:

```
<px-clipboard copy-from=".helloCopy"><input type="text" id="helloCopy" class="helloCopy" value="hello World Copy"/></px-clipboard>
```

<br />
<hr />

## documentation

Read the full API and view the demo [here](https://predixdev.github.io/px-clipboard).

The documentation in this repository is supplemental to the official Predix documentation, which is continuously updated and maintained by the Predix documentation team. Go to [http://predix.io](http://predix.io)  to see the official Predix documentation.


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ grunt sass
```

From the component's directory, to start a local server run:

```
$ grunt depserve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.


### DevMode
Devmode runs `grunt depserve` and `grunt watch` concurrently so that when you make a change to your source files and save them, your preview will be updated in any browsers you have opened and turned on LiveReload.
From the component's directory run:

```
$ grunt devmode
```

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/Px-Clipboard/issues) to submit any bugs you might find.
