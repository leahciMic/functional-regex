# Functional Regex

[![Build Status](https://travis-ci.org/leahciMic/functional-regex.svg?branch=master)](https://travis-ci.org/leahciMic/functional-regex)
[![Code Climate](https://codeclimate.com/github/leahciMic/functional-regex/badges/gpa.svg)](https://codeclimate.com/github/leahciMic/functional-regex)
[![Test Coverage](https://codeclimate.com/github/leahciMic/functional-regex/badges/coverage.svg)](https://codeclimate.com/github/leahciMic/functional-regex/coverage)
[![Issue Count](https://codeclimate.com/github/leahciMic/functional-regex/badges/issue_count.svg)](https://codeclimate.com/github/leahciMic/functional-regex)
[![Dependency Status](https://www.versioneye.com/user/projects/57b1a71fe1dc00004428af9c/badge.svg?style=flat)](https://www.versioneye.com/user/projects/57b1a71fe1dc00004428af9c)

> Functional Regex simplifies the way you work with global regular expressions in JavaScript.

Functional Regex aims to simplify the process of iterating over a global regular expression. It is
often easier to treat the results of a globally matched regular expression as an array. It is then
possible to use `map`, `reduce`, `forEach`, `some`, `filter`, etc on the results.

## Example

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
var fregex = require('functional-regex');

fregex(/[\d+]/g, '1. There is 2 numbers in this string'); // == ['1', '2']
```

Because it's simply an array, we can use `forEach` and `map` on it as well as other array methods.

```js
var fregex = require('functional-regex');

fregex(/[\d+]/g, '1. There is 2 numbers in this string')
  .map(function(x) {
    return parseInt(x, 10);
  }); // == [1, 2]
```

## Installation

```sh
npm install --save functional-regex
```

## Usage

There are three ways to use Functional Regex.

1. Standalone (default, because extending native prototypes is evil)
2. Legacy (also does not modify prototypes)
3. Augmenting the RegExp prototype

### 1. Standalone

```js
var fregex = require('functional-regex');

fregex(regex, text); // => array
```

### 2. Standalone (legacy)

```js
var fregex = require('functional-regex');

fregex.forEach(regex, text, iteratorFn);
fregex.map(regex, text, iteratorFn);
```

### 3. RegExp prototype

```js
require('functional-regex').addToRegExp();

var regex = /foo/g;

regex.forEach(text, iteratorFn);
regex.map(text, iteratorFn);
```

## Contributing

Open an issue, or submit a pull-request.
