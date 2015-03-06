var fregex = require('../functional-regex.js'),
    text = [
      '<script src="foo.js"></script>',
      '<script src="bar.js"></script>',
      '<script src="baz.js"></script>',
      '<script src="quux.js"></script>'
    ].join("\n"),
    regex = /src="([^"]*)"/g;

fregex.addToRegExp();

describe('Functional Regex', function() {
  var checkSpy,
      spy,
      expected;

  checkSpy = function(spy) {
    expect(spy.calls.count()).toEqual(4);
    expect(spy.calls.argsFor(0)[0][0]).toEqual('src="foo.js"');
    expect(spy.calls.argsFor(0)[0][1]).toEqual('foo.js');
    expect(spy.calls.argsFor(1)[0][0]).toEqual('src="bar.js"');
    expect(spy.calls.argsFor(1)[0][1]).toEqual('bar.js');
    expect(spy.calls.argsFor(2)[0][0]).toEqual('src="baz.js"');
    expect(spy.calls.argsFor(2)[0][1]).toEqual('baz.js');
    expect(spy.calls.argsFor(3)[0][0]).toEqual('src="quux.js"');
    expect(spy.calls.argsFor(3)[0][1]).toEqual('quux.js');
  };

  expected = [
    'foo.js',
    'bar.js',
    'baz.js',
    'quux.js'
  ];

  beforeEach(function() {
    spy = jasmine.createSpy('iteratorFn').and.callFake(function(result) {
      return result[1];
    });
  });

  describe('Standalone', function() {
    it('forEach should work correctly', function() {
      fregex.forEach(regex, text, spy);
      checkSpy(spy);
    });
    it('map should work correctly', function() {
      var results = fregex.map(regex, text, spy);
      checkSpy(spy);
      expect(results).toEqual(expected);
    });
  });

  describe('Prototype', function() {
    it('forEach should work correctly', function() {
      regex.forEach(text, spy);
      checkSpy(spy);
    });
    it('forEach should work correctly', function() {
      var results = regex.map(text, spy);
      checkSpy(spy);
      expect(results).toEqual(expected);
    });
  });
});