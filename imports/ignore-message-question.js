const createIgnoreMessage = (type) => {
  const ignoreAttachment =  {
    "text": "In the future would you like to ignore this message?",
    "callback_id": "callback|" + type,
    "attachment_type": "default",
    "actions": [
      {
        "name": "yes",
        "text": "Yes",
        "type": "button",
        "value": "yes"
      }
    ]
  };
  return ignoreAttachment;
};

module.exports = createIgnoreMessage;