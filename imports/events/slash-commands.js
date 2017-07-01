module.exports = function(controller) {
  controller.on('slash_commands', function(bot, trigger) {
    console.log('COMMAND', trigger);
  })
};