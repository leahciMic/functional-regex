module.exports = {
  forEach: function(regex, text, fn) {
    var result;
    while ((result = regex.exec(text)) !== null) {
      fn(result);
    }
    this.lastIndex = 0;
  },
  map: function(regex, text, fn) {
    var results = [];
    this.forEach(regex, text, function(result) {
      results.push(fn(result));
    });
    return results;
  },
  addToRegExp: function() {
    var self = this;
    RegExp.prototype.forEach = function(text, fn) {
      return self.forEach(this, text, fn);
    };
    RegExp.prototype.map = function(text, fn) {
      return self.map(this, text, fn);
    };
  }
};