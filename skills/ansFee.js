
module.exports = function(skill, info, bot, message) {
  bot.startPrivateConversation(message, function(err, conv) {
    if(err) {
      console.log('ansFee', err);
    } else {
      conv.say('*I understand you are looking into the transfer fee of ANS.*\n' +
        'Currently some exchanges request a transfer fee of *1 ans*, this however is not the standard.\n' +
        'Transferring ans normally requires no fee and is free.');
    }
  });
};
