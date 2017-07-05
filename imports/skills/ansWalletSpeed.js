module.exports = function(skill, info, bot, message) {
  bot.startPrivateConversation(message, function(err, conv) {
    if(err) {
      console.log('ansWalletSpeed', err);
    } else {
      const text ='*I understand you are looking for a way to speed up the wallet sync.*\n' +
        'Please follow this link and follow the steps: https://www.reddit.com/r/Antshares/comments/6axcd5/speedup_client_sync_using_bootstrapped_chain/';
      const msg = require('../helpers/create-private-message')(text, skill);
      conv.say(msg);
    }
  });
};
