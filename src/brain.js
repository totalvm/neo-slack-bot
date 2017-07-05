"use strict";

var NLP = require('natural');
var fs = require('fs');
var sentiment = require('sentiment');

module.exports = Brain; 

function Brain() {
  this.classifier = new NLP.LogisticRegressionClassifier();
  this.minConfidence = 0.8;
}

Brain.prototype.teach = function(label, phrases) {
  phrases.forEach(function(phrase) {
   // console.log('Ingesting example for ' + label + ': ' + phrase);
    this.classifier.addDocument(phrase.toLowerCase(), label);
  }.bind(this));
  return this;
};

Brain.prototype.think = function() {
  this.classifier.train();

  // save the classifier for later use
  var aPath = './src/classifier.json';
  this.classifier.save(aPath, function(err, classifier) {
    // the classifier is saved to the classifier.json file!
    });

  return this;
};

Brain.prototype.interpret = function(phrase) {
  var guesses = this.classifier.getClassifications(phrase.toLowerCase());
  var guess = guesses.reduce(toMaxValue);
  return {
    probabilities: guesses,
    guess: guess.value > this.minConfidence ? guess.label : null
  };
};

Brain.prototype.invoke = function(skill, info, bot, message, controller) {
  var skillCode;
  
  // check the sentiment 
  let senti = sentiment(message.text);

  console.log('Grabbing code for skill: ' + skill);
  try {
    skillCode = require('../imports/skills/' + skill + '.js');
  } catch (err) {
    throw new Error('The invoked skill doesn\'t exist!' + '../skills/' + skill);
  }
  skillCode(skill, info, bot, message, senti, controller);
  return this;
};

function toMaxValue(x, y) {
  return x && x.value > y.value ? x : y;
}
