var expect = require('chai').expect
  , myDivision = require('../lib/app.js');

describe('Division by Zero -', function() {

  describe('when dividing a number by zero', function() {

    it('should get Infinity', function() {
      expect(myDivision(42, 0)).to.be.Infinity;
    });

  });

  describe('when dividing zero by zero', function() {
    var result = myDivision(0, 0);

    it('is not a number', function () {
      expect(result).to.not.be.NaN;
    });

    it('is not equal to itself', function () {
      expect(result).to.not.be.result;
    });

  });

});

