module.exports = function(controller) {
  controller.on('interactive_message_callback', function(bot, trigger) {
    console.log('MESSAGE', trigger);
  })
};