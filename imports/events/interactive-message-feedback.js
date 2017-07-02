module.exports = function(controller) {
  controller.on('interactive_message_callback', function(bot, trigger) {
    console.log('MESSAGE', trigger);
    /**
     * Message.text contains all the arguments placed after the slash command
     * The first argument after the slash command always contains the macro
     *
     * @type {Array}
     */
    const arguments = message.text.split(' ');
  
    // Get the macro
    const command = arguments.shift();
  
    // Gets the macro
    const macroObject = getMacro(command, 'macro');
    if (macroObject !== false) {
      // call the macro and send the rest of the arguments with it
      macroObject.macro(controller, bot, message, arguments);
    } else {
      console.log('Macro does not exist: ', command);
    }
  })
};