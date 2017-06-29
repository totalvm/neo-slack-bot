
module.exports = function(skill, info, bot, message) {
  bot.startPrivateConversation(message, function(err, conv) {
    if(err) {
      console.log('ansCreateWalletError', err);
    } else {
      conv.say('*I understand you are looking for a way to create a wallet.* \n' +
        'Please go to this url to see a tutorial: https://www.reddit.com/r/Antshares/comments/6j8pcp/a_basic_guide_to_the_antshares_pc_wallet/');
    }
  });
};
