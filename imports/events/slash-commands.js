module.exports = function(controller) {
  controller.on('slash_command', function(bot, message) {
    console.log('COMMAND', message);
    const getCommand = require('../get-command');
    const arguments = message.text.split(' ');
  
    // Get the macro
    const command = arguments.shift();
  
    // Gets the macro
    const commandObject = getCommand(command, 'macro');
    if (commandObject !== false) {
      // call the macro and send the rest of the arguments with it
      commandObject.command(controller, bot, message, arguments);
    } else {
      console.log('Macro does not exist: ', command);
    }
  })
};