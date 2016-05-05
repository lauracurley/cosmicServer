var expect = require('chai').expect;

xdescribe('Model Tests', function() {
  describe('Fitness Model', function() {
    var Fitness = require('../models/fitness.js');

    it('should exist', function() {
      expect(Fitness).to.exist;
    });

    it('should be an object', function() {
      expect(Fitness).to.be.a('object');
    });
  });

  describe('Match Model', function() {
    var Match = require('../models/match.js');

    it('should exist', function() {
      expect(Match).to.exist;
    });

    it('should be an object', function() {
      expect(Match).to.be.a('object');
    });
  });

  describe('Message Model', function() {
    var Message = require('../models/message.js');

    it('should exist', function() {
      expect(Message).to.exist;
    });

    it('should be an object', function() {
      expect(Message).to.be.a('object');
    });
  });

  describe('Profile Model', function() {
    var Profile = require('../models/profile.js');

    it('should exist', function() {
      expect(Profile).to.exist;
    });

    it('should be an object', function() {
      expect(Profile).to.be.a('object');
    });
  });

  describe('User Model', function() {
    var User = require('../models/user.js');

    it('should exist', function() {
      expect(User).to.exist;
    });

    it('should be an object', function() {
      expect(User).to.be.a('object');
    });
  });

  describe('Wallet Model', function() {
    var Wallet = require('../models/wallet.js');

    it('should exist', function() {
      expect(Wallet).to.exist;
    });

    it('should be an object', function() {
      expect(Wallet).to.be.a('object');
    });
  });

});

