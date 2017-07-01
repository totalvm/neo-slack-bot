module.exports = function(skill, info, bot, message) {
  bot.startPrivateConversation(message, function(err, conv) {
    if(err) {
      console.log('ansInformation', err);
    } else {
      conv.say('*I understand you are looking for a way to get started with ANS/NEO.*\n' +
        'Please go to this url to see a tutorial: https://www.reddit.com/r/Antshares/comments/6jw352/basic_knowledge_and_background_info_resources/');
    }
  });
};
