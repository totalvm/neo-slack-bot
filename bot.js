'use strict';

const BotKit = require('botkit');
const env = require('node-env-file');

env('.env');
console.log('ENV VARS!!!', process.env);

const bot = BotKit.slackbot({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  token: process.env.token,
  debug: false,
  json_file_store: __dirname + '/.data/db/',
  scopes: ['bot', 'commands']
});

module.exports = bot;