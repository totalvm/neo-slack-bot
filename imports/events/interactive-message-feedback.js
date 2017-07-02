module.exports = function(controller) {
  controller.on('interactive_message_callback', function(bot, message) {
    console.log('COMMAND', message);
    const getCommand = require('../get-command');
    const args = message.text.split(' ');
  
    // Get the macro
    const command = args.shift();
  
    // Gets the macro
    const commandObject = getCommand(command, 'commands');
    if (commandObject !== false) {
      // call the macro and send the rest of the arguments with it
      commandObject.command(controller, bot, message, args);
    } else {
      console.log('Macro does not exist: ', command);
    }
  })
};