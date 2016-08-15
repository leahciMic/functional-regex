const fregex = require('../functional-regex.js');

const text = [
  '<script src="foo.js"></script>',
  '<script src="bar.js"></script>',
  '<script src="baz.js"></script>',
  '<script src="qux.js"></script>',
].join('\n');
const regex = /src="([^"]*)"/g;

function checkSpy(spy) {
  expect(spy.calls.count()).toEqual(4);
  expect(spy.calls.argsFor(0)[0][0]).toEqual('src="foo.js"');
  expect(spy.calls.argsFor(0)[0][1]).toEqual('foo.js');
  expect(spy.calls.argsFor(1)[0][0]).toEqual('src="bar.js"');
  expect(spy.calls.argsFor(1)[0][1]).toEqual('bar.js');
  expect(spy.calls.argsFor(2)[0][0]).toEqual('src="baz.js"');
  expect(spy.calls.argsFor(2)[0][1]).toEqual('baz.js');
  expect(spy.calls.argsFor(3)[0][0]).toEqual('src="qux.js"');
  expect(spy.calls.argsFor(3)[0][1]).toEqual('qux.js');
}

fregex.addToRegExp();

describe('Functional Regex', () => {
  let spy;
  const expected = [
    'foo.js',
    'bar.js',
    'baz.js',
    'qux.js',
  ];

  beforeEach(() => {
    spy = jasmine.createSpy('iteratorFn').and.callFake(result => result[1]);
  });

  describe('v2 syntax', () => {
    it('should return an array', () => {
      expect(fregex(regex, text).map(x => x[1])).toEqual(expected);
    });
    it('should add global flag and work when using regex without global flag', () => {
      expect(fregex(/src="([^"]*)"/, text).map(x => x[1])).toEqual(expected);
    });
  });

  describe('Standalone', () => {
    it('forEach should work correctly', () => {
      fregex.forEach(regex, text, spy);
      checkSpy(spy);
    });
    it('map should work correctly', () => {
      const results = fregex.map(regex, text, spy);
      checkSpy(spy);
      expect(results).toEqual(expected);
    });
  });

  describe('Prototype', () => {
    it('forEach should work correctly', () => {
      regex.forEach(text, spy);
      checkSpy(spy);
    });
    it('map should work correctly', () => {
      const results = regex.map(text, spy);
      checkSpy(spy);
      expect(results).toEqual(expected);
    });
  });
});
