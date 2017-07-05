module.exports = function(skill, info, bot, message) {
  bot.api.groups.invite({
    channel: "G603BJAQN",
    user: message.user
  }, function(err, res) {
    if(err) {
      console.log('JOIN DEV ERROR', err);
    } else {
      console.log('JOIN DEV SUCCESS', res);
    }
  })
};
