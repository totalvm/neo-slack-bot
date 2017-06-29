module.exports = function(skill, info, bot, message, senti, controller) {
  console.log('---------------------------------------------');
  console.log(message);
  controller.storage.channels.get(message.channel, function(err, res) {
    if(err) {
      getPrices(message, bot, controller, sendPrivateMessage, true);
    } else {
      const oldTime = res.time.split('.')[0];
      const newTime = message.ts.split('.')[0];
      console.log('SAVED TIME: ', oldTime);
      console.log('NEW TIME: ', newTime);
      const diff = (new Date(newTime * 1000).getTime() - new Date(oldTime * 1000).getTime()) / 1000;
      console.log('DIFF ', message.channel, diff);
      getPrices(message, bot, controller, sendPrivateMessage, true);
    }
  });
};

const https = require('https');
const timeout = 300; // seconds to send to channel

const getPrices = (message, bot, controller, cb, save) => {
  https.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ANS&tsyms=BTC,USD', function(response) {
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
        if(save) {
          controller.storage.channels.save(saveObject, function (err) {
            if (!err) {
              console.log('SAVED', saveObject);
            } else {
              console.log('SAVE ERROR', err);
            }
          });
        }
        cb(message, bot, prices);
  
      });
  });
};

const sendPrivateMessage = (message, bot, prices) => {
  bot.startPrivateConversation(message, function(err, conv) {
    if(err) {
      console.log('ansFee', err);
    } else {
      
      const ans = prices.DISPLAY.ANS;
  
      for(let cur in ans) {
        const curInfo = ans[cur];
        const msg = createMessage(cur, curInfo);
        conv.say(msg);
      }
    }
  });
};

const createMessage = (cur, curInfo) => {
  return {
    text: "*Current price for " + cur + "*",
    attachments: [{
      fields: [
        {
          "title": "Market:",
          "short": true
        },
        {
          "title": curInfo.LASTMARKET,
          "short": true
        },
        {
          value: "Price",
          short: true
        },
        {
          value: curInfo.PRICE,
          short: true
        },
        {
          value: "Last update",
          short: true
        },
        {
          value: curInfo.LASTUPDATE,
          short: true
        },
        {
          value: "Last volume",
          short: true
        },
        {
          value: curInfo.LASTVOLUMETO,
          short: true
        },
        {
          value: "Volume 24h",
          short: true
        },
        {
          value: curInfo.VOLUME24HOUR,
          short: true
        },
        {
          value: "Volume 24h in" + curInfo.TOSYMBOL,
          short: true
        },
        {
          value: curInfo.VOLUME24HOURTO,
          short: true
        },
        {
          value: "High 24h",
          short: true
        },
        {
          value: curInfo.HIGH24HOUR,
          short: true
        },
        {
          value: "Low 24h",
          short: true
        },
        {
          value: curInfo.LOW24HOUR,
          short: true
        },
        {
          value: "Change 24h",
          short: true
        },
        {
          value: curInfo.CHANGE24HOUR,
          short: true
        },
        {
          value: "Change 24h",
          short: true
        },
        {
          value: curInfo.CHANGEPCT24HOUR + '$',
          short: true
        }
      ],
      "color": "#F35A00"
    }]
  };
};

const sendPublicMessage = (message, bot, prices) => {
  const ans = prices.DISPLAY.ANS;
  
  for(let cur in ans) {
    const curInfo = ans[cur];
    const msg = createMessage(cur, curInfo);
    bot.reply(message, msg);
  }
};


