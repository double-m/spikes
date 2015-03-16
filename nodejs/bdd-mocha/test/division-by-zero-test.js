var assert = require('assert')
  , myDivision = require('../lib/app.js');

describe('Division by Zero', function() {

  describe('when dividing a number by zero', function() {

    it('should get Infinity', function() {
      assert.equal(myDivision(42, 0), Infinity);
    });

  });

  describe('when dividing zero by zero', function() {
    var result = myDivision(0, 0);

    it('is not a number', function () {
      console.log(result);
      assert.notStrictEqual(NaN, result);
    });

    it('is not equal to itself', function () {
      assert.notEqual(result, result);
    });

  });

});

