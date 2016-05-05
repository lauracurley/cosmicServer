var expect = require('chai').expect;

describe('Model Tests', function() {
  describe('Fitness Model', function() {
    var Fitness = require('../models/fitness.js');

    it('should exist', function() {
      expect(Fitness).to.exist;
    });

    it('should be an object', function() {
      expect(Fitness).to.be.a('object');
    });
  });


});

