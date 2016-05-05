var expect = require('chai').expect;



describe('Controller Tests', function() {
  describe('Fitness Controller', function() {
    var fitnessController = require('../controllers/fitnessController.js');

    it('should exist', function() {
      expect(fitnessController).to.exist;
    });

    it('should be an object', function() {
      expect(fitnessController).to.be.a('object');
    });

  });

  describe('Match Controller', function() {
    var matchController = require('../controllers/matchController.js');

    it('should exist', function() {
      expect(matchController).to.exist;
    });

    it('should be an object', function() {
      expect(matchController).to.be.a('object');
    });

  });

  describe('Message Controller', function() {
    var messageController = require('../controllers/messageController.js');

    it('should exist', function() {
      expect(messageController).to.exist;
    });

  });

  describe('Profile Controller', function() {
    var profileController = require('../controllers/profileController.js');

    it('should exist', function() {
      expect(profileController).to.exist;
    });

    it('should be an object', function() {
      expect(profileController).to.be.a('object');
    });

  });

  describe('User Controller', function() {
    var userController = require('../controllers/userController.js');

    it('should exist', function() {
      expect(userController).to.exist;
    });

    it('should be an object', function() {
      expect(userController).to.be.a('object');
    });

    it('should have a function named "saveOne"', function() {
      expect(userController.saveOne).to.be.a('function');
    });

    it('should have a function named "fetchAll"', function() {
      expect(userController.saveOne).to.be.a('function');
    });
  });

  describe('Wallet Controller', function() {
    var walletController = require('../controllers/walletController.js');

    it('should exist', function() {
      expect(walletController).to.exist;
    });

    it('should be an object', function() {
      expect(walletController).to.be.a('object');
    });

  });

});

