module.exports = function(skill, info, bot, message) {
  bot.startPrivateConversation(message, function(err, conv) {
    if(err) {
      console.log('ansFromIco', err);
    } else {
      conv.say('*I understand you are looking for a way to get ANS/NEO from the ICO*\n' +
        'Use the following link for more information: https://coins.newbium.com/post/3012-antshares-mainnet-launch-how-to-claim-antshares/');
    }
  });
};
