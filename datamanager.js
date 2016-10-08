const fs = require('fs');
const database = './db/messages.db';

exports.writeMessage = function(message) {
  fs.appendFile(database,'\n'+message.content);
};

exports.loadMessages = function() {
  var data = fs.readFileSync(database, "utf-8");
  var arrMessages = data.split('\n');
  for (var i=0; i<arrMessages.length; i++) {
    arrMessages[i] = { content: arrMessages[i]};
  }
  return arrMessages;
}
