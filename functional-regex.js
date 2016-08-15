'use strict'; // eslint-disable-line strict

function fregex(regex, text) {
  if (!regex.global) {
    const flags = regex.flags ? regex.flags : regex.toString().match(/\/([^/]*)$/)[1];
    regex = new RegExp(regex.source, `${flags}g`); // eslint-disable-line no-param-reassign
  }
  return fregex.map(regex, text, x => x);
}

fregex.forEach = function forEach(regex, text, fn) {
  let result;

  // eslint-disable-next-line no-cond-assign
  while ((result = regex.exec(text)) !== null) {
    fn(result);
  }
};

fregex.map = function map(regex, text, fn) {
  const results = [];
  this.forEach(regex, text, (result) => {
    results.push(fn(result));
  });
  return results;
};

fregex.addToRegExp = function addToRegExp() {
  // eslint-disable-next-line no-extend-native
  RegExp.prototype.forEach = function forEach(text, fn) {
    return fregex.forEach(this, text, fn);
  };
  // eslint-disable-next-line no-extend-native
  RegExp.prototype.map = function map(text, fn) {
    return fregex.map(this, text, fn);
  };
};

module.exports = fregex;
