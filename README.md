# Functional Regex [![Build Status](https://travis-ci.org/leahciMic/functional-regex.svg)](https://travis-ci.org/leahciMic/functional-regex)

Functional Regex simplifies the way you work with global regular expressions in
JavaScript.

When looking for something like /foo(test)/g it's necessary to do:

```js
var regex = /foo(test)/g,
    result;

while ((result = regex.exec(test)) !== null) {
  // do something with result
};
```

Wouldn't it be nice if we could do something more like:

```js
var regex = /foo(test)/g;

regex.forEach(function(result) {
    // do something with result.
});
```

And even map over the matches:

```js
var regex = /src="([^"]*"/g;

var scripts = regex.map(function(result) {
  return result[1];
});
```

## Installation

```sh
npm install --save functional-regex
```

## Usage

There are two ways to use Functional Regex.

1. Standalone (default, because extending native prototypes is evil)
2. Augmenting the RegExp prototype

### 1. Standalone

```js
var fregex = require('functional-regex');

fregex.forEach(regex, text, iteratorFn);
fregex.map(regex, text, iteratorFn);
```

### 2. RegExp prototype

```js
require('functional-regex').addToRegExp();

var regex = /foo/g;

regex.forEach(text, iteratorFn);
regex.map(text, iteratorFn);
```

## Contributing

Open an issue, or submit a pull-request.