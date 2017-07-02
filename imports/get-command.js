/**
 * Tries to find the macro file in the macros folder
 *
 * @param command
 * @param type
 * @returns the required file OR false
 */
module.exports = (command, type) => {
  const fs = require('fs');
  // Construct path to the macro
  const path = require("path").join(__dirname, "commands", command) + '.js';
  // Check if file exists in sync (could be converted to async if a callback is passed)
  if (fs.existsSync(path)) {
    // Require the file
    const com = require(path);
    // Check if the type of call exists in the macro
    if (com.hasOwnProperty(type)) {
      return com;
    }
  }
  // Macro or type not found
  return false;
};
