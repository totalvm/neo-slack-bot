module.exports = function(skill, info, bot, message, senti, controller) {
  console.log('---------------------------------------------');
  console.log(message);
  controller.storage.channels.get(message.channel, function(err, res) {
    if(err) {
      getPrices(message, bot, controller, sendPublicMessage);
    } else {
      const oldTime = res.time.split('.')[0];
      const newTime = message.ts.split('.')[0];
      console.log('SAVED TIME: ', oldTime);
      console.log('NEW TIME: ', newTime);
      const diff = (new Date(newTime * 1000).getTime() - new Date(oldTime * 1000).getTime()) / 1000;
      console.log('DIFF ', message.channel, diff);
      if(diff > timeout) {
        getPrices(message, bot, controller, sendPublicMessage)
      } else {
        getPrices(message, bot, controller, sendPrivateMessage);
      }
    }
  });
};

const https = require('https');
const timeout = 60; // seconds to send to channel

const getPrices = (message, bot, controller, cb) => {
  https.get('https://min-api.cryptocompare.com/data/price?fsym=ANS&tsyms=BTC,USD,EUR', function(response) {
    let str = '';
    
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    })
    
    //the whole response has been recieved, so we just print it out here
      .on('end', function () {
        const prices = JSON.parse(str);
        const saveObject = {
          id: message.channel,
          time: message.ts,
          cur: 'ANS'
        };
        controller.storage.channels.save(saveObject, function(err) {
          if(!err) {
            console.log('SAVED', saveObject);
            cb(message, bot, prices)
          } else {
            console.log('SAVE ERROR', err);
          }
        });
        
      });
  });
};

const sendPrivateMessage = (message, bot, prices) => {
  bot.startPrivateConversation(message, function(err, conv) {
    if(err) {
      console.log('ansFee', err);
    } else {
      conv.say('*I understand you are looking for the ANS/NEO price.*');
      conv.say(`ANS/NEO - BTC: ${prices.BTC}\n` +
        `ANS/NEO - USD: ${prices.USD}\n`+
        `ANS/NEO - EUR: ${prices.EUR}`);
    }
  });
};

const sendPublicMessage = (message, bot, prices) => {
  bot.reply(message, '*I understand you are looking for the ANS/NEO price.*');
  bot.reply(message, `ANS/NEO - BTC: ${prices.BTC}\n` +
    `ANS/NEO - USD: ${prices.USD}\n`+
    `ANS/NEO - EUR: ${prices.EUR}` );
};


