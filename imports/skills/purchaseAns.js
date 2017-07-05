
module.exports = function(skill, info, bot, message) {
  bot.startPrivateConversation(message, function(err, conv) {
    if (err) {
      console.log('purchaseAns', err);
    } else {
      const text = '*I understand you are looking for a way to buy ANS/NEO.*\n' +
        'Please follow this link and follow the steps: https://www.reddit.com/r/Antshares/comments/6j7xhd/where_can_i_buy_antshares/ \n' +
        'If you are looking for a way to claim your ANC/GAS please use this link instead: https://www.reddit.com/r/Antshares/comments/6eddt1/antcoins_anc_distribution_and_claim_tutorial/';
      const msg = require('../helpers/create-private-message')(text, skill);
      conv.say(msg);
    }
  });
};
